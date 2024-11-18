<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import type { ActionData, PageData } from './$types';
	import SubjectCard from './(components)/subject-card.svelte';
	import SubjectDialog from './(components)/subject-dialog.svelte';
	import { toast, Toaster } from 'svelte-sonner';

	const { data, form } = $props<{ data: PageData; form: ActionData }>();

	$effect(() => {
		if (form?.success) {
			toast.success('Subject added successfully');
			invalidateAll();
		}
	});
</script>

<svelte:head>
	<title>E-Skripte | Dashboard</title>
</svelte:head>
<div class="mx-5 mt-10 grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
	{#each data.subjects as subject}
		<a href={`/app/subjects/${subject.id}`}>
			<SubjectCard
				subjectId={subject.id}
				title={subject.name}
				description={subject.description}
				postsNum={subject.postNum}
			/></a
		>
	{/each}

	<SubjectDialog schools={data.schools} />
	<Toaster position="top-right" />
</div>
