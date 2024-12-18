<script lang="ts">
	import AddButton from '@src/components/icons/AddButton.svelte';
	import axios from 'axios';
	import { page } from '$app/stores';
	import CreateProduct from '../components/createProduct.svelte';
	import ProductCard from '@src/components/ProductCard.svelte';
	import Delete from '@src/components/icons/Delete.svelte';
	import Edit from '@src/components/icons/Edit.svelte';
	import type { Product } from '@src/types';
	import { getProductThumbnail } from '@src/utils';
	import { productData } from '@src/store.svelte';

	let category_id = $page.url.searchParams.get('category_id') as string;
	let products: Product[] = [];
	function refresh() {
		axios.get(`/api/products?category_id=${category_id}`).then((res) => {
			products = res.data;
		});
	}
	refresh();
	let showDialog = false;

	let mode: 'create' | 'edit' = 'create';
	function editProduct(product: Product) {
		productData.set({
			images: { array: [], string: product.images },
			branding: product.branding,
			id: product.id,
			relatedProducts: { array: [], string: product.relatedProducts },
			en: {
				title: product.title_en,
				description: product.description_en,
				material: product.material_en,
				sizes: product.sizes_en,
				colors: product.colors_en,
				options: product.options_en,
				details: product.details_en
			},
			ka: {
				title: product.title_ka,
				description: product.description_ka,
				material: product.material_ka,
				sizes: product.sizes_ka,
				colors: product.colors_ka,
				options: product.options_ka,
				details: product.details_ka
			}
		});
		mode = 'edit';
		showDialog = true;
	}
</script>

<div class="flex flex-col">
	<button
		onclick={() => {
			productData.refresh();
			mode = 'create';
			showDialog = !showDialog;
		}}
		class="ml-auto p-2"><AddButton /></button
	>
	<div class="flex flex-wrap items-stretch justify-center gap-[50px] p-[50px]">
		{#each products as product}
			<div class="relative">
				<div class=" mb-2 flex items-center justify-center">
					<button onclick={() => editProduct(product)}><Edit /></button>
					<button
						onclick={() =>
							axios
								.delete(`/api/products?product_id=${product.id}&category_id=${category_id}`)
								.then(() => refresh())}><Delete /></button
					>
				</div>
				<ProductCard src={getProductThumbnail(product)} title={product.title_en}></ProductCard>
			</div>
		{/each}
	</div>
</div>
{#if showDialog}
	<CreateProduct bind:show={showDialog} {category_id} {mode} onrefresh={refresh} />
{/if}
