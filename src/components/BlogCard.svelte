<script lang="ts">
	import { page } from '$app/stores';

	export let blog;
	function parseHTML(html: string) {
		if (!globalThis.document) return '';
		let el = document.createElement('div');
		el.innerHTML = html;

		return el.innerText;
	}
</script>

<div
	on:click
	class="relative my-2 flex w-[700px] max-w-[90vw] flex-col items-center rounded-md border-2 border-solid border-gray-200 p-4 font-Poppins shadow-lg {$$props.class}"
>
	<p class="font-Poppins text-2xl text-[#005500]">
		{blog[`title_${$page.params.language}`]}
	</p>
	<div>
		{parseHTML(blog[`content_${$page.params.language}`]).slice(0, 200)}...
	</div>
</div>
