<script lang="ts">
	import CloseIcon from '@src/components/icons/CloseIcon.svelte';
	import Delete from '@src/components/icons/Delete.svelte';
	import ProductCard from '@src/components/ProductCard.svelte';
	import Search from '@src/components/Search.svelte';
	import type { Product, ProductData } from '@src/types';
	import { obj2formData } from '@src/utils';
	import axios from 'axios';
	import { onMount } from 'svelte';
	export let show = false;
	export let relatedProducts: { array: Product[]; string: string } = { array: [], string: '' };
	export let self: ProductData;
	let search = '';
	let products: Product[] = [];
	let filteredProducts: Product[] = [];

	if (relatedProducts.string) {
		axios
			.post(
				'/api/products/relatedProducts',
				obj2formData({ ids: relatedProducts.string.split(',') })
			)
			.then((res) => (relatedProducts.array = res.data));
	}
	onMount(() => {
		axios.get('/api/products').then((res) => {
			products = res.data;
		});
	});
	$: filteredProducts =
		search === ''
			? []
			: products.filter(
					(product) =>
						product.id != self.id &&
						(product.title_en.includes(search) || product.title_ka.includes(search))
				);
</script>

<div
	class="fixed left-1/2 top-1/2 z-20 flex h-[90%] w-[90%] -translate-x-1/2 -translate-y-1/2 flex-col bg-white px-4 py-2"
>
	<div class="mb-4 flex items-center justify-between">
		<p class="mx-auto font-Poppins text-[20px] font-[700]">RELATED PRODUCTS</p>
		<CloseIcon class="" on:click={() => (show = false)} />
	</div>
	<Search bind:value={search} class="mb-2 w-full"></Search>
	<div class="overflow-auto">
		{#each filteredProducts as product}
			<ProductCard
				class="mb-2"
				title={product.title_en}
				description={product.description_en}
				src={JSON.parse(product.images)[0]?.url}
				material={product.material_en}
				sizes={product.sizes_en}
				on:click={() => {
					relatedProducts.array.push(product);
					relatedProducts = relatedProducts;
					search = '';
				}}
			/>
		{/each}
	</div>
	<div
		class="overflow-auto"
		class:hidden={filteredProducts.length > 0 || relatedProducts.array.length === 0}
	>
		<p class="py-2 font-Poppins text-[20px] font-[700]">Saved Related Products</p>
		{#each relatedProducts.array as product}
			<div class="relative">
				<Delete
					on:click={() => {
						relatedProducts.array = relatedProducts.array.filter((p) => p !== product);
						relatedProducts = relatedProducts;
					}}
					class="absolute right-2 top-2 cursor-pointer"
				/>
				<ProductCard
					class="mb-2"
					title={product.title_en}
					description={product.description_en}
					src={JSON.parse(product.images)[0]?.url}
					material={product.material_en}
					sizes={product.sizes_en}
				/>
			</div>
		{/each}
	</div>
</div>
