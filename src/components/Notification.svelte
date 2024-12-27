<script>
	import { notification } from '@src/store.svelte';
	import { fly } from 'svelte/transition';
	let background = $derived.by(() => {
		if (notification.value.type === 'error') return '#ea580c';
		if (notification.value.type === 'success') return '#4fdc4f';
		return 'transparent';
	});
</script>

<div style="background-color: {background}" transition:fly={{ y: -200, opacity: 0 }}>
	{notification.value.message}
</div>

<style>
	div {
		text-align: center;
		position: fixed;
		display: flex;
		align-items: center;
		justify-content: center;
		left: 50%;
		top: 0;
		transform: translate(-50%);
		z-index: 50;
		max-width: 90vw;
		width: 500px;
		min-height: 50px;
		backdrop-filter: blur(5px);
		color: white;
		padding: 10px;
		border-radius: 6px;
	}
</style>
