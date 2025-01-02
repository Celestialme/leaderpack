<script lang="ts">
	import { products_el } from '@src/store.svelte';

	import ProductCard from './ProductCard.svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { language } from '@src/store.svelte';
	import locales from '@src/locales.svelte';
	let categories = $page.data.categories;
</script>

<svelte:head>
	<meta property="og:title" content={locales.categories()} />
</svelte:head>

<div class="wrapper" bind:this={products_el.value}>
	{#each categories as category}
		<ProductCard
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
		justify-content: space-evenly;
		grid-template-columns: repeat(auto-fit, 280px);
		gap: 50px;
	}
</style>
