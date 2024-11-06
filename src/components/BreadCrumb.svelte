<script lang="ts">
	export let items: string[] = [];
</script>

<p
	class="sticky top-[140px] z-20 flex items-center gap-[10px] bg-white py-[20px] font-Poppins text-[20px] font-[400]"
>
	{#each items as item, index}
		<span>{item.replace('_', ' ')}</span>
		{#if index !== items.length - 1}
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
