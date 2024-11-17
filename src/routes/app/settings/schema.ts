import { z } from 'zod';

export const editProfileSchema = z.object({
	firstName: z.string().min(2).max(50),
	lastName: z.string().min(2).max(50),
	picture: z.string().optional()
});

export type EditProfileSchema = typeof editProfileSchema;
