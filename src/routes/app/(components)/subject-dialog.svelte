<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';
	import * as Card from '$lib/components/ui/card';
	import { Plus } from 'lucide-svelte';
	import * as Select from '$lib/components/ui/select/index.js';
	import type { School, SubjectWithSchool } from '$lib/api/interfaces';
	import { enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';

	const data = $props();
	let open = $state(false);
	let schools = data.schools;
	let selectedSchool = $state<string | undefined>(undefined);
	let selectedSubject = $state<string | undefined>(undefined);

	function handleClose() {
		selectedSchool = undefined;
		selectedSubject = undefined;
		open = false;
	}

	function handleOpenChange(isOpen: boolean) {
		if (isOpen) {
			open = true;
		} else {
			handleClose();
		}
	}

	function handleEnhance() {
		return async ({ result }: { result: any }) => {
			if (result.type === 'success') {
				await invalidateAll();
				handleClose();
			}
		};
	}
</script>

<Dialog.Root bind:open onOpenChange={handleOpenChange}>
	<Dialog.Trigger>
		<Card.Root
			class="border-filled h-full transition-colors hover:cursor-pointer hover:border-primary"
		>
			<Card.Header class="flex h-full flex-col items-center justify-center space-y-3">
				<div class="rounded-full bg-secondary p-3">
					<Plus class="h-6 w-6" />
				</div>
				<div class="space-y-1 text-center">
					<Card.Title>Add Subject</Card.Title>
					<Card.Description>Follow a new subject</Card.Description>
				</div>
			</Card.Header>
		</Card.Root>
	</Dialog.Trigger>

	<Dialog.Content class="sm:max-w-[425px]">
		<Dialog.Header>
			<Dialog.Title>Add New Subject</Dialog.Title>
			<Dialog.Description>
				Enter the details for the new subject you want to follow.
			</Dialog.Description>
		</Dialog.Header>

		<div class="grid gap-4 py-4">
			<Select.Root type="single" bind:value={selectedSchool}>
				<Select.Trigger>
					{schools.find((s: School) => s.id === selectedSchool)?.name ?? 'Select a school'}
				</Select.Trigger>
				<Select.Content>
					{#each schools as school}
						<Select.Item value={school.id} label={school.name} />
					{/each}
				</Select.Content>
			</Select.Root>

			{#if selectedSchool}
				<Select.Root type="single" bind:value={selectedSubject}>
					<Select.Trigger>
						{schools
							.find((s: School) => s.id === selectedSchool)
							?.subjects.find((sub: SubjectWithSchool) => sub.id === selectedSubject)?.name ?? 'Select a subject'}
					</Select.Trigger>
					<Select.Content>
						{#each schools.find((s: School) => s.id === selectedSchool)?.subjects ?? [] as subject}
							<Select.Item value={subject.id} label={subject.name} />
						{/each}
					</Select.Content>
				</Select.Root>
			{/if}
		</div>

		<Dialog.Footer>
			<form 
				method="POST" 
				action="?/addSubject" 
				use:enhance={handleEnhance}
			>
				<input type="hidden" name="subjectId" value={selectedSubject ?? ''} />
				<button
					type="submit"
					disabled={!selectedSubject}
					class="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
				>
					Save changes
				</button>
			</form>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
