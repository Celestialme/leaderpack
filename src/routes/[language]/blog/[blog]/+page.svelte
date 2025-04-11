<script lang="ts">
	import { page } from '$app/stores';
	import Header from '@src/components/Header.svelte';
	import RichText from '../RichText.svelte';
	import { language } from '@src/store.svelte';
	import RelatedBlogs from '@src/components/RelatedBlogs.svelte';
	let blog = $derived($page.data.blog);
</script>

<svelte:head>
	<title>{blog[`title_${language.value}`]}</title>
	<meta property="og:title" content={blog[`title_${language.value}`]} />
	<meta name="description" content={blog[`description_${language.value}`]} />
</svelte:head>
<Header></Header>
<div class="flex flex-col">
	{#if blog}
		<div class="flex flex-col items-center p-5">
			<h1 class="my-5 font-Poppins text-[24px] font-[400]">{blog[`title_${language.value}`]}</h1>
			<div class="mb-[300px] max-w-[min(800px,100%)]">
				<RichText content={blog[`content_${language.value}`]}></RichText>
			</div>
			<RelatedBlogs {blog}></RelatedBlogs>
		</div>
	{:else}
		<div class="flex h-screen flex-grow flex-col items-center justify-center">
			<h1 class="font-Poppins text-[24px] font-[400]">Blog was not found</h1>
		</div>
	{/if}
</div>
