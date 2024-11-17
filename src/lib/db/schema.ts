import {pgTable, text } from 'drizzle-orm/pg-core';

export const profileTable = pgTable('profile', {
	id: text().primaryKey(),
	firstName: text().notNull(),
	lastName: text().notNull(),
	password: text().notNull(),
	email: text().notNull(),
	picture: text().notNull(),
	salt: text(),
});

export const schoolTable  = pgTable('school', {
	id: text().primaryKey(),
	name: text().notNull(),
});

export const subjectTable  = pgTable('subject', {
	id: text().primaryKey(),
	schoolId: text().notNull().references(() => schoolTable.id),
	name: text().notNull(),
	description: text().notNull(),
});

export const profileSubjectTable = pgTable('profileSubject', {
	id: text().primaryKey(),
	profileId: text().notNull().references(() => profileTable.id),
	subjectId: text().notNull().references(() => subjectTable.id),
});

export const postTable  = pgTable('post', {
	id: text().primaryKey(),
	profileId: text().notNull().references(() => profileTable.id),
	subjectId: text().notNull().references(() => subjectTable.id),
	title: text().notNull(),
	content: text().notNull(),
});

export const postMaterialTable = pgTable('postMaterial', {
	id: text().primaryKey(),
	postTableId: text().notNull().references(() => postTable.id),
	material: text().notNull()
});
