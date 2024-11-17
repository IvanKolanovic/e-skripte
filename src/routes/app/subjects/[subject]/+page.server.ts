import { getCompleteSubject } from '$lib/api/index.js'

export const load = async ({ params }) => {
    return {
        subjectId: params.subject,
        completeSubject: await getCompleteSubject(params.subject.trim())
    }
}