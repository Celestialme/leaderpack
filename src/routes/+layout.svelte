<script lang="ts">
	import Notification from '@src/components/Notification.svelte';
	import { inputError } from '@src/store';
	import '../app.css';
	import 'iconify-icon';
	import { page } from '$app/stores';
	page.subscribe((page) => {
		if (globalThis.gtag) {
			globalThis.gtag('set', 'page_path', page.url.pathname);
			globalThis.gtag('event', 'page_view');
		}
	});
</script>

{#if $inputError.message}
	<Notification />
{/if}
<slot />
