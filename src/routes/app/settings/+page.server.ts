import { error, fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types.js';
import { superValidate } from 'sveltekit-superforms';
import { editProfileSchema } from './schema';
import { zod } from 'sveltekit-superforms/adapters';
import { getUserProfileWithLocals, updateUser, uploadFile, uploadPicture } from '$lib/api/index.js';
import type { UserProfile } from '$lib/api/interfaces.js';
import { toast } from 'svelte-sonner';

export const load: PageServerLoad = async ({ locals }) => {
	const userProfile = await getUserProfileWithLocals(locals);
	return {
		userProfile,
		form: await superValidate(zod(editProfileSchema)),
		schools: [],
		subjects: []
	};
};

export const actions: Actions = {
	default: async ({ request, locals }) => {
		const { user } = await locals.safeGetSession();
		if (!user) error(500, 'Could not extract session.');

		const form = await superValidate(request, zod(editProfileSchema));
		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		const path = await uploadPicture(form.data.picture);
		const data: UserProfile = form.data as UserProfile;
		data.id = user.id;
		data.picture = path ?? '';

		const updatedUser = await updateUser(data);

		return {
			form,
			success: true
		};
	}
};
