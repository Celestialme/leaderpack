<script lang="ts">
	import { track } from '@src/store.svelte';
	import AddButton from './icons/AddButton.svelte';
	import Delete from './icons/Delete.svelte';

	interface Props {
		label: string;
		value: string;
	}

	let { label, value = $bindable() }: Props = $props();
	let array: string[] = $state(value ? (JSON.parse(value) as string[]) : []);
	track(
		() => (value = JSON.stringify(array)),
		() => $state.snapshot(array)
	);
	track(
		() => (array = value ? (JSON.parse(value) as string[]) : []),
		() => value
	);
</script>

<div class="container relative my-1 w-full">
	<div class="flex w-full justify-between">
		<p class="text-center">{label}</p>
		<AddButton onclick={() => array.push('')} class="cursor-pointer active:scale-90"></AddButton>
	</div>
	{#each array as _, i}
		<div class="flex w-full justify-between gap-2">
			<input
				type="text"
				bind:value={array[i]}
				class="grow rounded-md border border-solid border-[#C6C69F] p-[5px]"
			/>
			<Delete
				onclick={() => (array = array.filter((_, index) => index !== i))}
				class="cursor-pointer active:scale-90"
			/>
		</div>
	{/each}
</div>

<style>
	.container {
		position: relative;
		display: flex;
		flex-direction: column;
		width: 100%;
		padding: 5px 0px;
		gap: 10px;
		align-items: center;
	}
</style>
