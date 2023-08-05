<script lang="ts">
	import { goto } from '$app/navigation';
	import ThemeToggleButton from '$lib/components/ThemeToggleButton.svelte';
	import { contacts } from '$lib/contacts';
	import { routes } from '$lib/routes';
	import { onDestroy, onMount } from 'svelte';
	import { quartInOut, sineOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';
	import ChevronsDownIcon from '~icons/lucide/chevrons-down';
	import ChevronsUpIcon from '~icons/lucide/chevrons-up';
	import MouseIcon from '~icons/lucide/mouse';
	import GithubIcon from '~icons/mdi/github';
	import LinkedinIcon from '~icons/mdi/linkedin';
	import '../app.css';
	export let data;

	const transitionTimeMs = 250;

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
	<div class="absolute right-14 top-14 z-50">
		<ul class="flex gap-8 text-2xl">
			<li>
				<a href={contacts.github.url} target="_blank">
					<GithubIcon class=" text-neutral-700 dark:text-white" />
				</a>
			</li>
			<li>
				<a href={contacts.linkedin.url} target="_blank">
					<LinkedinIcon class=" text-blue-700 dark:text-white" />
				</a>
			</li>
			<li>
				<ThemeToggleButton />
			</li>
		</ul>
	</div>

	<div class="absolute bottom-0 right-0 top-0 mr-5 flex flex-col justify-center p-3">
		<nav class="flex flex-col items-center gap-5 rounded p-2">
			<ul class="z-50 flex flex-col items-center justify-center gap-6 p-3 text-sm">
				<li class=" opacity-30">
					<a href={data.beforePage.path}>
						<ChevronsUpIcon />
						<MouseIcon />
					</a>
				</li>
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
							class={`
							text-xl
							${
								data.url.pathname === route.path
									? 'text-neutral-800 dark:text-neutral-100'
									: 'dark:neutral-600 text-neutral-400'
							}
							`}><svelte:component this={route.icon} size={25} /></a
						>
					</li>
				{/each}
				<li class=" opacity-30">
					<a href={data.nextPage.path}>
						<MouseIcon />
						<ChevronsDownIcon />
					</a>
				</li>
			</ul>
			<!-- <div>
				<ThemeToggleButton />
			</div> -->
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
					easing: sineOut
				}}
				out:fly={{ y: animationScrollPostion, duration: transitionTimeMs, easing: sineOut }}
			>
				<slot />
			</div>
		{/key}
	</main>
</div>
