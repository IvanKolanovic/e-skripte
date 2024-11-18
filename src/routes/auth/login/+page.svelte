<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { Github } from 'lucide-svelte';
</script>

<svelte:head>
	<title>E-Skripte | Login</title>
</svelte:head>
<div class="min-h-screen w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
	<div class="flex min-h-screen items-center justify-center py-12 lg:min-h-0">
		<div class="mx-auto grid w-[350px] gap-6">
			<div class="grid gap-2 text-center">
				<h1 class="text-3xl font-bold">Login</h1>
				<!-- <p class="text-muted-foreground text-balance">
					Enter your email below to login to your account
				</p> -->
			</div>
			<div class="grid gap-4">
				<!-- <form method="post" action="?/login">
					<div class="grid gap-2">
						<Label for="email">Email</Label>
						<Input id="email" type="email" placeholder="m@example.com" required />
					</div>
					<div class="grid gap-2">
						<div class="flex items-center">
							<Label for="password">Password</Label>
							<a href="##" class="ml-auto inline-block text-sm underline">
								Forgot your password?
							</a>
						</div>
						<Input id="password" type="password" required />
					</div>
					<Button type="submit" class="w-full">Login</Button>
				</form> -->
				<Button href="/auth/login/github" variant="outline" class="w-full">
					<Github />
					Login with Github</Button
				>
			</div>
			<!-- <div class="mt-4 text-center text-sm">
				Don&apos;t have an account?
				<a href="/auth/register" class="underline"> Register </a>
			</div> -->
		</div>
	</div>
	<div class="mr-10 hidden bg-white lg:block">
		<img
			src="/images/logo_black.svg"
			alt="Product logo"
			width="1920"
			height="1080"
			class="object-fit h-screen w-full dark:brightness-[0.2] dark:grayscale"
		/>
	</div>
</div>
