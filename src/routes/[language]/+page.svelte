<script lang="ts">
	import Contact from '@src/components/Contact.svelte';
	import Categories from '@src/components/Categories.svelte';
	import Customers from '@src/components/Customers.svelte';
	import Footer from '@src/components/Footer.svelte';
	import GetStarted from '@src/components/GetStarted.svelte';
	import Header from '@src/components/Header.svelte';
	import Features from '@src/components/Features.svelte';
	import Faq from '@src/components/FAQ.svelte';
</script>

<div class="flex h-screen flex-col items-center">
	<Header></Header>
	<div class="flex max-w-[2000px] flex-col gap-[50px]">
		<GetStarted></GetStarted>
		<Categories></Categories>
		<Features></Features>
		<Customers></Customers>
		<Faq></Faq>
		<Contact></Contact>
	</div>
	<Footer></Footer>
</div>
