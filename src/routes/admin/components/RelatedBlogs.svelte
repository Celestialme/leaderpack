<script lang="ts">
	import BlogCard from '@src/components/BlogCard.svelte';
	import CloseIcon from '@src/components/icons/CloseIcon.svelte';
	import Delete from '@src/components/icons/Delete.svelte';
	import Search from '@src/components/Search.svelte';
	import type { Blog } from '@src/types';
	import { obj2formData } from '@src/utils';
	import axios from 'axios';
	import { onMount } from 'svelte';
	interface Props {
		show?: boolean;
		relatedBlogs?: { array: Blog[]; string: string };
		self: any;
	}

	let {
		show = $bindable(false),
		relatedBlogs = $bindable({ array: [], string: '' }),
		self
	}: Props = $props();
	let search = $state('');
	let blogs: Blog[] = $state([]);
	let filteredBlogs: Blog[] = $state([]);

	if (relatedBlogs.string) {
		let relatedBlogIDS = relatedBlogs.string.split(',');

		axios.post('/api/blogs/relatedBlogs', obj2formData({ ids: relatedBlogIDS })).then((res) => {
			relatedBlogs.array = [];
			for (let id of relatedBlogIDS) {
				let blog = res.data.find((p: Blog) => p.id == id);

				blog && relatedBlogs.array.push(blog);
			}
		});
	}
	onMount(() => {
		axios.get('/api/blogs').then((res) => {
			blogs = res.data;
		});
	});
	$effect(() => {
		filteredBlogs =
			search === ''
				? []
				: blogs.filter(
						(blog) =>
							blog?.id != self?.id &&
							(blog.title_en.includes(search) || blog.title_ka.includes(search))
					);
	});
</script>

{#if show}
	<div
		class="fixed left-1/2 top-1/2 z-20 flex h-[90%] w-[90%] -translate-x-1/2 -translate-y-1/2 flex-col bg-white px-4 py-2"
	>
		<div class="mb-4 flex items-center justify-between">
			<p class="mx-auto font-Poppins text-[20px] font-[700]">RELATED PRODUCTS</p>
			<CloseIcon class="" onclick={() => (show = false)} />
		</div>
		<Search bind:value={search} class="mb-2 w-full"></Search>
		<div class="flex flex-wrap justify-center gap-5 overflow-auto">
			{#each filteredBlogs as blog}
				<BlogCard
					{blog}
					onclick={() => {
						relatedBlogs.array.push(blog);
						relatedBlogs = relatedBlogs;
						search = '';
					}}
				></BlogCard>
			{/each}
		</div>
		<div
			class=" overflow-auto"
			class:hidden={filteredBlogs.length > 0 || relatedBlogs.array.length === 0}
		>
			<p class="py-2 font-Poppins text-[20px] font-[700]">Saved Related Products</p>
			<div class="flex flex-wrap justify-center gap-5">
				{#each relatedBlogs.array as blog}
					<div class="relative">
						<Delete
							onclick={() => {
								relatedBlogs.array = relatedBlogs.array.filter((p) => p !== blog);
								relatedBlogs = relatedBlogs;
							}}
							class="absolute right-2 top-2 cursor-pointer"
						/>
						<BlogCard {blog}></BlogCard>
					</div>
				{/each}
			</div>
		</div>
	</div>
{/if}
