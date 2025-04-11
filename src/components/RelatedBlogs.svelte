<script lang="ts">
	import { createScroll } from '@src/utils';

	import locales from '@src/locales.svelte';
	import axios from 'axios';
	import BlogCard from './BlogCard.svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { language } from '@src/store.svelte';
	let { blog } = $props();

	let relatedBlogs = $derived(
		Promise.all(
			blog.relatedBlogs
				.split(',')
				.filter((id: string) => id)
				.map(async (id: string) => {
					let blog = await axios.get(`/api/blogs?blog=${id}`).then((res) => res.data);
					return blog;
				})
		)
	);
</script>

{#await relatedBlogs then relatedBlogs}
	{#if relatedBlogs.length > 0}
		<div class="w-full max-w-[2000px] p-[20px]">
			<p class="mx-auto my-4 font-Poppins text-[20px] font-[700]">{locales.relatedBlogs()}</p>
			<div class="my-4 flex gap-[50px] overflow-auto" use:createScroll>
				{#each relatedBlogs.filter((b) => b) as blog}
					<div class="max-w-1/2">
						<BlogCard
							{blog}
							onclick={async () => {
								goto(
									`/${$page.params.language}/blog/${blog[`title_${language.value}`].intoSlug()}`
								);
							}}
							class="h-full"
						></BlogCard>
					</div>
				{/each}
			</div>
		</div>
	{/if}
{/await}

<style>
	.overflow-auto::-webkit-scrollbar {
		width: 0;
	}
	.overflow-auto {
		scrollbar-width: none;
	}
</style>
