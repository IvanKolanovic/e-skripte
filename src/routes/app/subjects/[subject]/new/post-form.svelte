<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { Textarea } from '$lib/components/ui/textarea';
	import { postSchema, type PostSchema } from './schema';

	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { supabase } from '$lib/supabaseClient';

	export let data: SuperValidated<Infer<PostSchema>>;

	const form = superForm(data, {
		validators: zodClient(postSchema)
	});

	const { form: formData, enhance } = form;
</script>

<form method="POST" use:enhance enctype="multipart/form-data">
	<Form.Field {form} name="title">
		<Form.Control let:attrs>
			<Form.Label>Title</Form.Label>
			<Input {...attrs} bind:value={$formData.title} />
		</Form.Control>
		<Form.Description>Post title</Form.Description>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="content">
		<Form.Control let:attrs>
			<Form.Label>Content</Form.Label>
			<Textarea
				{...attrs}
				placeholder="Share your knowledge with others"
				class="resize-none"
				bind:value={$formData.content}
			/>
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

	<Form.Field {form} name="material">
		<Form.Control let:attrs>
			<Form.Label>Material</Form.Label>
			<Input {...attrs} id="material" type="file" bind:value={$formData.material} />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Button>Submit</Form.Button>
</form>
