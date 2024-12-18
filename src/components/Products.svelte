<script lang="ts">
	import { language } from '@src/store.svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import type { Product } from '@src/types';
	import { getProductThumbnail } from '@src/utils';
	import ProductCard from './ProductCard.svelte';
	let category = $page.params.category;

	let items: Product[] = ($page.data.products as Product[]) || [];
</script>

<div class="p-[20px]">
	<div class="flex flex-wrap justify-center gap-4">
		{#each items as item}
			<ProductCard
				src={getProductThumbnail(item)}
				onclick={() =>
					goto(`/${language.value}/products/${category.intoSlug()}/${item.title_en.intoSlug()}`)}
				title={item[`title_${language.value}`]}
			></ProductCard>
		{/each}
	</div>
</div>
