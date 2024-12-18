<script lang="ts">
	import { page } from '$app/stores';
	import Contact from '@src/components/Contact.svelte';
	import Footer from '@src/components/Footer.svelte';
	import Header from '@src/components/Header.svelte';
	import Product from '@src/components/Product.svelte';
	import RelatedProducts from '@src/components/RelatedProducts.svelte';
</script>

<div class="flex h-screen flex-col">
	<Header></Header>
	<Product></Product>
	<RelatedProducts></RelatedProducts>
	<Contact altStyle></Contact>
	<Footer></Footer>
</div>
