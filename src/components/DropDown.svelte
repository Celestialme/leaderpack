<script lang="ts">
	import { products_el } from '@src/store';
	import Arrrow from './icons/Arrrow.svelte';
	import { goto } from '$app/navigation';

	async function scroll() {
		if (!$products_el) {
			await goto('/');
		}
		let p: HTMLDivElement = await new Promise((resolve) => {
			products_el.subscribe((d) => {
				if (d) resolve(d);
			});
		});

		p.scrollIntoView({ behavior: 'smooth' });
	}
</script>

<button
	on:click={scroll}
	class="flex h-[50px] min-w-[180px] items-center justify-evenly gap-[20px] rounded-[10px] bg-[#609966] py-[10px] font-Poppins text-[20px] font-[700] text-white"
	>Products <Arrrow></Arrrow></button
>
