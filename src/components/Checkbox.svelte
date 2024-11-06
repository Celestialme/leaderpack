<script context="module" lang="ts">
	let _group: { [key: string]: (() => void)[] } = {};
</script>

<script lang="ts">
	import { onDestroy, onMount } from 'svelte';

	export let checked: boolean;
	export let group: string = '';
	export let label: string = '';
	export let selected: boolean = false;
	let callback = () => {
		checked = false;
	};
	onMount(() => {
		_group[group] ? _group[group].push(callback) : (_group[group] = [callback]);
		if (selected) {
			!checked && (checked = Object.keys(_group[group] || {}).length === 1 ? true : false);
			if (checked) update(true);
		}
	});
	onDestroy(() => {
		_group[group] = _group[group].filter((updater) => updater !== updater);
	});
	function update(_checked: boolean) {
		if (group)
			for (let _callback of _group[group]) {
				if (_callback !== callback) {
					_callback();
				}
			}
		checked = _checked;
	}
</script>

<div class="flex w-full items-center justify-between {$$props.class}">
	<p class="font-Poppins text-[16px] font-[500]">{label}</p>

	<div
		on:click={() => update(selected ? true : !checked)}
		class="h-[30px] w-[30px] rounded-md border-2 border-solid border-black bg-white p-[4px]"
	>
		{#if checked}
			<div class="h-full w-full rounded-sm bg-green-400" />
		{/if}
	</div>
</div>
