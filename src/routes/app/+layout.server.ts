import { getOrCreateUserProfileGithub, getUserProfileWithLocals } from '$lib/api';

export const load = async ({ locals }) => {
	let userProfile = await getUserProfileWithLocals(locals);
	if (!userProfile) userProfile = await getOrCreateUserProfileGithub(locals);

	return {
		userProfile
	};
};
