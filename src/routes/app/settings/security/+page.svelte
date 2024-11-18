<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import { Toaster } from 'svelte-sonner';
	import SecurityCreateForm from './securityCreate-form.svelte';
	const { data } = $props();
</script>

<svelte:head>
	<title>E-Skripte | Security Settings</title>
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
				<a href="/app/settings"> General </a>
				<a href="/app/settings/security" class="font-semibold text-primary">Security</a>
			</nav>
			<div class="grid gap-6">
				<Card.Root>
					<Card.Header>
						<Card.Title>Password Information</Card.Title>
						<Card.Description>Change your password</Card.Description>
					</Card.Header>
					<Card.Content>
						<SecurityCreateForm data={data.createForm} />
					</Card.Content>
				</Card.Root>
				<Toaster position="top-right" />
			</div>
		</div>
	</main>
</div>
