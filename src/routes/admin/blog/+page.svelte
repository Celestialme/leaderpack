<script lang="ts">
	import { run } from 'svelte/legacy';

	import axios from 'axios';

	import AddButton from '@src/components/icons/AddButton.svelte';
	import EditBlog from './components/EditBlog.svelte';
	import Delete from '@src/components/icons/Delete.svelte';
	import BlogCard from '@src/components/BlogCard.svelte';
	import { untrack } from 'svelte';

	let blogs: any[] = $state([]);
	async function refresh() {
		axios.get(`/api/blogs`).then((res) => (blogs = res.data));
	}

	let showEditor = $state(false);
	let editData: any = $state(undefined);
	$effect(() => {
		untrack(() => refresh());
		showEditor;
	});
</script>

{#if showEditor}
	<EditBlog bind:show={showEditor} value={editData}></EditBlog>
{:else}
	<div class="flex h-screen cursor-pointer flex-col items-center">
		<AddButton
			on:click={() => {
				editData = undefined;
				showEditor = true;
			}}
			class="mx-2 ml-auto mt-2 cursor-pointer active:scale-90"
		/>
		{#if blogs.length}
			{#each blogs as blog}
				<div
					class="relative"
					onclick={() => {
						editData = {
							id: blog.id,
							header: { en: blog.title_en, ka: blog.title_ka },
							content: { en: blog.content_en, ka: blog.content_ka }
						};
						showEditor = true;
					}}
				>
					<Delete
						on:click={(e) => {
							e.stopPropagation();
							axios.delete(`/api/blogs?id=${blog.id}`).then(() => refresh());
						}}
						class="absolute right-2 top-4 z-30 cursor-pointer"
					></Delete>
					<BlogCard {blog} />
				</div>
			{/each}
		{:else}
			<h1 class="my-auto font-Poppins text-[50px] font-[700]">No Blogs</h1>
		{/if}
	</div>
{/if}
