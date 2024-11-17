import { db } from '$lib/db';
import {
	profileTable,
	subjectTable,
	profileSubjectTable,
	postTable,
	postMaterialTable,
	schoolTable
} from '$lib/db/schema';
import { error } from '@sveltejs/kit';
import { eq, and, ne, isNull } from 'drizzle-orm';
import bcrypt from 'bcryptjs';
import type {
	ChangePasswordRequest,
	UserProfile,
	Subject,
	School,
	SubjectWithSchool,
	SubjectComplete
} from './interfaces';
import crypto from 'crypto';
import { sql } from 'drizzle-orm';
import { supabase } from '$lib/supabaseClient';

export const getUserProfile = async (id: string): Promise<UserProfile> => {
	const userExists = await db.query.profileTable.findFirst({
		where: eq(profileTable.id, id)
	});

	if (!userExists) error(404, 'Could not find user.');

	return userExists as UserProfile;
};

export const getUserProfileWithLocals = async (locals: App.Locals): Promise<UserProfile> => {
	const { user } = await locals.safeGetSession();
	if (!user) error(500, 'Could not extract session.');

	const userExists = await db.query.profileTable.findFirst({
		where: eq(profileTable.id, user.id)
	});

	if (!userExists) error(404, 'Could not find user.');

	return userExists as UserProfile;
};

export const getOrCreateUserProfileGithub = async (locals: App.Locals) => {
	const { user } = await locals.safeGetSession();
	if (!user) error(500, 'Could not extract session.');
	const userExists = await getUserProfile(user.id);

	if (userExists) {
		return userExists;
	}

	await db
		.insert(profileTable)
		.values({
			id: user.id,
			password: '',
			firstName: 'John',
			lastName: 'Doe',
			email: user.email ?? '',
			picture: ''
		})
		.returning();

	const newProfile = await getUserProfile(user.id);

	if (!newProfile) {
		error(500, 'Could not create profile.');
	}

	return newProfile;
};

export const updateUser = async (data: UserProfile) => {
	await db
		.update(profileTable)
		.set({ firstName: data.firstName, lastName: data.lastName })
		.where(eq(profileTable.id, data.id));

	const newProfile = await getUserProfile(data.id);

	if (!newProfile) {
		error(500, 'Could not create profile.');
	}

	return newProfile;
};

export const uploadPicture = async (file: File): Promise<string> => {
	return '';
};

export const changePassword = async (data: ChangePasswordRequest): Promise<boolean> => {
	const user = await getUserProfile(data.userId);

	if (!user) error(404, 'Could not find user.');

	const salt = crypto
		.randomBytes(Math.ceil(20 / 2))
		.toString('hex')
		.slice(0, 20);

	const hash = bcrypt.hashSync(data.password, salt);
	var result = await db
		.update(profileTable)
		.set({ password: hash, salt: salt })
		.where(eq(profileTable.id, data.userId))
		.returning();

	if (!result) return false;

	return true;
};

export const getSubjectsForProfile = async (profileId: string): Promise<Subject[]> => {
	const subjects = await db
		.select({
			id: subjectTable.id,
			schoolId: subjectTable.schoolId,
			name: subjectTable.name,
			description: subjectTable.description,
			postNum: sql<number>`(${db
				.select({ count: sql<number>`count(*)` })
				.from(postTable)
				.where(eq(postTable.subjectId, subjectTable.id))
				.limit(1)})`
		})
		.from(subjectTable)
		.innerJoin(profileSubjectTable, eq(profileSubjectTable.subjectId, subjectTable.id))
		.where(eq(profileSubjectTable.profileId, profileId));

	if (!subjects) return [];
	return subjects as Subject[];
};

export const getSchools = async (profileId: string): Promise<School[]> => {
	const schools = await db
		.select({
			id: schoolTable.id,
			name: schoolTable.name
		})
		.from(schoolTable);

	if (!schools) return [];

	// Fetch subjects for each school
	const schoolsWithSubjects = await Promise.all(
		schools.map(async (school) => ({
			...school,
			subjects: await getSubjectsForSchool(school.id, profileId)
		}))
	);

	return schoolsWithSubjects;
};

export const getSubjectsForSchool = async (
	schoolId: string,
	profileId: string
): Promise<SubjectWithSchool[]> => {
	const subjects = await db
		.select({
			id: subjectTable.id,
			schoolId: subjectTable.schoolId,
			name: subjectTable.name,
			description: subjectTable.description
		})
		.from(subjectTable)
		.leftJoin(
			profileSubjectTable,
			and(
				eq(profileSubjectTable.subjectId, subjectTable.id),
				eq(profileSubjectTable.profileId, profileId)
			)
		)
		.where(and(eq(subjectTable.schoolId, schoolId), isNull(profileSubjectTable.profileId)));

	if (!subjects) return [];
	return subjects;
};

export const addSubjectToProfile = async (
	subjectId: string,
	profileId: string
): Promise<boolean> => {
	console.log(subjectId);
	console.log(profileId);
	try {
		await db.insert(profileSubjectTable).values({
			id: crypto.randomUUID().toString(),
			profileId: profileId,
			subjectId: subjectId
		});

		return true;
	} catch (err) {
		console.error('Error adding subject to profile:', err);
		return false;
	}
};

export const deleteSubjectFromProfile = async (
	subjectId: string,
	profileId: string
): Promise<boolean> => {
	await db
		.delete(profileSubjectTable)
		.where(
			and(
				eq(profileSubjectTable.subjectId, subjectId),
				eq(profileSubjectTable.profileId, profileId)
			)
		);

	return true;
};

export const getCompleteSubject = async (subjectId: string): Promise<SubjectComplete> => {
	// Get the subject
	const subject = await db.query.subjectTable.findFirst({
		where: eq(subjectTable.id, subjectId)
	});

	if (!subject) error(404, 'Subject not found');

	// Get the school information
	const school = await db.query.schoolTable.findFirst({
		where: eq(schoolTable.id, subject.schoolId)
	});

	if (!school) error(404, 'School not found');

	// Get all posts for the subject with their materials
	const posts = await db
		.select({
			id: postTable.id,
			title: postTable.title,
			content: postTable.content,
			profileId: postTable.profileId
		})
		.from(postTable)
		.where(eq(postTable.subjectId, subjectId));

	// Get materials for all posts
	const postsWithMaterials = await Promise.all(
		posts.map(async (post) => {
			const materials = await db
				.select({
					id: postMaterialTable.id,
					material: postMaterialTable.material
				})
				.from(postMaterialTable)
				.where(eq(postMaterialTable.postTableId, post.id));

			// Get the author profile for each post
			const author = await getUserProfile(post.profileId);

			return {
				id: post.id,
				title: post.title,
				content: post.content,
				materials: materials,
				author
			};
		})
	);

	return {
		id: subject.id,
		schoolId: subject.schoolId,
		school: {
			id: school.id,
			name: school.name
		},
		name: subject.name,
		description: subject.description,
		posts: postsWithMaterials,
	};
};


export async function uploadFile(file: File): Promise<string | undefined> {
	const { data, error } = await supabase.storage
		.from('materials')
		.upload(`${crypto.randomUUID()}-${file.name}`, file);

		const publicData = supabase
		.storage
		.from('materials')
		.getPublicUrl(data?.path ?? '');

	return publicData?.data?.publicUrl;
}

