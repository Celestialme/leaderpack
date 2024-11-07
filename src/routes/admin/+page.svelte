<script lang="ts">
	import AddButton from '@src/components/icons/AddButton.svelte';
	import axios from 'axios';
	import CreateCategory from './components/CreateCategory.svelte';
	import CategoryCard from '@src/components/CategoryCard.svelte';
	import { goto } from '$app/navigation';
	import Edit from '@src/components/icons/Edit.svelte';
	import Delete from '@src/components/icons/Delete.svelte';
	import type { Category, CategoryData } from '@src/types';
	import Logout from './components/Logout.svelte';

	let categories: any[] = [];
	function refresh() {
		axios.get('/api/categories').then((res) => {
			categories = res.data;
		});
	}
	refresh();
	let data: CategoryData | undefined;
	let showDialog = false;
	let mode: 'create' | 'edit' = 'create';
	function editCategory(category: Category) {
		data = {
			image: category.imageURL,
			id: category.id,
			en: {
				title: category.title_en
			},
			ka: {
				title: category.title_ka
			}
		};
		mode = 'edit';
		showDialog = true;
	}
</script>

<div class="flex flex-col">
	<div class="flex items-center justify-between px-2">
		<Logout />
		<button
			class="mx-auto rounded-md bg-green-600 px-4 py-2 font-Poppins text-white active:scale-90"
			onclick={() => goto('/admin/blog')}>Blog</button
		>
		<button
			onclick={() => {
				data = undefined;
				mode = 'create';
				showDialog = !showDialog;
			}}
			class=" p-2"><AddButton /></button
		>
	</div>
	<div class="flex flex-wrap items-stretch justify-center gap-[50px] p-[50px]">
		{#each categories as category}
			<div class="relative">
				<div class=" mb-2 flex items-center justify-center">
					<button onclick={() => editCategory(category)}><Edit /></button>
					<button
						onclick={() => axios.delete(`/api/categories?id=${category.id}`).then(() => refresh())}
						><Delete /></button
					>
				</div>
				<CategoryCard
					src={category.imageURL}
					title={category.title_en}
					onclick={() => goto(`/admin/products?category_id=${category.id}`)}
				></CategoryCard>
			</div>
		{/each}
	</div>
</div>
{#if showDialog}
	<CreateCategory bind:show={showDialog} {data} {mode} onrefresh={refresh} />
{/if}
