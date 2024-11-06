<script lang="ts">
	import locales from '@src/locales';
	import Plus from './icons/Plus.svelte';

	$: faqs = $locales.faqs();
	let expanded: number | null = null;
</script>

<div
	class="mx-auto my-[150px] flex w-[700px] max-w-[90vw] flex-col gap-1 font-Poppins text-[#3d3d3d]"
>
	{#each faqs as faq, index}
		<div class="rounded-lg border border-solid border-[#d1d1d1] px-2 py-3">
			<div
				on:click={() => {
					expanded == index ? (expanded = null) : (expanded = index);
				}}
				class="flex cursor-pointer items-center font-Poppins text-[20px] font-[600]"
			>
				{faq.question}
				<div class="ml-auto transition" class:close={expanded == index}>
					<Plus />
				</div>
			</div>
			<div class="grid pl-2" class:expanded={expanded == index}>
				<p class="overflow-hidden font-Poppins text-[16px] font-[400]">
					<br />
					{@html faq.answer}
				</p>
			</div>
		</div>
	{/each}
</div>

<style>
	.grid {
		grid-template-rows: 0fr;
		transition: grid-template-rows 0.3s;
	}

	.expanded {
		grid-template-rows: 1fr;
	}
	.close {
		transform: rotate(45deg);
	}
</style>
