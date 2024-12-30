<script lang="ts">
	import { page } from '$app/stores';
	import Contact from '@src/components/Contact.svelte';
	import Footer from '@src/components/Footer.svelte';
	import Header from '@src/components/Header.svelte';
	import Product from '@src/components/Product.svelte';
	import RelatedProducts from '@src/components/RelatedProducts.svelte';
	import { getProduct, getProductThumbnail } from '@src/utils';
</script>

<svelte:head>
	<meta property="og:title" content={$page.params.product} />
	<meta property="og:image" content={new URL(getProductThumbnail(getProduct()) as string).href} />
</svelte:head>
<div class="flex h-screen flex-col items-center">
	<Header></Header>
	<Product></Product>
	<RelatedProducts></RelatedProducts>
	<Contact altStyle></Contact>
	<Footer></Footer>
</div>
