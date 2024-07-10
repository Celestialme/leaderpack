<script lang="ts">
	import { products_el } from '@src/store';
	import Arrrow from './icons/Arrrow.svelte';
	function scroll() {
		let pos = $products_el.getBoundingClientRect().top + window.scrollY - 150;
		window.scrollTo({ top: pos, behavior: 'smooth' });
	}
</script>

<button
	on:click={scroll}
	class="flex h-[50px] min-w-[195px] items-center justify-evenly gap-[20px] rounded-[10px] bg-[#609966] py-[10px] font-Poppins text-[24px] font-[700] text-white"
	>Products <Arrrow></Arrrow></button
>
