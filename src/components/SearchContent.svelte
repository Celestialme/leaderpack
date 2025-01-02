<script lang="ts">
	import { page } from '$app/stores';
	import type { Category } from '@src/types';
	import Search from './icons/Search.svelte';
	import locales from '@src/locales.svelte';
	import { language } from '@src/store.svelte';
	import { goto } from '$app/navigation';

	let {
		class: classes,
		onSelect
	}: {
		onSelect?: () => void;
		class?: string;
	} = $props();
	let value = $state('');
	let categories = $derived(
		$page.data.categories.filter(
			(c: Category) =>
				c.title_en.toLocaleLowerCase().includes(value.toLocaleLowerCase()) ||
				c.title_ka.toLocaleLowerCase().includes(value.toLocaleLowerCase())
		)
	);
	let products = $derived(
		$page.data.products.filter(
			(c: Category) =>
				c.title_en.toLocaleLowerCase().includes(value.toLocaleLowerCase()) ||
				c.title_ka.toLocaleLowerCase().includes(value.toLocaleLowerCase())
		)
	);
</script>

<div
	class="relative z-10 mx-auto flex h-[50px] flex-shrink items-center gap-[20px] rounded-[8px] border-[1px] border-[#DBDBDD] bg-[#ffffffb0] p-[10px] {classes}"
>
	<Search></Search>
	<input
		bind:value
		class=" w-[calc(100%-35px)] min-w-[100px] bg-[transparent] font-Poppins text-[24px] font-[400] outline-none"
		type="text"
		name=""
		id=""
		placeholder={locales.search()}
	/>
	{#if value}
		<div
			class="absolute left-0 top-full max-h-[350px] w-full overflow-auto rounded-b-md border border-solid border-[#DBDBDD] bg-white p-2"
		>
			{#if categories.length > 0}
				<p class="mb-2 select-none font-Poppins text-gray-600">{locales.categories()}</p>
				<div class="ml-4">
					{#each categories as category}
						<button
							onclick={() => {
								onSelect?.();
								goto(
									`/${language.value}/products/${category[`title_${language.value}`].intoSlug()}`
								);
								value = '';
							}}
							class="block w-full cursor-pointer rounded-md p-2 text-left font-Poppins hover:bg-[#DBDBDD]"
						>
							{category[`title_${language()}`]}
						</button>
					{/each}
				</div>
			{/if}
			{#if products.length > 0}
				<p class="mb-2 select-none font-Poppins text-gray-600">{locales.products()}</p>
				<div class="ml-4">
					{#each products as product}
						<button
							onclick={() => {
								onSelect?.();
								let category = $page.data.categories.find(
									(c: Category) => c.id == product.category_id
								);
								goto(
									`/${language.value}/products/${category[`title_${language.value}`]}/${product[`title_${language.value}`].intoSlug()}`
								);
								value = '';
							}}
							class="block w-full cursor-pointer rounded-md p-2 text-left font-Poppins hover:bg-[#DBDBDD]"
						>
							{product[`title_${language()}`]}
						</button>
					{/each}
				</div>
			{/if}
			{#if categories.length == 0 && products.length == 0}
				<p class="text-center font-Poppins text-gray-600">{locales.noResults()}</p>
			{/if}
		</div>
	{/if}
</div>

<style>
	.overflow-auto::-webkit-scrollbar-track {
		background-color: transparent;
	}

	.overflow-auto::-webkit-scrollbar {
		width: 10px;
	}
	.overflow-auto::-webkit-scrollbar-thumb {
		border-radius: 50px;
		background-color: #a1a1a1;
	}
</style>
