<script lang="ts">
	import { type ActionData, type PageData } from './$types';
	import PostForm from './post-form.svelte';
	import { Card } from '$lib/components/ui/card';
	import { goto } from '$app/navigation';
	const { data, form } = $props<{ data: PageData; form: ActionData }>();

	$effect(() => {
		if (form?.success) goto(`/app/subjects/${data.subjectId}`);
	});
</script>

<svelte:head>
	<title>E-Skripte | New Post</title>
</svelte:head>
<div class="flex min-h-screen w-full flex-col">
	<main
		class="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10"
	>
		<div class="mx-auto grid w-full max-w-6xl gap-2">
			<h1 class="text-3xl font-semibold">Create New Post</h1>
		</div>
		<div
			class="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]"
		>
			<div
				class="grid gap-4 text-sm text-muted-foreground"
				data-x-chunk-container="chunk-container after:right-0"
			></div>
			<Card class="p-6">
				<PostForm data={data.form} />
			</Card>
		</div>
	</main>
</div>
