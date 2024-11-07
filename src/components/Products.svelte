<script lang="ts">
	import { language } from '@src/store.svelte';
	import BreadCrumb from './BreadCrumb.svelte';
	import ProductCard from './ProductCard.svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import type { Product } from '@src/types';
	import { getProductThumbnail } from '@src/utils';
	let category = $page.params.category;

	let items: Product[] = ($page.data.products as Product[]) || [];
</script>

<div class="p-[20px]">
	<BreadCrumb items={['Home', category]}></BreadCrumb>

	<div class="grid">
		{#each items as item}
			<ProductCard
				src={getProductThumbnail(item)}
				onclick={() =>
					goto(`/${language.value}/products/${category.intoSlug()}/${item.title_en.intoSlug()}`)}
				title={item[`title_${language.value}`]}
				description={item[`description_${language.value}`]}
				material={item[`material_${language.value}`]}
				sizes={item[`sizes_${language.value}`]}
			></ProductCard>
		{/each}
	</div>
</div>

<style>
	.grid {
		grid-template-columns: repeat(auto-fit, minmax(min(500px, 90%), 1fr));

		justify-content: center;
		gap: 50px;
	}
	@media (min-width: 1500px) {
		.grid {
			padding: 0 15%;
			grid-template-columns: 1fr 1fr; /* 2 columns for screens wider than 400px */
		}
	}
</style>
