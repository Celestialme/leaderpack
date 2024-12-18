<script lang="ts">
	import { page } from '$app/stores';
	import type { Product } from '@src/types';
	import ProductCard from './ProductCard.svelte';
	import { createScroll } from '@src/utils';
	import { goto } from '$app/navigation';
	import { language } from '@src/store.svelte';
	let relatedProducts: (Product & { category_title_en: string; category_title_ka: string })[] =
		$derived($page.data?.product?.relatedProducts || []);
</script>

{#if relatedProducts.length > 0}
	<div class="p-[20px]">
		<p class="mx-auto my-4 font-Poppins text-[20px] font-[700]">Related Products</p>
		<div class="my-4 flex items-stretch gap-2 overflow-auto" use:createScroll>
			{#each relatedProducts as product}
				<div class="max-w-1/2 min-w-[500px] flex-grow">
					<ProductCard
						title={product.title_en}
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
