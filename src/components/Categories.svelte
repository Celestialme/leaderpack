<script lang="ts">
	import { products_el } from '@src/store';

	import CategoryCard from './CategoryCard.svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { language } from '@src/store.svelte';
	let categories = $page.data.categories;
</script>

<div class="wrapper" bind:this={$products_el}>
	{#each categories as category}
		<CategoryCard
			src={category.imageURL}
			title={category[`title_${language.value}`]}
			onclick={() =>
				goto(`/${language.value}/products/${category[`title_${language.value}`].intoSlug()}`)}
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
