<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import {createPasswordeSchema, type CreatePasswordeSchema } from './schema';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';

    export let data: SuperValidated<Infer<CreatePasswordeSchema>>;
    const form = superForm(data, {
		validators: zodClient(createPasswordeSchema)
	});

	const { form: formData, enhance } = form;

</script>

<form method="POST" action="?/createPassword" use:enhance>
	<Form.Field {form} name="newPassword">
		<Form.Control let:attrs>
			<Form.Label>New Password</Form.Label>
			<Input {...attrs} bind:value={$formData.newPassword} type="password"/>
		</Form.Control>
        <Form.Description>Type new password.</Form.Description>
		<Form.FieldErrors/>
	</Form.Field>

	<Form.Field {form} name="newPasswordRepeat">
		<Form.Control let:attrs>
			<Form.Label>Repeat</Form.Label>
			<Input {...attrs} bind:value={$formData.newPasswordRepeat} type="password" />
		</Form.Control>
		<Form.Description>Repeat new password.</Form.Description>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Button>Submit</Form.Button>
</form>
