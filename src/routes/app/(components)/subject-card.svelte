<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { deleteSubjectSchema, type DeleteSubjectSchema } from '../schema';
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';

	export let title: string;
	export let description: string;
	export let postsNum: string;
	export let subjectId: string;
	export let data: SuperValidated<Infer<DeleteSubjectSchema>>;

	const form = superForm(data, {
		validators: zodClient(deleteSubjectSchema),
		id: subjectId
	});
	const { form: formData, enhance } = form;

	$formData.subjectId = subjectId;
</script>

<Card.Root class="border-filled h-full transition-colors hover:cursor-pointer hover:border-primary">

	<a href={`/app/subjects/${subjectId}`}>
	<Card.Header class="grid grid-cols-[1fr_110px] items-start gap-4 space-y-0">
		<div class="space-y-1">
			<Card.Title>{title}</Card.Title>
			<Card.Description>
				{description}
			</Card.Description>
		</div>
	
	</Card.Header>

	<Card.Content>
		<div class="flex space-x-4 text-sm text-muted-foreground">
			<div class="flex items-center">
				Posts
				{postsNum}
			</div>
		</div>
	</Card.Content>
	</a>
	<div class="flex items-center justify-end pr-5 pb-5">
		<form method="POST" action="?/deleteSubject" use:enhance>
			<Form.Field {form} name="subjectId">
				<Form.Control let:attrs>
					<Input {...attrs} bind:value={$formData.subjectId} type="hidden" />
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
			<Form.Button >Delete</Form.Button>
		</form>
	</div>
</Card.Root>
