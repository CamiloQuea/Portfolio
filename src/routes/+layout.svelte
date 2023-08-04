<script lang="ts">
	import { theme } from '$lib/stores/themeStore';
	import '../app.css';

	function toggle() {
		const upcoming_theme = $theme === 'light' ? 'dark' : 'light';

		$theme = upcoming_theme;
	}
</script>

<div class="min-h-screen p-2 text-black dark:bg-neutral-950 dark:text-white">
	<div class="ml-auto">
		<button
			class="rounded border px-3 py-1"
			on:click={() => {
				toggle();
			}}>{$theme}</button
		>
	</div>

	<slot />
</div>
