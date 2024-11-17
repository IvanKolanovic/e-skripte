import { fail, superValidate } from 'sveltekit-superforms';
import { editPasswordeSchema, createPasswordeSchema } from './schema';
import { zod } from 'sveltekit-superforms/adapters';
import { changePassword, getUserProfile, getUserProfileWithLocals } from '$lib/api/index.js';
import type { Actions, PageServerLoad } from '../$types';
import { error } from '@sveltejs/kit';
import type { ChangePasswordRequest } from '$lib/api/interfaces';
import { toast } from 'svelte-sonner';

export const load: PageServerLoad = async ({ locals }) => {
	return {
		userProfile: await getUserProfileWithLocals(locals),
		editForm: await superValidate(zod(editPasswordeSchema)),
		createForm: await superValidate(zod(createPasswordeSchema))
	};
};

export const actions: Actions = {
	createPassword: async ({ request, locals }) => {
		const { user } = await locals.safeGetSession();
		if (!user) error(500, 'Could not extract session.');

		const form = await superValidate(request, zod(createPasswordeSchema));
		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		const req: ChangePasswordRequest = {
			userId: user.id,
			password: form.data.newPassword
		};
		const updatedUser = await changePassword(req);

		if (!updatedUser) {
			toast.error('Oops. Failed to save your new password.');
			return {
				form,
				error: 'Failed to save your new password.'
			};
		} else {
			toast.success('Your password has been saved.');
			return {
				form,
				success: 'Your password has been saved.'
			};
		}
	},
	changePassword: async ({ request, locals }) => {
		const { user } = await locals.safeGetSession();
		if (!user) error(500, 'Could not extract session.');

		const form = await superValidate(request, zod(editPasswordeSchema));
		if (!form.valid) {
			return fail(400, {
				form
			});
		}
		const userProfile = await getUserProfile(user.id)
		if (userProfile.password !== form.data.oldPassword) {
			toast.error('The old password does not match.');
			return {
				form,
				error: 'The old password does not match.'
			};
		}

		const req: ChangePasswordRequest = {
			userId: user.id,
			password: form.data.newPassword
		};
		const updatedUser = await changePassword(req);

		if (!updatedUser) {
			toast.error('Oops. Failed to save your new password.');
			return {
				form,
				error: 'Failed to save your new password.'
			};
		} else {
			toast.success('Your password has been saved.');
			return {
				form,
				success: 'Your password has been saved.'
			};
		}
	}
};
