<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
</script>

<svelte:head>
    <title>E-Skripte | Register</title> 
</svelte:head>
<div class="min-h-screen flex flex-col items-center justify-center">
	<div class="bg-white mb-5">
		<img
			src="/images/logo_black.svg"
			alt="Placeholder"
			class="h-30 object-scale-down dark:brightness-[0.2] dark:grayscale"
		/>
	</div>
	<Card.Root class="mx-auto max-w-sm">
		<Card.Header>
			<Card.Title class="text-xl">Register</Card.Title>
			<Card.Description>Enter your information to create an account</Card.Description>
		</Card.Header>
		<Card.Content>
			<form method="POST" action="?/register">
				<div class="grid gap-4">
					<div class="grid grid-cols-2 gap-4">
						<div class="grid gap-2">
							<Label for="first-name">First name</Label>
							<Input id="first-name" placeholder="Max" required />
						</div>
						<div class="grid gap-2">
							<Label for="last-name">Last name</Label>
							<Input id="last-name" placeholder="Robinson" required />
						</div>
					</div>
					<div class="grid gap-2">
						<Label for="email">Email</Label>
						<Input id="email" type="email" placeholder="m@example.com" required />
					</div>
					<div class="grid gap-2">
						<Label for="password">Password</Label>
						<Input id="password" type="password" required />
					</div>
					<Button type="submit" class="w-full">Create an account</Button>
					<Button variant="outline" class="w-full">Register with GitHub</Button>
				</div>
			</form>
			<div class="mt-4 text-center text-sm">
				Already have an account?
				<a href="/auth/login" class="underline"> Login </a>
			</div>
		</Card.Content>
	</Card.Root>
</div>