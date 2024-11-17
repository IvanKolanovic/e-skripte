import type { PageServerLoad } from '../$types';
import { addSubjectToProfile, deleteSubjectFromProfile, getSchools, getSubjectsForProfile, getSubjectsForSchool, getUserProfileWithLocals } from '$lib/api';

export const load: PageServerLoad = async ({ locals }) => {
	const userProfile = await getUserProfileWithLocals(locals);
    
	return {
		subjects: await getSubjectsForProfile(userProfile.id),
		schools: await getSchools(userProfile.id)
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
            return { success: true };
        }
        return { success };
    },
    deleteSubject: async ({ request, locals }) => {
        const formData = await request.formData();
        const subjectId = formData.get('subjectId')?.toString().trim();
        const { user } = await locals.safeGetSession();
        if (!user) return { success: false };
        if (!subjectId) return { success: false };

        const success = await deleteSubjectFromProfile(subjectId.trim(), user.id.trim());
        if (success) {
            return { success, location: '/app' };
        }
        return { success };
    }
};
