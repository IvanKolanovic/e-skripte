<script lang="ts">
	import { page } from '$app/stores';
	import CircleUser from 'lucide-svelte/icons/circle-user';
	import Menu from 'lucide-svelte/icons/menu';


	import { Button } from '$lib/components/ui/button/index.js';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import * as Sheet from '$lib/components/ui/sheet/index.js';
	import { navLinks } from '$lib';

	const { data, children } = $props();
	const { userProfile } = data;
</script>

<div class="flex min-h-screen w-full flex-col">
	<header class="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
		<nav data-sveltekit-reload
			class="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6"
		>
			<a href="/app" class="flex items-center gap-2 text-lg font-semibold md:text-base">
				<img src="/images/logo_black.svg" alt="Product logo" class="h-full w-full" />
				<span class="sr-only">E-Skripte</span>
			</a>
			{#each navLinks as link}
				<a
					href={link.path}
					class:active={$page.url.pathname === link.path ||
						($page.url.pathname.startsWith(link.path) && link.path !== '/app')}
					class="{$page.url.pathname === link.path ||
					($page.url.pathname.startsWith(link.path) && link.path !== '/app')
						? 'text-foreground'
						: 'text-muted-foreground'} transition-colors hover:text-foreground"
				>
					{link.name}
				</a>
			{/each}
		</nav>
		<Sheet.Root>
			<Sheet.Trigger>
				<Button variant="outline" size="icon" class="shrink-0 md:hidden">
					<Menu class="h-5 w-5" />
					<span class="sr-only">Toggle navigation menu</span>
				</Button>
			</Sheet.Trigger>
			<Sheet.Content side="left">
				<nav class="grid gap-6 text-lg font-medium">
					<a href="/app" class="flex items-center gap-2 text-lg font-semibold md:text-base">
						<img src="/images/logo_black.svg" alt="Product logo" class="h-full w-full" />
						<span class="sr-only">E-Skripte</span>
					</a>
					{#each navLinks as link}
						<a
							href={link.path}
							class:active={$page.url.pathname === link.path ||
								($page.url.pathname.startsWith(link.path) && link.path !== '/app')}
							class="{$page.url.pathname === link.path ||
							($page.url.pathname.startsWith(link.path) && link.path !== '/app')
								? 'text-foreground'
								: 'text-muted-foreground'} transition-colors hover:text-foreground"
						>
							{link.name}
						</a>
					{/each}
				</nav>
			</Sheet.Content>
		</Sheet.Root>
		<div class="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
			<div class="ml-auto flex-1 sm:flex-initial">
			</div>
			<DropdownMenu.Root>
				<DropdownMenu.Trigger>
					<Button variant="secondary" size="icon" class="rounded-full">
						{#if userProfile.picture === ''}
							<CircleUser class="h-5 w-5" />
						{:else}
							<img src={userProfile.picture} alt="User profile" class="h-full w-full rounded-full" />
						{/if}
						<span class="sr-only">Toggle user menu</span>
					</Button>
				</DropdownMenu.Trigger>
				<DropdownMenu.Content align="end">
					<DropdownMenu.Label>{userProfile.firstName} {userProfile.lastName}</DropdownMenu.Label>
					<DropdownMenu.Separator />
					<a href="/app/settings"><DropdownMenu.Item>Settings</DropdownMenu.Item></a>
					<DropdownMenu.Separator />
					<DropdownMenu.Item>Logout</DropdownMenu.Item>
				</DropdownMenu.Content>
			</DropdownMenu.Root>
		</div>
	</header>
	{@render children()}
</div>
