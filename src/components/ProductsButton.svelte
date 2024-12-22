<script lang="ts">
	import { header_el, products_el } from '@src/store.svelte';
	import { language } from '@src/store.svelte';
	import Arrrow from './icons/Arrrow.svelte';
	import { goto } from '$app/navigation';
	import locales from '@src/locales.svelte';

	async function scroll() {
		if (!products_el.value) {
			await goto(`/${language.value}`);
		}

		let unsub = products_el.subscribe((d) => {
			if (d) {
				d.style.scrollMarginTop = header_el().offsetHeight + 'px';
				d.scrollIntoView({ behavior: 'smooth' });
				unsub();
			}
		});
	}
</script>

<button
	onclick={scroll}
	class="flex md:gap-3 h-[50px] min-w-[160px] items-center justify-evenly rounded-[10px] bg-[#609966] py-[10px] font-Poppins text-[20px] font-[700] text-white"
	><p class="ml-1 md:ml-3 mr-auto">{locales.products()}</p>
	<Arrrow class="ml-auto mr-1 md:mr-3" /></button
>
