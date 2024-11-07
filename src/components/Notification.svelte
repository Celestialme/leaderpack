<script>
	import { inputError } from '@src/store.svelte';
	import { fly } from 'svelte/transition';
</script>

<div transition:fly={{ y: -200, opacity: 0 }}>{inputError.value.message}</div>

<style>
	div {
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
		background-color: #ea580c;
		backdrop-filter: blur(5px);
		color: white;
		padding: 10px;
		border-radius: 6px;
	}
</style>
