<script lang="ts">
	import ThemeToggleButton from '$lib/components/ThemeToggleButton.svelte';
	import '../app.css';
</script>

<div class="main min-h-screen text-black dark:bg-neutral-950 dark:text-white">
	<nav class="sticky top-0 flex items-center gap-6 border-b p-3">
		<ul class="ml-auto">
			<li class="flex gap-5">
				<a href="#section-about-me">About me</a>
				<a href="#section-projects">Projects</a>
			</li>
		</ul>
		<div>
			<ThemeToggleButton />
		</div>
	</nav>
	<main>
		<slot />
	</main>
</div>
