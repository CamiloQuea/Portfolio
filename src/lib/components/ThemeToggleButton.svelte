<script lang="ts">
	import { theme } from '$lib/stores/themeStore';
	import SunIcon from '~icons/lucide/sun';
	import MoonIcon from '~icons/lucide/moon';

	function toggle() {
		const upcoming_theme = $theme === 'light' ? 'dark' : 'light';

		$theme = upcoming_theme;
	}
</script>

<button
	class={`${$$props.class} ${$theme === 'dark' ? 'text-yellow-500' : 'text-blue-800'}`}
	on:click={() => {
		toggle();
	}}
>
	{#if $theme === 'dark'}
		<SunIcon />
	{/if}
	{#if $theme === 'light'}
		<MoonIcon />
	{/if}
</button>
