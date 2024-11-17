<script lang="ts">
	// import { uploadPicture } from '$lib/api';
	import type { UserProfile } from '$lib/api/interfaces';
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { editProfileSchema, type EditProfileSchema } from './schema';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';

	export let data: SuperValidated<Infer<EditProfileSchema>>;
	export let userInfo: UserProfile;

	const form = superForm(data, {
		validators: zodClient(editProfileSchema)
	});

	const { form: formData, enhance } = form;
</script>

<form method="POST" use:enhance enctype="multipart/form-data">
	<Form.Field {form} name="firstName">
		<Form.Control let:attrs>
			<Form.Label>First Name</Form.Label>
			<Input {...attrs} bind:value={$formData.firstName} placeholder={userInfo.firstName} />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

	<Form.Field {form} name="lastName">
		<Form.Control let:attrs>
			<Form.Label>Last Name</Form.Label>
			<Input {...attrs} bind:value={$formData.lastName} placeholder={userInfo.lastName} />
		</Form.Control>
		<Form.Description></Form.Description>
		<Form.FieldErrors />
	</Form.Field>

	<Form.Field {form} name="picture">
		<Form.Control let:attrs>
			<Form.Label>Profile Picture</Form.Label>
			<Input
				{...attrs}
				type="file"
				name="picture"
				id="picture"
				bind:value={$formData.picture}
			/>
		</Form.Control>
		<Form.Description>Upload optional profile picture.</Form.Description>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Button>Submit</Form.Button>
</form>
