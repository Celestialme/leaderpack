<script lang="ts">
	import { data, products_el } from '@src/store';
	import ProductCard from './ProductCard.svelte';
	import { goto } from '$app/navigation';
</script>

<p
	bind:this={$products_el}
	class="my-[20px] scroll-mt-[150px] text-center font-Poppins text-[20px] font-[700] text-[#014B82]"
>
	Wrap with pride! Superior packaging solutions
</p>

<div class="wrapper">
	{#each $data as category}
		<ProductCard
			title={category.title}
			on:click={() => goto(`/products/${category.title.intoSlug()}`)}
		/>
	{/each}
</div>

<style>
	.wrapper {
		display: grid;

		justify-content: space-evenly;
		grid-template-columns: repeat(auto-fit, 280px);
		gap: 50px;
	}
</style>
