<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { MoreHorizontal, Trash } from 'lucide-svelte';
	import { enhance } from '$app/forms';

	export let title: string;
	export let description: string;
	export let postsNum: string;
	export let subjectId: string;

</script>

<Card.Root  class="h-full border-filled hover:border-primary hover:cursor-pointer transition-colors">
	<Card.Header class="grid grid-cols-[1fr_110px] items-start gap-4 space-y-0">
		<div class="space-y-1">
			<Card.Title>{title}</Card.Title>
			<Card.Description>
				{description}
			</Card.Description>
		</div>
		<div class="flex items-center justify-end">
			<DropdownMenu.Root>
				<DropdownMenu.Trigger class="h-8 w-8 flex items-center justify-center rounded-md hover:bg-accent hover:text-accent-foreground">
					<MoreHorizontal class="h-4 w-4" />
				</DropdownMenu.Trigger>
				<DropdownMenu.Content>
					<form method="POST" action="?/deleteSubject" use:enhance>
						<input type="hidden" name="subjectId" value={subjectId} />
						<DropdownMenu.Item class="text-destructive focus:text-destructive">
							<button type="submit" class="w-full flex items-center">
								<Trash class="mr-2 h-4 w-4" />
								<span>Delete</span>
							</button>
						</DropdownMenu.Item>
					</form>
				</DropdownMenu.Content>
			</DropdownMenu.Root>
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
</Card.Root>
