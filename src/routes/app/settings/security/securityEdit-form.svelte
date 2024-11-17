<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { editPasswordeSchema, type EditPasswordeSchema } from './schema';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';

	export let data: SuperValidated<Infer<EditPasswordeSchema>>;
	const form = superForm(data, {
		validators: zodClient(editPasswordeSchema)
	});

	const { form: formData, enhance } = form;
</script>

<form method="POST" use:enhance>
	<Form.Field {form} name="newPassword">
		<Form.Control let:attrs>
			<Form.Label>New Password</Form.Label>
			<Input {...attrs} bind:value={$formData.newPassword} type="password" />
		</Form.Control>
		<Form.Description>Type new password.</Form.Description>
		<Form.FieldErrors />
	</Form.Field>

	<Form.Field {form} name="newPasswordRepeat">
		<Form.Control let:attrs>
			<Form.Label>Repeat</Form.Label>
			<Input {...attrs} bind:value={$formData.newPasswordRepeat} type="password" />
		</Form.Control>
		<Form.Description>Repeat new password.</Form.Description>
		<Form.FieldErrors />
	</Form.Field>

	<Form.Field {form} name="oldPassword">
		<Form.Control let:attrs>
			<Form.Label>Old Password</Form.Label>
			<Input {...attrs} bind:value={$formData.oldPassword} type="password" />
		</Form.Control>
		<Form.Description>Type old password.</Form.Description>
		<Form.FieldErrors />
	</Form.Field>

	<Form.Button>Submit</Form.Button>
</form>
