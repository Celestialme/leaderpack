<script lang="ts">
	import { page } from '$app/stores';
	import BlogCard from '@src/components/BlogCard.svelte';
	import Header from '@src/components/Header.svelte';
	import RichText from './RichText.svelte';
	import { goto } from '$app/navigation';
	import { language } from '@src/store';
	let blogs = $derived($page.data.blogs);
	let blog = $derived($page.url.searchParams.get('blog'));
</script>

<div class="flex h-screen flex-col">
	<Header></Header>

	{#if blog}
		{#if blogs}
			<div class="flex flex-col items-center p-5">
				<h1 class="my-5 font-Poppins text-[24px] font-[400]">{blogs[`title_${$language}`]}</h1>
				<div class="w-full">
					<RichText content={blogs[`content_${$language}`]}></RichText>
				</div>
			</div>
		{:else}
			<div class="flex h-screen flex-grow flex-col items-center justify-center">
				<h1 class="font-Poppins text-[24px] font-[400]">Blog was not found</h1>
			</div>
		{/if}
	{:else}
		<div class="flex flex-grow flex-col items-center pt-2">
			{#if blogs.length}
				{#each blogs as blog}
					<BlogCard
						on:click={() => goto(`blog?blog=${blog[`title_${$language}`].intoSlug()}`)}
						{blog}
						class="cursor-pointer"
					/>
				{/each}
			{:else}
				<div class="flex flex-grow flex-col items-center justify-center">
					<h1 class="font-Poppins text-[50px] font-[700]">Blog</h1>
					<p class="font-Poppins text-[20px] font-[400]">Content will be added soon</p>
				</div>
			{/if}
		</div>
	{/if}
</div>
