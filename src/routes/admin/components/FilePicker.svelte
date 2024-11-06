<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	let input: HTMLInputElement;
	let dispatch = createEventDispatcher();
	let file: File;
	function onchange() {
		if (!input.files) return;
		file = input.files[0];
		dispatch('change', file);
	}
</script>

<input type="file" hidden on:change={onchange} bind:this={input} />

<div class="flex w-full items-center justify-between gap-2">
	<button on:click={() => input.click()}>SELECT IMAGE</button>
	<p class="max-w-[500px] overflow-hidden text-ellipsis text-right font-Poppins">
		{file?.name || 'No file selected'}
	</p>
</div>

<style>
	button {
		min-width: 165px;
		background-color: #609966;
		color: white;
		font-family: Poppins;
		font-weight: 600;
		font-size: 18px;
		padding: 5px 20px;
		border-radius: 5px;
		border: none;
		cursor: pointer;
	}
	button:active {
		transform: scale(0.9);
	}
</style>
