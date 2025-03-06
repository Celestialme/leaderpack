<script lang="ts">
	import CloseIcon from '@src/components/icons/CloseIcon.svelte';
	import Delete from '@src/components/icons/Delete.svelte';
	import ProductCard from '@src/components/ProductCard.svelte';
	import Search from '@src/components/Search.svelte';
	import type { Product, ProductData } from '@src/types';
	import { obj2formData } from '@src/utils';
	import axios from 'axios';
	import { onMount } from 'svelte';
	interface Props {
		show?: boolean;
		relatedProducts?: { array: Product[]; string: string };
		self: ProductData;
	}

	let {
		show = $bindable(false),
		relatedProducts = $bindable({ array: [], string: '' }),
		self
	}: Props = $props();
	let search = $state('');
	let products: Product[] = $state([]);
	let filteredProducts: Product[] = $state([]);

	if (relatedProducts.string) {
		let relatedProductIDS = relatedProducts.string.split(',');

		axios
			.post('/api/products/relatedProducts', obj2formData({ ids: relatedProductIDS }))
			.then((res) => {
				relatedProducts.array = [];
				for (let id of relatedProductIDS) {
					let product = res.data.find((p: Product) => p.id == id);
					product && relatedProducts.array.push(product);
				}
			});
	}
	onMount(() => {
		axios.get('/api/products').then((res) => {
			products = res.data;
		});
	});
	$effect(() => {
		filteredProducts =
			search === ''
				? []
				: products.filter(
						(product) =>
							product.id != self.id &&
							(product.title_en.includes(search) || product.title_ka.includes(search))
					);
	});
</script>

{#if show}
	<div
		class="fixed left-1/2 top-1/2 z-20 flex h-[90%] w-[90%] -translate-x-1/2 -translate-y-1/2 flex-col bg-white px-4 py-2"
	>
		<div class="mb-4 flex items-center justify-between">
			<p class="mx-auto font-Poppins text-[20px] font-[700]">RELATED PRODUCTS</p>
			<CloseIcon class="" onclick={() => (show = false)} />
		</div>
		<Search bind:value={search} class="mb-2 w-full"></Search>
		<div class="flex flex-wrap justify-center gap-5 overflow-auto">
			{#each filteredProducts as product}
				<ProductCard
					class="mb-2"
					title={product.title_ka}
					src={JSON.parse(product.images)[0]?.url}
					onclick={() => {
						relatedProducts.array.push(product);
						relatedProducts = relatedProducts;
						search = '';
					}}
				/>
			{/each}
		</div>
		<div
			class=" overflow-auto"
			class:hidden={filteredProducts.length > 0 || relatedProducts.array.length === 0}
		>
			<p class="py-2 font-Poppins text-[20px] font-[700]">Saved Related Products</p>
			<div class="flex flex-wrap justify-center gap-5">
				{#each relatedProducts.array as product}
					<div class="relative">
						<Delete
							onclick={() => {
								relatedProducts.array = relatedProducts.array.filter((p) => p !== product);
								relatedProducts = relatedProducts;
							}}
							class="absolute right-2 top-2 cursor-pointer"
						/>
						<ProductCard
							class="mb-2"
							title={product.title_ka}
							src={JSON.parse(product.images)[0]?.url}
						/>
					</div>
				{/each}
			</div>
		</div>
	</div>
{/if}
