<script lang="ts">
	import FloatingInput from '@src/components/FloatingInput.svelte';
	import Language from '@src/components/Language.svelte';
	import Switch from '@src/components/Switch.svelte';
	import type { Mode, ProductData } from '@src/types';
	import { obj2formData } from '@src/utils';
	import axios from 'axios';
	import { createEventDispatcher, onDestroy } from 'svelte';
	import RelatedProducts from './RelatedProducts.svelte';
	import Images from './Images.svelte';
	import { inputError } from '@src/store';
	export let show = false;
	export let category_id: string;
	export let mode: Mode = 'create';
	let showRelatedProducts = false;
	let showImages = false;
	const dispatch = createEventDispatcher();
	async function save() {
		if ($inputError.message) return;
		if (mode === 'create') {
			await axios.put(
				'/api/products',
				obj2formData({
					...data,
					relatedProducts: data.relatedProducts.array.map((product) => product.id).join(','),
					category_id
				}),
				{ headers: { 'Content-Type': 'multipart/form-data' } }
			);
		} else if (mode === 'edit') {
			await axios.patch(
				'/api/products',
				obj2formData({
					...data,
					relatedProducts: data.relatedProducts.array.map((product) => product.id).join(','),
					category_id
				}),
				{
					headers: { 'Content-Type': 'multipart/form-data' }
				}
			);
		}
		show = false;
		dispatch('refresh');
	}

	export let data: ProductData = {
		images: { array: [], string: '' },
		branding: 0,
		relatedProducts: { array: [], string: '' },
		en: {
			title: '',
			description: '',
			sizes: '',
			material: '',
			colors: '',
			details: '',
			options: ''
		},
		ka: {
			title: '',
			description: '',
			sizes: '',
			material: '',
			colors: '',
			details: '',
			options: ''
		}
	};

	let language: 'en' | 'ka' = 'en';
	$: if (data[language].title.includes('_')) {
		$inputError.set({ message: '_ is not allowed in category name', type: 'error' });
	} else {
		$inputError.clear();
	}
	onDestroy(() => {
		$inputError.clear();
	});
</script>

<div
	on:click={() => (show = false)}
	class="fixed left-0 top-0 z-10 flex h-screen w-screen items-center justify-center bg-black opacity-50"
></div>

<div
	class="fixed left-1/2 top-1/2 z-20 flex w-[500px] max-w-[90vw] -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2 rounded-lg bg-white p-[50px]"
>
	<Language class="absolute right-4 top-2" bind:language />
	<FloatingInput label="title" name="title" type="text" bind:value={data[language].title}
	></FloatingInput>
	<FloatingInput
		label="description"
		name="title"
		type="text"
		bind:value={data[language].description}
	/>
	<FloatingInput
		label="material"
		name="material"
		type="text"
		bind:value={data[language].material}
	/>
	<FloatingInput label="sizes" name="sizes" type="text" bind:value={data[language].sizes}
	></FloatingInput>
	<FloatingInput label="colors" name="colors" type="text" bind:value={data[language].colors}
	></FloatingInput>
	<FloatingInput label="options" name="options" type="text" bind:value={data[language].options}
	></FloatingInput>
	<FloatingInput label="details" name="details" type="text" bind:value={data[language].details}
	></FloatingInput>
	<div class="flex w-full items-center justify-between font-Poppins">
		Branding <Switch bind:checked={data.branding} />
	</div>
	<button on:click={() => (showImages = !showImages)} class="w-full">IMAGES</button>
	<button on:click={() => (showRelatedProducts = !showRelatedProducts)} class="w-full"
		>RELATED PRODUCTS</button
	>
	<button on:click={save}>Save</button>
</div>
{#if showRelatedProducts}
	<RelatedProducts
		self={data}
		bind:show={showRelatedProducts}
		bind:relatedProducts={data.relatedProducts}
	></RelatedProducts>
{/if}
{#if showImages}
	<Images bind:show={showImages} bind:images={data.images} />
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
