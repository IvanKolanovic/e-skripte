import { z } from "zod";
 
export const deleteSubjectSchema = z.object({
 subjectId: z.string(),
});
 
export type DeleteSubjectSchema = typeof deleteSubjectSchema;