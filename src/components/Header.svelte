<script lang="ts">
	import { contact_el, header_el } from '@src/store.svelte';
	import { language } from '@src/store.svelte';

	import { page } from '$app/stores';
	import ProductsButton from './ProductsButton.svelte';
	import Logo from './icons/Logo.svelte';
	import Menu from './Menu.svelte';
	import Hamburger from './Hamburger.svelte';
	import Language from './Language.svelte';
	import locales from '@src/locales.svelte';
	import { goto } from '$app/navigation';
	import BreadCrumb from './BreadCrumb.svelte';
	import SearchContent from './SearchContent.svelte';

	async function scroll() {
		if (!contact_el.value) {
			await goto(`/${$page.params.language}`);
		}

		let unsub = contact_el.subscribe(async (el) => {
			if (el) {
				setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 100);
				unsub();
			}
		});
	}
	let showMenu = $state(false);
	let category = $derived($page.params.category);
	let product = $derived($page.params.product);
</script>

<div class="sticky top-0 z-20 w-full bg-[#F0F0F0]">
	<div
		bind:this={header_el.value}
		class="mx-auto flex min-h-[110px] w-full max-w-[2000px] items-center gap-[20px] px-[10px] max-md:justify-between"
	>
		<Language class="absolute right-2 top-2 max-md:hidden" bind:language={language.value}
		></Language>
		<Logo class="cursor-pointer" href={`/${$page.params.language}`}></Logo>
		<ProductsButton></ProductsButton>
		<SearchContent class="w-[25vw] max-md:hidden"></SearchContent>
		<a href={`/${$page.params.language}/about`} class="whitespace-nowrap max-md:hidden"
			>{locales.about()}</a
		>
		<a href={`/${$page.params.language}/blog`} class="max-md:hidden">{locales.blog()}</a>
		<button onclick={scroll} class="min-w-[100px] max-md:hidden">{locales.contact()}</button>
		<Hamburger
			class="min-w-[30px] cursor-pointer md:hidden"
			onclick={() => (showMenu = !showMenu)}
		/>
	</div>
	{#if category || product}
		<BreadCrumb
			items={[
				{ label: locales.home(), url: `/${$page.params.language}` },
				{ label: category, url: `/${$page.params.language}/products/${category}` },
				{ label: product, url: `/${$page.params.language}/products/${category}/${product}` }
			]}
		></BreadCrumb>
	{/if}
</div>
<Menu bind:show={showMenu}></Menu>

<style>
	button,
	a {
		font-family: Poppins;
		font-weight: 600;
		color: #414141;
		font-size: min(calc(0.8vw + 8px), 25px);
	}
</style>
