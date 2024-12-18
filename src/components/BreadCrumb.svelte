<script lang="ts">
	let { items }: { items: string[] } = $props();
	let cleaned = $derived(items.filter((x) => x));
</script>

<p
	class="z-20 flex w-full items-center gap-[10px] bg-white py-[20px] pl-2 font-Poppins text-[20px] font-[400]"
>
	{#each cleaned as item, index}
		<span
			class:w-min={index == 0}
			class:overflow-visible={index == 0}
			class="w-min overflow-auto whitespace-nowrap">{item.fromSlug()}</span
		>
		{#if index !== cleaned.length - 1}
			<svg
				class="!inline-block"
				width="9"
				height="9"
				viewBox="0 0 9 9"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M2.9845 4.5L0.125122 1.625L1.00012 0.75L4.75012 4.5L1.00012 8.25L0.125122 7.375L2.9845 4.5ZM7.1095 4.5L4.25012 1.625L5.12512 0.75L8.87512 4.5L5.12512 8.25L4.25012 7.375L7.1095 4.5Z"
					fill="#1C1B1F"
				/>
			</svg>
		{/if}
	{/each}
</p>
