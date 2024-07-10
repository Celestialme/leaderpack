<script lang="ts">
	import { contact_el } from '@src/store';
	import DropDown from './DropDown.svelte';
	import Logo from './icons/Logo.svelte';
	import Search from './Search.svelte';
	function scroll() {
		let pos = $contact_el.getBoundingClientRect().top + window.scrollY - 150;
		window.scrollTo({ top: pos, behavior: 'smooth' });
	}
</script>

<div class="sticky top-0 flex items-center gap-[35px] bg-[#F0F0F0] px-[10px]">
	<Logo></Logo>
	<DropDown></DropDown>
	<Search></Search>
	<button>About Us</button>
	<button>Blog</button>
	<button on:click={scroll}>Contact Us</button>
</div>

<style>
	button,
	a {
		font-family: Poppins;
		font-weight: 400;
		font-size: calc(0.4vw + 16px);
	}
</style>
