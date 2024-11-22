<script lang="ts">
	import Header from '$lib/components/layout/Header.svelte';
	import '../app.css';
	let { children } = $props();
</script>

<div class="flex min-h-screen flex-col">
	<Header />
	<main class="flex-1">
		{@render children()}
	</main>
</div>
