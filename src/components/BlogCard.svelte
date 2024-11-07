<script lang="ts">
	import { language } from '@src/store.svelte';

	let {
		blog,
		class: _class,

		...props
	}: {
		blog: any;
		onclick?: () => void;
		class?: string;
	} = $props();
	function parseHTML(html: string) {
		if (!globalThis.document) return '';
		let el = document.createElement('div');
		el.innerHTML = html;

		return el.innerText;
	}
</script>

<div
	{...props}
	class="relative my-2 flex w-[700px] max-w-[90vw] flex-col items-center rounded-md border-2 border-solid border-gray-200 p-4 font-Poppins shadow-lg {_class}"
>
	<p class="font-Poppins text-2xl text-[#005500]">
		{blog[`title_${language.value}`]}
	</p>
	<div>
		{parseHTML(blog[`content_${language.value}`]).slice(0, 200)}...
	</div>
</div>
