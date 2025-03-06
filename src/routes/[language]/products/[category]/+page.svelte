<script lang="ts">
	import { page } from '$app/stores';
	import Contact from '@src/components/Contact.svelte';
	import Footer from '@src/components/Footer.svelte';
	import Header from '@src/components/Header.svelte';
	import Products from '@src/components/Products.svelte';
	import { getCategory } from '@src/utils';
	import { language } from '@src/store.svelte';
	console.log(getCategory());
</script>

<svelte:head>
	<meta name="description" content={getCategory()?.[`description_${language.value}`]} />
	<title>{getCategory()?.[`title_${language.value}`]}</title>
	<meta property="og:title" content={$page.params.category} />
	<meta property="og:image" content={new URL(getCategory()?.imageURL as string).href} />
</svelte:head>
<Header></Header>
<div class="flex flex-col gap-[50px]">
	<Products></Products>
	<Contact></Contact>
	<Footer></Footer>
</div>
