<script lang="ts">
	import { products_el } from '@src/store';

	async function scroll() {
		$products_el.scrollIntoView({ behavior: 'smooth' });
	}
</script>

<div
	class="h-300px mt-[10px] flex flex-wrap-reverse items-center justify-between gap-y-[50px] bg-[#B2D99A] px-[5%] py-[50px]"
>
	<div class="mx-auto flex flex-col justify-center gap-[20px]">
		<p class="text-[30px]">Your Product Deserves <br />Leader Pack</p>
		<p class="text-[16px]">Your Product - Perfectly Packaged</p>
		<button on:click={scroll}>Get Started</button>
	</div>
	<img class="mx-auto w-1/3 min-w-[300px] max-w-[500px]" src="./bears.png" alt="" />
</div>

<style>
	p {
		font-family: Poppins;
		font-weight: 700;
		color: #005500;
	}
	button {
		font-family: Poppins;
		color: white;
		background-color: #005500bf;
		border-radius: 30px;
		font-size: 20px;
		font-weight: 700;
		padding: 5px 20px;
		width: 250px;
	}
</style>
