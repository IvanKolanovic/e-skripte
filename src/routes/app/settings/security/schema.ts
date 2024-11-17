import { z } from 'zod';

export const editPasswordeSchema = z.object({
    newPassword: z.string().min(8, 'Password must be at least 8 characters long.'),
	newPasswordRepeat: z.string().min(8, 'Password must be at least 8 characters long.'),
    oldPassword: z.string().min(8, 'Password must be at least 8 characters long.'),
}).refine(data => data.newPassword === data.newPasswordRepeat, {
    message: "Passwords don't match",
    path: ["newPasswordRepeat"],
}).refine(async (data) => {
    return data.oldPassword === "";
}, {
    message: "Old password does not match",
    path: ["oldPassword"],
});

export const createPasswordeSchema = z.object({
    newPassword: z.string().min(8, 'Password must be at least 8 characters long.'),
	newPasswordRepeat: z.string().min(8, 'Password must be at least 8 characters long.'),
}).refine(data => data.newPassword === data.newPasswordRepeat, {
    message: "Passwords don't match",
    path: ["newPasswordRepeat"],
});

export type EditPasswordeSchema = typeof editPasswordeSchema;
export type CreatePasswordeSchema = typeof createPasswordeSchema;
