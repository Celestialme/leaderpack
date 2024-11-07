<script lang="ts">
	import { products_el } from '@src/store.svelte';
	import { throttle } from '@src/utils';
	import { onMount } from 'svelte';
	interface Props {
		[key: string]: any;
	}

	let { ...props }: Props = $props();
	let state = $state(false);
	let t = throttle(100);
	onMount(() => {
		window.onscroll = (e: Event) => {
			t(() => (state = products_el.value?.getBoundingClientRect().top < 200));
		};
	});
</script>

<svg
	class:up={state}
	class={props.class}
	width="36"
	height="36"
	viewBox="0 0 36 36"
	fill="none"
	xmlns="http://www.w3.org/2000/svg"
>
	<path
		d="M18 24.3L26.1 16.2L23.535 13.68L18 19.215L12.465 13.68L9.9 16.2L18 24.3ZM18 36C15.51 36 13.17 35.5275 10.98 34.5825C8.79 33.6375 6.885 32.355 5.265 30.735C3.645 29.115 2.3625 27.21 1.4175 25.02C0.4725 22.83 0 20.49 0 18C0 15.51 0.4725 13.17 1.4175 10.98C2.3625 8.79 3.645 6.885 5.265 5.265C6.885 3.645 8.79 2.3625 10.98 1.4175C13.17 0.4725 15.51 0 18 0C20.49 0 22.83 0.4725 25.02 1.4175C27.21 2.3625 29.115 3.645 30.735 5.265C32.355 6.885 33.6375 8.79 34.5825 10.98C35.5275 13.17 36 15.51 36 18C36 20.49 35.5275 22.83 34.5825 25.02C33.6375 27.21 32.355 29.115 30.735 30.735C29.115 32.355 27.21 33.6375 25.02 34.5825C22.83 35.5275 20.49 36 18 36ZM18 32.4C22.02 32.4 25.425 31.005 28.215 28.215C31.005 25.425 32.4 22.02 32.4 18C32.4 13.98 31.005 10.575 28.215 7.785C25.425 4.995 22.02 3.6 18 3.6C13.98 3.6 10.575 4.995 7.785 7.785C4.995 10.575 3.6 13.98 3.6 18C3.6 22.02 4.995 25.425 7.785 28.215C10.575 31.005 13.98 32.4 18 32.4Z"
		fill="#F5F5DC"
	/>
</svg>

<style>
	svg {
		transition: transform 0.3s;
	}
	.up {
		transform: rotate(180deg);
	}
</style>
