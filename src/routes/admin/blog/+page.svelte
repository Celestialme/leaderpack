<script lang="ts">
	import axios from 'axios';

	import AddButton from '@src/components/icons/AddButton.svelte';
	import EditBlog from './components/EditBlog.svelte';
	import Delete from '@src/components/icons/Delete.svelte';
	import BlogCard from '@src/components/BlogCard.svelte';
	import { language, track } from '@src/store.svelte';
	import Language from '@src/components/Language.svelte';

	let blogs: any[] = $state([]);
	async function refresh() {
		axios.get(`/api/blogs`).then((res) => (blogs = res.data));
	}

	let showEditor = $state(false);
	let editData: any = $state(undefined);
	track(refresh, () => showEditor);
	async function deleteBlog(blog: any) {
		if (confirm('Are you sure you want to delete this blog? this cannot be undone')) {
			await axios.delete(`/api/blogs?id=${blog.id}`);
			refresh();
		}
	}
</script>

<Language class="absolute left-2 top-2" bind:language={language.value}></Language>
{#if showEditor}
	<EditBlog bind:show={showEditor} value={editData}></EditBlog>
{:else}
	<AddButton
		onclick={() => {
			editData = undefined;
			showEditor = true;
		}}
		class="mx-2 ml-auto mt-2 cursor-pointer active:scale-90"
	/>
	<div class="h-[calc(100vh - 100px)] mt-[100px] grid cursor-pointer justify-center gap-2">
		{#if blogs.length}
			{#each blogs as blog}
				<div
					class="relative"
					onclick={() => {
						editData = {
							id: blog.id,
							header: { en: blog.title_en, ka: blog.title_ka },
							content: { en: blog.content_en, ka: blog.content_ka },
							description: { en: blog.description_en, ka: blog.description_ka },
							relatedBlogs: { array: [], string: blog.relatedBlogs },
							thumbnail: blog.thumbnail
						};
						showEditor = true;
					}}
				>
					<Delete
						onclick={(e) => {
							e.stopPropagation();
							deleteBlog(blog);
						}}
						class="absolute right-1 top-2 z-30 cursor-pointer"
					></Delete>
					<BlogCard {blog} class="h-full" />
				</div>
			{/each}
		{:else}
			<h1 class="my-auto font-Poppins text-[50px] font-[700]">No Blogs</h1>
		{/if}
	</div>
{/if}

<style>
	.grid {
		gap: 30px;
		grid-template-columns: repeat(auto-fit, min(400px, 90vw));
		justify-content: center;
		text-align: center;
	}
</style>
