<script lang="ts">
	import Notification from '@src/components/Notification.svelte';
	import { inputError } from '@src/store';
	import { language } from '@src/store.svelte';

	import '../app.css';
	import 'iconify-icon';
	import { page } from '$app/stores';
	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();
	page.subscribe((page) => {
		if (globalThis.gtag) {
			globalThis.gtag('set', 'page_path', page.url.pathname);
			globalThis.gtag('event', 'page_view');
		}
	});
	language.set($page.params.language as any);
</script>

{#if $inputError.message}
	<Notification />
{/if}
{@render children?.()}
