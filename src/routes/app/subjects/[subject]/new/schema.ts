import { z } from 'zod';

export const postSchema = z.object({
	title: z.string().min(2, 'Title is required').max(50, 'Title must be at most 50 characters'),
	content: z
		.string()
		.min(2, 'Content is required')
		.max(250, 'Content must be at most 250 characters'),
    material: z.any()
});

export type PostSchema = typeof postSchema;
