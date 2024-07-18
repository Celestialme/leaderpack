<script lang="ts">
	import { contact_el } from '@src/store';
	import DropDown from './DropDown.svelte';
	import Logo from './icons/Logo.svelte';
	import Search from './Search.svelte';
	import Menu from './Menu.svelte';
	import Hamburger from './Hamburger.svelte';
	function scroll() {
		$contact_el.scrollIntoView({ behavior: 'smooth' });
	}
	let showMenu = false;
</script>

<div
	class="sticky top-0 z-10 flex items-center gap-[35px] bg-[#F0F0F0] px-[10px] max-md:justify-between"
>
	<Logo></Logo>
	<DropDown></DropDown>
	<Search class="w-[25vw] max-md:hidden"></Search>
	<button class="max-md:hidden">About Us</button>
	<button class="max-md:hidden">Blog</button>
	<button on:click={scroll} class="max-md:hidden">Contact Us</button>
	<Hamburger class="cursor-pointer md:hidden" on:click={() => (showMenu = !showMenu)} />
</div>
<Menu bind:show={showMenu}></Menu>

<style>
	button {
		font-family: Poppins;
		font-weight: 400;
		font-size: min(calc(1vw + 8px), 25px);
	}
</style>
