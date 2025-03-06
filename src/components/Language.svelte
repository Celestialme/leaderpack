<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	import { getCategory, getProduct, replaceParams } from '@src/utils';

	export let navigate = true;
	export let language = 'ka';
	function updateURL() {
		language = language === 'en' ? 'ka' : 'en';
		let category = getCategory() as any;
		let product = getProduct() as any;
		let newUrl = replaceParams(page, {
			language,
			product: product?.[`title_${language}`]?.intoSlug() || '',
			category: category?.[`title_${language}`]?.intoSlug() || ''
		});
		navigate && goto(newUrl, { noScroll: true, replaceState: true });
	}
</script>

<button
	class="flex items-center gap-5 rounded-3xl border border-[#ccc] bg-[#dedede] px-[10px] py-[5px] font-semibold {$$props.class}"
	on:click={updateURL}
>
	<p class="z-10">EN</p>

	<p class="z-10">KA</p>
	<div
		class="absolute left-0 h-full w-1/2 rounded-3xl bg-white transition-all"
		class:translate-x-full={language === 'ka'}
	></div>
</button>
