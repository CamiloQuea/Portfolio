<script lang="ts">
	import { theme } from '$lib/stores/themeStore';
	import { Moon, Sun } from 'lucide-svelte';

	function toggle() {
		const upcoming_theme = $theme === 'light' ? 'dark' : 'light';

		$theme = upcoming_theme;
	}
</script>

<button
	class=" px-3 py-1"
	on:click={() => {
		toggle();
	}}
>
	{#if $theme === 'light'}
		<Sun />
	{/if}
	{#if $theme === 'dark'}
		<Moon />
	{/if}
</button>
