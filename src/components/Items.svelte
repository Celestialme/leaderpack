<script lang="ts">
	import { data } from '@src/store';
	import BreadCrumb from './BreadCrumb.svelte';
	import ItemCard from './ItemCard.svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	let items: { title: string; description: string }[] = [];
	let category = $page.params.category;

	$: items = $data.find((c) => c.title.intoSlug() == category)?.items || [];
</script>

<div class="p-[20px]">
	<BreadCrumb items={['Home', category]}></BreadCrumb>

	<div class="grid">
		{#each items as item}
			<ItemCard
				on:click={() => goto(`/products/${category.intoSlug()}/${item.title.intoSlug()}`)}
				title={item.title}
				description={item.description}
			></ItemCard>
		{/each}
	</div>
</div>

<style>
	.grid {
		grid-template-columns: repeat(auto-fit, minmax(min(500px, 90%), 1fr));

		justify-content: center;
		gap: 50px;
	}
	@media (min-width: 1500px) {
		.grid {
			padding: 0 15%;
			grid-template-columns: 1fr 1fr; /* 2 columns for screens wider than 400px */
		}
	}
</style>
