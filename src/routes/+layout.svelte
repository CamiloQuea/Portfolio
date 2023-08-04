<script lang="ts">
	import ThemeToggleButton from '$lib/components/ThemeToggleButton.svelte';
	import { FolderKanban, User } from 'lucide-svelte';
	import '../app.css';
</script>

<div class="main flex min-h-screen flex-col text-neutral-900 dark:bg-neutral-950 dark:text-white">
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
	<main class="flex grow items-center justify-center">
		<slot />
	</main>
</div>
