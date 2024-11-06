<script lang="ts">
	import BreadCrumb from './BreadCrumb.svelte';

	import { page } from '$app/stores';
	import type { Product, UploadedImage } from '@src/types';
	import { language } from '@src/store';

	import ImageSlider from './ImageSlider.svelte';
	import { getProductThumbnail } from '@src/utils';
	import PlaceOrder from './PlaceOrder.svelte';

	let category = $page.params.category;
	let product = $page.params.product;
	let branded = false;
	let showOrderForm = false;
	$: item = $page.data.product as Product;
	$: images = (JSON.parse(item.images) as UploadedImage[])
		.filter((i) => !!i.branded == branded)
		.map((i) => i.url);
	$: {
		globalThis.document && document.body.classList.toggle('overflow-hidden', showOrderForm);
	}
</script>

<div class="p-[20px]">
	<BreadCrumb items={['Home', category, product]}></BreadCrumb>

	{#if item}
		<!-- <ItemCard title={item.title} description={item.description}></ItemCard> -->
		<div class="flex flex-wrap items-stretch justify-center gap-[50px]">
			<div class="flex flex-col justify-between">
				<div class="h-[400px] w-[400px]">
					{#if images.length > 1}
						{#key images}
							<ImageSlider {images}></ImageSlider>
						{/key}
					{:else}
						<img class="h-full w-full grow" src={getProductThumbnail(item)} alt="Box" width="300" />
					{/if}
				</div>
				{#if item.branding}
					<div class="branding mt-2 flex gap-2">
						<button on:click={() => (branded = true)} class:active={branded}>Branded</button>
						<button on:click={() => (branded = false)} class:active={!branded}>Unbranded</button>
					</div>
				{/if}
			</div>
			<div
				class=" flex grow flex-col rounded-md border border-solid border-[#C6C69F] bg-[#FCF4F4] p-[50px] py-[20px]"
			>
				<h1 class="mb-[30px] text-center font-Poppins text-[22px] font-[700]">
					{item[`title_${$language}`]}
				</h1>
				<div class="flex items-center justify-between">
					<div>
						<p>{item[`description_${$language}`]}</p>
						<p>sizes: {item[`sizes_${$language}`]}</p>
						<p>colors: {item[`colors_${$language}`]}</p>
						<p>material: {item[`material_${$language}`]}</p>
						<p>options: {item[`options_${$language}`]}</p>
						<p>details: {item[`details_${$language}`]}</p>
					</div>
					<img src="/branding.png" alt="" class="max-h-[100px] min-w-[min(200px,15vw)]" />
				</div>
				<div class="mt-auto">
					<button
						on:click={() => (showOrderForm = true)}
						class="mt-2 h-[40px] w-full rounded-md bg-[#609966] px-[10px] font-Poppins text-[20px] font-[700] text-white"
						>Place Order</button
					>
				</div>
			</div>
		</div>
	{/if}
</div>
{#if showOrderForm}
	<PlaceOrder bind:show={showOrderForm} on:close={() => (showOrderForm = false)} />
{/if}

<style>
	p {
		font-family: Poppins;
		font-weight: 400;
		font-size: 20px;
	}
	.branding button {
		background-color: white;
		font-family: Poppins;
		font-size: 18px;
		font-weight: 600;
		color: black;
		padding: 5px 20px;
		border-radius: 5px;
		border: none;
		cursor: pointer;
		margin-top: 20px;
		flex-grow: 1;
		border-radius: 6px;
		border: solid 1px gray;
	}
	.branding .active {
		background-color: #609966;
		color: white;
	}
	button:active {
		transform: scale(0.9);
	}
</style>
