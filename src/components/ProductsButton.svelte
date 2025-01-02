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
	class="flex h-[50px] min-w-[180px] items-center justify-between gap-2 rounded-[10px] bg-[#609966] px-2 py-[10px] font-Poppins text-[20px] font-[700] text-white md:gap-3"
	><p>{locales.products()}</p>
	<Arrrow /></button
>
