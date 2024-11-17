<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import { type PageData, type ActionData } from '../$types';
    import SettingsForm from "./settings-form.svelte";
	const { data, form } = $props<{ data: PageData; form: ActionData }>();
	import { invalidateAll } from '$app/navigation';
	import { toast, Toaster } from 'svelte-sonner';

	$effect(() => {
		console.log(form);
		if (form?.success) {
			toast.success('Profile updated successfully');
			invalidateAll()
		}
	});
</script>

<svelte:head>
	<title>E-Skripte | General Settings</title>
</svelte:head>
<div class="flex min-h-screen w-full flex-col">
	<main
		class="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10"
	>
		<div class="mx-auto grid w-full max-w-6xl gap-2">
			<h1 class="text-3xl font-semibold">Settings</h1>
		</div>
		<div
			class="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]"
		>
			<nav
				class="grid gap-4 text-sm text-muted-foreground"
				data-x-chunk-container="chunk-container after:right-0"
			>
				<a href="/app/settings" class="font-semibold text-primary"> General </a>
				<a href="/app/settings/security">Security</a>
			</nav>
			<div class="grid gap-6">
				<Card.Root>
					<Card.Header>
						<Card.Title>General Information</Card.Title>
						<Card.Description>Used to identify you.</Card.Description>
					</Card.Header>
					<Card.Content>
						<SettingsForm data={data.form} userInfo={data.userProfile}/>
					</Card.Content>
				</Card.Root>
			</div>
		</div>
		<Toaster position="top-right" />
	</main>
</div>
