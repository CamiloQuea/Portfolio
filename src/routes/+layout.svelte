<script lang="ts">
	import ThemeToggleButton from '$lib/components/ThemeToggleButton.svelte';
	import { FolderKanban, User } from 'lucide-svelte';
	import '../app.css';
	import { fly } from 'svelte/transition';
	import { cubicInOut } from 'svelte/easing';
	import { onDestroy, onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { routes } from '$lib/routes';
	export let data;

	const transitionTimeMs = 150;

	let mainContainer: HTMLElement;

	let animationScrollPostion: number;

	function scrollListener(this: HTMLElement, ev: WheelEvent) {
		const routeIndex = routes.findIndex((route) => route.path === data.url.pathname);

		if (ev.deltaY < 0) {
			animationScrollPostion = -200;
			if (0 === routeIndex) return goto(routes[routes.length - 1].path);
			goto(routes[routeIndex - 1].path);
		} else if (ev.deltaY > 0) {
			animationScrollPostion = 200;
			if (routes.length - 1 === routeIndex) return goto(routes[0].path);
			goto(routes[routeIndex + 1].path);
		}
	}

	onMount(() => {
		mainContainer?.addEventListener('wheel', scrollListener);
	});

	onDestroy(() => {
		mainContainer?.removeEventListener('wheel', scrollListener);
	});
</script>

<div class=" -z-20 text-neutral-900 dark:bg-neutral-950 dark:text-white">
	<div class="absolute bottom-0 right-0 top-0 z-50 flex flex-col justify-center p-3">
		<nav class="flex flex-col items-center gap-5 rounded p-2">
			<ul class="flex flex-col items-center justify-center gap-5">
				{#each routes as route}
					<!-- content here -->
					<li>
						<a
							href={route.path}
							on:click={() => {
								const indexGoto = routes.findIndex((ri) => ri.path === route.path);
								const indexCurrent = routes.findIndex((ri) => ri.path === data.url.pathname);
								if (indexGoto - indexCurrent > 0) return (animationScrollPostion = 200);
								animationScrollPostion = -200;
							}}
							class={`${
								data.url.pathname === route.path
									? 'text-neutral-800 dark:text-neutral-100'
									: 'dark:neutral-600 text-neutral-400'
							}`}><svelte:component this={route.icon} /></a
						>
					</li>
				{/each}
			</ul>
			<div>
				<ThemeToggleButton />
			</div>
		</nav>
	</div>

	<main bind:this={mainContainer}>
		{#key data.url.pathname}
			<div
				class="relative h-screen"
				in:fly={{
					y: -animationScrollPostion,
					duration: transitionTimeMs,
					delay: transitionTimeMs,
					easing: cubicInOut
				}}
				out:fly={{ y: animationScrollPostion, duration: transitionTimeMs, easing: cubicInOut }}
			>
				<slot />
			</div>
		{/key}
	</main>
</div>
