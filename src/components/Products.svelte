<script lang="ts">
	import { language } from '@src/store.svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { getProductsByCategory, getProductThumbnail } from '@src/utils';
	import ProductCard from './ProductCard.svelte';
	let category = $derived($page.params.category);
	let products = $derived(getProductsByCategory($page.data as any, category));
</script>

<div class="p-[20px]">
	<div class="flex flex-wrap justify-center gap-4">
		{#each products as product}
			<ProductCard
				src={getProductThumbnail(product)}
				onclick={() =>
					goto(
						`/${language.value}/products/${category.intoSlug()}/${product[`title_${language.value}`].intoSlug()}`
					)}
				title={product[`title_${language.value}`]}
			></ProductCard>
		{/each}
	</div>
</div>
