<script lang="ts">
	import ThemeToggleButton from '$lib/components/ThemeToggleButton.svelte';
	import { FolderKanban, User } from 'lucide-svelte';
	import '../app.css';
</script>

<div
	class="main flex min-h-screen flex-col font-inter text-black dark:bg-neutral-950 dark:text-white"
>
	<div
		class="absolute right-0 top-0 flex h-full flex-col items-center justify-center gap-6 border-b p-3"
	>
		<nav class="flex flex-col items-center gap-5 rounded p-2">
			<ul>
				<li class="flex flex-col items-center justify-center justify-center gap-5">
					<a href="#section-about-me"><User /></a>
					<a href="#section-projects"><FolderKanban /></a>
				</li>
			</ul>
			<div>
				<ThemeToggleButton />
			</div>
		</nav>
	</div>
	<main class="flex grow items-center justify-center">
		<slot />
	</main>
</div>
