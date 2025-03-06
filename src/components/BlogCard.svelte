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
	class="relative my-2 flex w-[400px] max-w-[90vw] cursor-pointer flex-col items-center rounded-md border-2 border-solid border-gray-200 p-6 font-Poppins shadow-lg {_class}"
>
	<img src={blog?.thumbnail} alt="thumbnail" class="max-h-[180px] min-h-[180px] w-full" />
	<p class="mb-2 mt-4 text-center font-Poppins text-2xl text-[#005500]">
		{blog?.[`title_${language.value}`]}
	</p>
	<p class="text-gray-600">
		{parseHTML(blog?.[`content_${language.value}`])?.slice(0, 100)}...
	</p>
</div>
