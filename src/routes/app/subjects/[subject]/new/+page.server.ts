import type { PageServerLoad, Actions } from "./$types.js";
import { superValidate } from "sveltekit-superforms";
import { postSchema } from "./schema";
import { zod } from "sveltekit-superforms/adapters";
import { error, fail } from '@sveltejs/kit';
import { postTable, postMaterialTable } from '$lib/db/schema';
import { uploadFile } from "$lib/api/index.js";
import { db } from '$lib/db';

export const load: PageServerLoad = async ({params}) => {
    const validatedForm = await superValidate(zod(postSchema));
    return {
        subjectId: params.subject,
        form: validatedForm,
        schools: [],
        subjects: []
    };
};

export const actions: Actions = {
    default: async ({ request, locals, params }) => {
        const form = await superValidate(request, zod(postSchema));
        
        if (!form.valid) {
            return fail(400, { form });
        }

        const path = await uploadFile(form.data.material);
        const { user } = await locals.safeGetSession();
        if (!user) error(500, 'Could not extract session.');

        try {
            const postId = crypto.randomUUID();
            await db.insert(postTable).values({
                id: postId,
                profileId: user.id,
                subjectId: params.subject,
                title: form.data.title,
                content: form.data.content
            });

            // If there's a material, insert it
            if (path) {
                await db.insert(postMaterialTable).values({
                    id: crypto.randomUUID(),
                    postTableId: postId,
                    material: path
                });
            }

            // Remove the non-serializable File object before returning
            const returnForm = { ...form };
            returnForm.data = { ...form.data, material: undefined };

            return { form: returnForm, success: true };
        } catch (error) {
            return fail(500, { error: 'Failed to create post' });
        }
    }
};


