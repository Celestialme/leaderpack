<script lang="ts">
	import { page } from '$app/stores';
	import type { Category, Product } from '@src/types';
	import ProductCard from './ProductCard.svelte';
	import { createScroll, getProduct, getProductById } from '@src/utils';
	import { goto } from '$app/navigation';
	import { language } from '@src/store.svelte';
	import locales from '@src/locales.svelte';

	let item = $derived(getProduct($page.params));
	let relatedProducts = $derived(
		item.relatedProducts
			.split(',')
			.filter((id) => id)
			.map((id) => {
				let product = getProductById(id);
				let category = $page.data.categories.find((c: Category) => c.id == product.category_id);
				return {
					...product,
					category_title_en: category[`title_en`],
					category_title_ka: category[`title_ka`]
				};
			})
	);
</script>

{#if relatedProducts.length > 0}
	<div class="w-full max-w-[2000px] p-[20px]">
		<p class="mx-auto my-4 font-Poppins text-[20px] font-[700]">{locales.relatedProducts()}</p>
		<div class="my-4 flex gap-[50px] overflow-auto" use:createScroll>
			{#each relatedProducts as product}
				<div class="max-w-1/2">
					<ProductCard
						title={product[`title_${language.value}`]}
						src={JSON.parse(product.images)[0]?.url}
						onclick={async () => {
							goto(
								`/${$page.params.language}/products/${product[`category_title_${language.value}`]}/${product[`title_${language.value}`].intoSlug()}`
							);
						}}
					/>
				</div>
			{/each}
		</div>
	</div>
{/if}

<style>
	.overflow-auto::-webkit-scrollbar {
		width: 0;
	}
	.overflow-auto {
		scrollbar-width: none;
	}
</style>
