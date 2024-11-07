<script lang="ts">
	import { run } from 'svelte/legacy';

	import { page } from '$app/stores';
	import type { Product } from '@src/types';
	import ProductCard from './ProductCard.svelte';
	import { createScroll } from '@src/utils';
	import { goto } from '$app/navigation';
	import { language } from '@src/store';
	let relatedProducts: (Product & { category_title_en: string; category_title_ka: string })[] =
		$derived($page.data?.product?.relatedProducts || []);
</script>

{#if relatedProducts.length > 0}
	<div class="p-[20px]">
		<p class="mx-auto my-4 font-Poppins text-[20px] font-[700]">Related Products</p>
		<div class="my-4 flex items-stretch gap-2 overflow-auto" use:createScroll>
			{#each relatedProducts as product}
				<div class="max-w-1/2 max-h-[200px] min-w-[500px] flex-grow">
					<ProductCard
						class="mb-2 h-full"
						title={product.title_en}
						description={product.description_en}
						src={JSON.parse(product.images)[0]?.url}
						material={product.material_en}
						sizes={product.sizes_en}
						onclick={async () => {
							goto(
								`/${$page.params.language}/products/${product[`category_title_${$language}`]}/${product[`title_${$language}`].intoSlug()}`
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
