<script lang="ts">
	import { contact_el, language } from '@src/store';
	import { page } from '$app/stores';
	import ProductsButton from './ProductsButton.svelte';
	import Logo from './icons/Logo.svelte';
	import Search from './Search.svelte';
	import Menu from './Menu.svelte';
	import Hamburger from './Hamburger.svelte';
	import Language from './Language.svelte';
	import locales from '@src/locales';
	import { goto } from '$app/navigation';

	async function scroll() {
		if (!$contact_el) {
			await goto(`/${$page.params.language}`, { noScroll: true });
		}

		contact_el.subscribe(async (el) => {
			if (el) {
				setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 100);
			}
		});
	}
	let showMenu = false;
</script>

<div
	class="sticky top-0 z-20 flex w-full items-center gap-[35px] bg-[#F0F0F0] px-[10px] max-md:justify-between"
>
	<Language class="absolute right-4 top-2" bind:language={$language}></Language>
	<Logo></Logo>
	<ProductsButton></ProductsButton>
	<Search class="w-[25vw] max-md:hidden"></Search>
	<button
		on:click={() => goto(`/${$page.params.language}/about`)}
		class="min-w-[100px] max-md:hidden">{$locales.about()}</button
	>
	<button on:click={() => goto(`/${$page.params.language}/blog`)} class="max-md:hidden"
		>{$locales.blog()}</button
	>
	<button on:click={scroll} class="min-w-[100px] max-md:hidden">{$locales.contact()}</button>
	<Hamburger class="cursor-pointer md:hidden" on:click={() => (showMenu = !showMenu)} />
</div>
<Menu bind:show={showMenu}></Menu>

<style>
	button {
		font-family: Poppins;
		font-weight: 600;
		color: #757575;
		font-size: min(calc(0.8vw + 8px), 25px);
	}
</style>
