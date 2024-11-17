import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import tailwindcss from 'tailwindcss';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

export default defineConfig({
	plugins: [
		sveltekit(),
		nodePolyfills({
			include: ['buffer', 'util', 'stream'],
			globals: {
				Buffer: true,
				global: true,
				process: true
			},
		})
	],
	css: {
		postcss: {
			plugins: [tailwindcss()]
		}
	}
});
