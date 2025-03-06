<script lang="ts">
	import { page } from '$app/stores';
	import Contact from '@src/components/Contact.svelte';
	import Footer from '@src/components/Footer.svelte';
	import Header from '@src/components/Header.svelte';
	import Product from '@src/components/Product.svelte';
	import RelatedProducts from '@src/components/RelatedProducts.svelte';
	import { getProduct, getProductThumbnail } from '@src/utils';
	import { language } from '@src/store.svelte';
	let product = $derived(getProduct($page.params));
	$inspect(product);
</script>

<svelte:head>
	<title>{product[`title_${language.value}`]}</title>
	<meta property="og:title" content={product[`title_${language.value}`]} />
	<meta name="description" content={product[`description_${language.value}`]} />
	<meta property="og:image" content={new URL(getProductThumbnail(product) as string).href} />
</svelte:head>
<Header></Header>
<div class="flex flex-col items-center gap-[50px]">
	<Product></Product>
	<RelatedProducts></RelatedProducts>
	<Contact altStyle></Contact>
	<Footer></Footer>
</div>
