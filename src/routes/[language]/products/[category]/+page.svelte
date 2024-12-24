<script lang="ts">
	import { page } from '$app/stores';
	import Contact from '@src/components/Contact.svelte';
	import Footer from '@src/components/Footer.svelte';
	import Header from '@src/components/Header.svelte';
	import Products from '@src/components/Products.svelte';
</script>

<svelte:head>
	<meta property="og:title" content={$page.params.category} />
	<meta
		property="og:image"
		content={$page.data.categories.find(
			(c: any) =>
				c.title_en.intoSlug() == $page.params.category.intoSlug() ||
				c.title_ka.intoSlug() == $page.params.category.intoSlug()
		).imageURL}
	/>
</svelte:head>
<div class="flex h-screen flex-col">
	<Header></Header>
	<Products></Products>
	<Contact></Contact>
	<Footer></Footer>
</div>
