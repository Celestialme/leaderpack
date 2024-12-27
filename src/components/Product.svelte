<script lang="ts">
	import type { UploadedImage } from '@src/types';
	import { language } from '@src/store.svelte';

	import ImageSlider from './ImageSlider.svelte';
	import { getProduct } from '@src/utils';
	import PlaceOrder from './PlaceOrder.svelte';
	import { page } from '$app/stores';
	import locales from '@src/locales.svelte';

	let branded = $state(false);
	let showOrderForm = $state(false);
	let item = $derived(getProduct($page.params));

	let images = $derived(
		(JSON.parse(item.images) as UploadedImage[])
			.filter((i) => !!i.branded == branded)
			.map((i) => i.url)
	);

	$effect(() => {
		globalThis.document && document.body.classList.toggle('overflow-hidden', showOrderForm);
	});
</script>

{#if item}
	{@const title = item[`title_${language.value}`]}
	{@const description = item[`description_${language.value}`]}
	{@const sizes = JSON.parse(item[`sizes_${language.value}`] || '[]').join('<br>')}
	{@const material = item[`material_${language.value}`]}
	{@const colors = item[`colors_${language.value}`]}
	{@const options = JSON.parse(item[`options_${language.value}`] || '[]').join('<br>')}
	{@const details = JSON.parse(item[`details_${language.value}`] || '[]').join('<br>')}

	<div
		class="flex w-full max-w-[2000px] items-stretch justify-center gap-[50px] overflow-visible px-1 max-lg:flex-wrap"
	>
		<div class="flex flex-col">
			<div class="h-[400px] w-[min(400px,95vw)]">
				{#if images.length > 1}
					{#key images}
						<ImageSlider {images}></ImageSlider>
					{/key}
				{:else}
					<img class="h-full w-full grow" src={images[0]} alt="Box" width="300" />
				{/if}
			</div>
			{#if item.branding}
				<div class="branding mb-[50px] mt-auto flex gap-2">
					<button onclick={() => (branded = true)} class:active={branded}
						>{locales.branded()}</button
					>
					<button onclick={() => (branded = false)} class:active={!branded}
						>{locales.unbranded()}</button
					>
				</div>
			{/if}
		</div>
		<div
			class="max-w-screen flex grow flex-col overflow-auto rounded-md border border-solid border-[#C6C69F] bg-[#FCF4F4] py-[20px] md:p-[50px]"
		>
			<h1 class="mb-[30px] text-center font-Poppins text-[22px] font-[700]">{title}</h1>
			<div class="flex flex-wrap items-center justify-between">
				<table class="grow">
					<tbody>
						<tr class:hidden={!description}>
							<td class="font-Poppins text-[20px] font-[700]">{locales.description()}:</td>
							<td class="font-Poppins">{description}</td>
						</tr>
						<tr class:hidden={!colors}>
							<td class="font-Poppins text-[20px] font-[700]">{locales.colors()}:</td>
							<td class="font-Poppins">{colors}</td>
						</tr>
						<tr class:hidden={!material}>
							<td class="font-Poppins text-[20px] font-[700]">{locales.material()}:</td>
							<td class="font-Poppins">{material}</td>
						</tr>
						<tr class:hidden={!options}>
							<td class="font-Poppins text-[20px] font-[700]">{locales.options()}:</td>
							<td class="font-Poppins">{@html options}</td>
						</tr>
						<tr class:hidden={!details}>
							<td class="font-Poppins text-[20px] font-[700]">{locales.details()}:</td>
							<td class="font-Poppins">{@html details}</td>
						</tr>
						<tr class:hidden={!sizes}>
							<td class="font-Poppins text-[20px] font-[700]">{locales.sizes()}:</td>
							<td class="font-Poppins">{@html sizes}</td>
						</tr>
					</tbody>
				</table>

				<img
					src="/{locales.branding()}.png"
					alt=""
					class="mx-auto my-4 max-h-[150px] max-lg:max-h-[120px]"
				/>
			</div>
			<div class="mt-auto">
				<button
					onclick={() => (showOrderForm = true)}
					class="mt-2 h-[40px] w-full rounded-md bg-[#609966] px-[10px] font-Poppins text-[20px] font-[700] text-white"
					>{locales.placeOrder()}</button
				>
			</div>
		</div>
	</div>
{/if}
{#if showOrderForm}
	<PlaceOrder bind:show={showOrderForm} />
{/if}

<style>
	.branding button {
		background-color: white;
		font-family: Poppins;
		font-size: 18px;
		font-weight: 600;
		color: black;
		padding: 5px 15px;
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
	td {
		padding: 0 5px;
		vertical-align: top;
	}
</style>
