<script lang="ts">
	import { language, products_el } from '@src/store';
	import Arrrow from './icons/Arrrow.svelte';
	import { goto } from '$app/navigation';
	import locales from '@src/locales';

	async function scroll() {
		if (!$products_el) {
			await goto(`/${$language}`);
		}

		products_el.subscribe((d) => {
			if (d) {
				let top = d.getBoundingClientRect().top;
				window.scrollTo({ top: top - 200, behavior: 'smooth' });
			}
		});
	}
</script>

<button
	on:click={scroll}
	class="flex h-[50px] min-w-[200px] items-center justify-evenly rounded-[10px] bg-[#609966] py-[10px] font-Poppins text-[20px] font-[700] text-white"
	><p class="ml-3 mr-auto">{$locales.products()}</p>
	<Arrrow class="ml-auto mr-3" /></button
>
