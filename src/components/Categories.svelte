<script lang="ts">
	import { language, products_el } from '@src/store';
	import CategoryCard from './CategoryCard.svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	let categories = $state($page.data.categories);
</script>

<div class="wrapper" bind:this={$products_el}>
	{#each categories as category}
		<CategoryCard
			src={category.imageURL}
			title={category[`title_${$language}`]}
			on:click={() => goto(`/${$language}/products/${category[`title_${$language}`].intoSlug()}`)}
		/>
	{/each}
</div>

<style>
	.wrapper {
		display: grid;
		margin-top: 50px;
		justify-content: space-evenly;
		grid-template-columns: repeat(auto-fit, 280px);
		gap: 50px;
	}
</style>
