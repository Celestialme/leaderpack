<script lang="ts">
	import { page } from '$app/stores';
	import BlogCard from '@src/components/BlogCard.svelte';
	import Header from '@src/components/Header.svelte';
	import { goto } from '$app/navigation';
	import { language } from '@src/store.svelte';
	import locales from '@src/locales.svelte';
	let blogs = $derived($page.data.blogs);
</script>

<svelte:head>
	<title>{locales.blog()}</title>
	<meta property="og:title" content={locales.blog()} />
</svelte:head>
<Header></Header>

<div class="grid pt-2">
	{#if blogs.length}
		{#each blogs as blog}
			<BlogCard
				onclick={() => goto(`blog/${blog[`title_${language.value}`].intoSlug()}`)}
				{blog}
				class="cursor-pointer"
			/>
		{/each}
	{:else}
		<div class="flex flex-grow flex-col items-center justify-center">
			<h1 class="font-Poppins text-[50px] font-[700]">{locales.blog()}</h1>
			<p class="font-Poppins text-[20px] font-[400]">{locales.willBeAddedSoon()}</p>
		</div>
	{/if}
</div>

<style>
	.grid {
		gap: 30px;
		grid-template-columns: repeat(auto-fit, min(400px, 90vw));
		justify-content: center;
	}
</style>
