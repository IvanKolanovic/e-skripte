ALTER TABLE "postMaterial" DROP CONSTRAINT "postMaterial_postTableId_profile_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "postMaterial" ADD CONSTRAINT "postMaterial_postTableId_post_id_fk" FOREIGN KEY ("postTableId") REFERENCES "public"."post"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
