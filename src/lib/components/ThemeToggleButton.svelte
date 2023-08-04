<script lang="ts">
	import { theme } from '$lib/stores/themeStore';

	function toggle() {
		const upcoming_theme = $theme === 'light' ? 'dark' : 'light';

		$theme = upcoming_theme;
	}
</script>

<button
	class="rounded border px-3 py-1"
	on:click={() => {
		toggle();
	}}>{$theme}</button
>
