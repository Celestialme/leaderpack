<script lang="ts">
	import { products_el } from '@src/store';
	import ProductCard from './ProductCard.svelte';
</script>

<p
	bind:this={$products_el}
	class="my-[20px] text-center font-Poppins text-[20px] font-[700] text-[#014B82]"
>
	Wrap with pride! Superior packaging solutions
</p>

<div class="wrapper">
	{#each Array(9) as _}
		<ProductCard />
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
