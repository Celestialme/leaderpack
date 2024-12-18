<script lang="ts">
	import FloatingInput from '@src/components/FloatingInput.svelte';
	import Language from '@src/components/Language.svelte';
	import Switch from '@src/components/Switch.svelte';
	import type { Mode, ProductData } from '@src/types';
	import { obj2formData } from '@src/utils';
	import axios from 'axios';
	import { onDestroy } from 'svelte';
	import RelatedProducts from './RelatedProducts.svelte';
	import Images from './Images.svelte';
	import { track, inputError, productData } from '@src/store.svelte';
	import ArrayInput from '@src/components/ArrayInput.svelte';
	let showRelatedProducts = $state(false);
	let showImages = $state(false);

	async function save() {
		if (inputError.value.message) return;
		if (mode === 'create') {
			await axios.put(
				'/api/products',
				obj2formData({
					...productData(),
					relatedProducts: productData()
						.relatedProducts.array.map((product) => product.id)
						.join(','),
					category_id
				}),
				{ headers: { 'Content-Type': 'multipart/form-data' } }
			);
		} else if (mode === 'edit') {
			console.log(productData());
			await axios.patch(
				'/api/products',
				obj2formData({
					...productData(),
					relatedProducts: productData()
						.relatedProducts.array.map((product) => product.id)
						.join(','),
					category_id
				}),
				{
					headers: { 'Content-Type': 'multipart/form-data' }
				}
			);
		}
		show = false;
		onrefresh();
	}

	interface Props {
		show?: boolean;
		category_id: string;
		mode?: Mode;
		onrefresh: () => void;
	}

	let { show = $bindable(false), category_id, mode = 'create', onrefresh }: Props = $props();

	let language: 'en' | 'ka' = $state('en');

	track(
		() => {
			if (productData()[language].title.includes('_')) {
				inputError.value.set({ message: '_ is not allowed in product name', type: 'error' });
			} else {
				inputError.value.clear();
			}
		},
		() => productData()[language].title
	);
	onDestroy(() => {
		inputError.value.clear();
	});
</script>

<div
	onclick={() => (show = false)}
	class="fixed left-0 top-0 z-10 flex h-screen w-screen items-center justify-center bg-black opacity-50"
></div>

<div
	class="fixed left-1/2 top-1/2 z-20 flex max-h-[95vh] w-[500px] max-w-[90vw] -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2 overflow-y-scroll rounded-lg bg-white p-[50px]"
>
	<Language class="absolute right-4 top-2" bind:language />
	<FloatingInput
		label="title"
		name="title"
		type="text"
		bind:value={productData.value[language].title}
	></FloatingInput>
	<FloatingInput
		label="description"
		name="title"
		type="text"
		bind:value={productData.value[language].description}
	/>
	<FloatingInput
		label="material"
		name="material"
		type="text"
		bind:value={productData.value[language].material}
	/>

	<ArrayInput bind:value={productData.value[language].sizes} label="sizes" />
	<FloatingInput
		label="colors"
		name="colors"
		type="text"
		bind:value={productData.value[language].colors}
	></FloatingInput>
	<ArrayInput bind:value={productData.value[language].options} label="options" />
	<FloatingInput
		label="details"
		name="details"
		type="text"
		bind:value={productData.value[language].details}
	></FloatingInput>
	<div class="flex w-full items-center justify-between font-Poppins">
		Branding <Switch bind:checked={productData.value.branding} />
	</div>
	<button onclick={() => (showImages = !showImages)} class="w-full">IMAGES</button>
	<button onclick={() => (showRelatedProducts = !showRelatedProducts)} class="w-full"
		>RELATED PRODUCTS</button
	>
	<button onclick={save}>Save</button>
</div>
{#if showRelatedProducts}
	<RelatedProducts
		self={productData.value}
		bind:show={showRelatedProducts}
		bind:relatedProducts={productData.value.relatedProducts}
	></RelatedProducts>
{/if}
{#if showImages}
	<Images bind:show={showImages} />
{/if}

<style>
	button {
		background-color: #609966;
		color: white;
		font-family: Poppins;
		font-weight: 600;
		font-size: 18px;
		padding: 5px 20px;
		border-radius: 5px;
		border: none;
		cursor: pointer;
		margin-top: 20px;
	}
	button:active {
		transform: scale(0.9);
	}
</style>
