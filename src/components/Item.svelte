<script lang="ts">
	import { data } from '@src/store';
	import BreadCrumb from './BreadCrumb.svelte';

	import { page } from '$app/stores';
	let category = $page.params.category;
	let product = $page.params.product;
	$: item = $data
		.findLast((c) => c.title.intoSlug() == category)
		?.items.find((i) => i.title.intoSlug() == product);
</script>

<div class="p-[20px]">
	<BreadCrumb items={['Home', category, product]}></BreadCrumb>

	{#if item}
		<!-- <ItemCard title={item.title} description={item.description}></ItemCard> -->
		<div class="flex flex-wrap items-stretch justify-center gap-[50px]">
			<img src="/box.png" alt="Box" width="300" />
			<div class="grow rounded-md border border-solid border-[#C6C69F] bg-[#FCF4F4] p-[50px]">
				<div class="flex items-center justify-between">
					<div>
						<p>{item.title}</p>
						<p>{item.description}</p>
						<p>Minimum order amount</p>
						<p>Product material</p>
						<p>Delivery time</p>
					</div>
					<img src="/branding.png" alt="" class="max-h-[100px] w-[min(200px,15vw)]" />
				</div>
				<div class="mt-[20px] flex flex-wrap items-stretch justify-between gap-[10px]">
					{#each Array(3) as _, index}
						<button
							class="flex-1 basis-[150px] rounded-md border border-solid border-black p-2 font-Poppins"
						>
							Size Option {index + 1}</button
						>
					{/each}
					<button
						class="flex-1 basis-[150px] rounded-md bg-[#609966] px-[10px] font-Poppins text-[20px] font-[700] text-white"
						>Place Order</button
					>
				</div>
			</div>
		</div>
	{/if}
</div>

<style>
	p {
		font-family: Poppins;
		font-weight: 400;
		font-size: 20px;
	}
</style>
