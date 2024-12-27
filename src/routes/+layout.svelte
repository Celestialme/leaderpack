<script lang="ts">
	import Notification from '@src/components/Notification.svelte';
	import { language, notification } from '@src/store.svelte';

	import '../app.css';
	import 'iconify-icon';
	import { page } from '$app/stores';
	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();

	language.set($page.params.language as any);
</script>

{#if notification.value.message}
	<Notification />
{/if}
{@render children?.()}
