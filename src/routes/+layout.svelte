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
		<ul class="flex flex-wrap justify-end gap-8 text-2xl">
			<li>
				<a href={contacts.github.url} target="_blank">
					<GithubIcon class="text-neutral-700 dark:text-white" />
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
			<li class="text-orange-800">
				<span class="text text-xs sm:text-base">En construcción</span>
				<svg
					class="inline-block"
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					><g
						fill="none"
						stroke="currentColor"
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						><path
							d="M9.3 6.2a4.55 4.55 0 0 0 5.4 0m-6.8 4.5c.9.8 2.4 1.3 4.1 1.3s3.2-.5 4.1-1.3"
						/><path
							d="M13.9 3.5a1.93 1.93 0 0 0-3.8-.1l-3 10c-.1.2-.1.4-.1.6c0 1.7 2.2 3 5 3s5-1.3 5-3c0-.2 0-.4-.1-.5Z"
						/><path
							d="m7.5 12.2l-4.7 2.7c-.5.3-.8.7-.8 1.1s.3.8.8 1.1l7.6 4.5c.9.5 2.1.5 3 0l7.6-4.5c.7-.3 1-.7 1-1.1s-.3-.8-.8-1.1l-4.7-2.8"
						/></g
					></svg
				>
			</li>
		</ul>
	</div>

	<div class="absolute bottom-0 right-0 top-0 mr-0 flex flex-col justify-center p-3">
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

	<main bind:this={mainContainer} class="min-w-0">
		{#key data.url.pathname}
			<div
				class="relative flex h-screen min-w-0 flex-col items-center justify-center"
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
