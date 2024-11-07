<script lang="ts">
	import locales from '@src/locales.svelte';
	import { products_el } from '@src/store';

	async function scroll() {
		let top = $products_el.getBoundingClientRect().top;
		window.scrollTo({ top: top - 200, behavior: 'smooth' });
	}
</script>

<div
	class="banner mt-[10px] flex h-[400px] flex-wrap-reverse items-center justify-between gap-y-[50px] bg-[#B2D99A] px-[5%] py-[50px]"
>
	<div class="mr-auto flex flex-col justify-center gap-[20px]">
		<p class="text-[30px]">{@html locales.deserve()}</p>
		<p class="text-[16px]">{locales.perfect()}</p>
		<button onclick={scroll}>{locales.getStarted()}</button>
	</div>
</div>

<style>
	.banner {
		background: url('/banner.jpg');
		background-position: 75%;
	}
	p {
		font-family: Poppins;
		font-weight: 700;
		color: #ceffce;
	}
	button {
		font-family: Poppins;
		color: white;
		background-color: #403f43;
		border-radius: 30px;
		font-size: 20px;
		font-weight: 700;
		padding: 5px 20px;
		width: 250px;
	}
	button:hover {
		background-color: #605f63;
	}
</style>
