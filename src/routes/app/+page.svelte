<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import type { ActionData, PageData } from './$types';
	import SubjectCard from './(components)/subject-card.svelte';
	import SubjectDialog from './(components)/subject-dialog.svelte';
	import { toast, Toaster } from 'svelte-sonner';

	const { data, form } = $props<{ data: PageData; form: ActionData }>();

	$effect(() => {
		if (form?.success && form.type === 'add') {
			toast.success('Subject added successfully');
			invalidateAll();
		}
		else if (form?.success && form.type === 'delete') {
			toast.success('Subject deleted successfully');
			invalidateAll();
		}
	});
</script>

<svelte:head>
	<title>E-Skripte | Dashboard</title>
</svelte:head>
<div class="mx-5 mt-10 grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
	{#each data.subjects as subject}
			<SubjectCard
				subjectId={subject.id}
				title={subject.name}
				description={subject.description}
				postsNum={subject.postNum}
				data={data.form}
			/>
	{/each}

	<SubjectDialog schools={data.schools} />
	<Toaster position="top-right" />
</div>
