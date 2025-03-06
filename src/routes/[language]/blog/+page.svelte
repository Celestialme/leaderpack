<script lang="ts">
	import { page } from '$app/stores';
	import BlogCard from '@src/components/BlogCard.svelte';
	import Header from '@src/components/Header.svelte';
	import RichText from './RichText.svelte';
	import { goto } from '$app/navigation';
	import { language } from '@src/store.svelte';
	import locales from '@src/locales.svelte';
	import RelatedBlogs from '@src/components/RelatedBlogs.svelte';
	let blogs = $derived($page.data.blogs);
	let blog = $derived($page.url.searchParams.get('blog'));
	$inspect(blog);
</script>

<svelte:head>
	<title>{blog ? blogs[`title_${language.value}`] : locales.blog()}</title>
	<meta property="og:title" content={blog ? blogs[`title_${language.value}`] : locales.blog()} />
	<meta name="description" content={blog ? blogs[`description_${language.value}`] : ''} />
</svelte:head>
<Header></Header>
<div class="flex flex-col">
	{#if blog}
		{#if blogs}
			<div class="flex flex-col items-center p-5">
				<h1 class="my-5 font-Poppins text-[24px] font-[400]">{blogs[`title_${language.value}`]}</h1>
				<div class="mb-[300px] max-w-[800px]">
					<RichText content={blogs[`content_${language.value}`]}></RichText>
				</div>
				<RelatedBlogs blog={blogs}></RelatedBlogs>
			</div>
		{:else}
			<div class="flex h-screen flex-grow flex-col items-center justify-center">
				<h1 class="font-Poppins text-[24px] font-[400]">Blog was not found</h1>
			</div>
		{/if}
	{:else}
		<div class="grid pt-2">
			{#if blogs.length}
				{#each blogs as blog}
					<BlogCard
						onclick={() => goto(`blog?blog=${blog[`title_${language.value}`].intoSlug()}`)}
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
	{/if}
</div>

<style>
	.grid {
		gap: 30px;
		grid-template-columns: repeat(auto-fit, min(400px, calc(100% - 80px)));
		justify-content: center;
	}
</style>
