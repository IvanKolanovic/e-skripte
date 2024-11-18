import type { PageServerLoad } from '../$types';
import {
	addSubjectToProfile,
	deleteSubjectFromProfile,
	getSchools,
	getSubjectsForProfile,
	getSubjectsForSchool,
	getUserProfileWithLocals
} from '$lib/api';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { deleteSubjectSchema } from './schema';

export const load: PageServerLoad = async ({ locals }) => {
	const userProfile = await getUserProfileWithLocals(locals);

	return {
		subjects: await getSubjectsForProfile(userProfile.id),
		schools: await getSchools(userProfile.id),
		form: await superValidate(zod(deleteSubjectSchema))
	};
};

export const actions = {
	addSubject: async ({ request, locals }) => {
		const form = await request.formData();
		const subjectId = form.get('subjectId')?.toString().trim();

		const { user } = await locals.safeGetSession();
		if (!user) return { success: false };
		if (!subjectId) return { success: false };

		const success = await addSubjectToProfile(subjectId, user.id.trim());
		if (success) {
			return { success, type: 'add' };
		}
		return { success };
	},
	deleteSubject: async ({ request, locals }) => {
		const form = await superValidate(request, zod(deleteSubjectSchema));
		const subjectId = form.data.subjectId.toString().trim();
		const { user } = await locals.safeGetSession();
		if (!user) return { success: false };
		if (!subjectId) return { success: false };

		const success = await deleteSubjectFromProfile(subjectId.trim(), user.id.trim());
		if (success) {
			return { form, success, type: 'delete' };
		}
		return { success };
	}
};
