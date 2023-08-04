<script lang="ts">
	import ThemeToggleButton from '$lib/components/ThemeToggleButton.svelte';
	import { FolderKanban, User } from 'lucide-svelte';
	import '../app.css';
	import { fly } from 'svelte/transition';
	import { cubicInOut, linear } from 'svelte/easing';
	export let data;
	const transitionTimeMs = 150;
</script>

<div class=" text-neutral-900 dark:bg-neutral-950 dark:text-white">
	<div class="absolute bottom-0 right-0 top-0 flex flex-col justify-center p-3">
		<nav class="flex flex-col items-center gap-5 rounded p-2">
			<ul>
				<li class="flex flex-col items-center justify-center gap-5">
					<a href="/"><User /></a>
					<a href="/projects"><FolderKanban /></a>
				</li>
			</ul>
			<div>
				<ThemeToggleButton />
			</div>
		</nav>
	</div>

	<main class="overflow-hidden">
		{#key data.url.pathname}
			<div
				class="flex h-screen grow items-center justify-center"
				in:fly={{
					x: -200,
					duration: transitionTimeMs,
					delay: transitionTimeMs,
					easing: cubicInOut
				}}
				out:fly={{ x: 200, duration: transitionTimeMs, easing: cubicInOut }}
			>
				<slot />
			</div>
		{/key}
	</main>
</div>
