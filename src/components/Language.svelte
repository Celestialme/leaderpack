<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { replaceParams } from '@src/utils';

	export let navigate = true;
	export let language = 'en';
	function updateURL() {
		let newUrl = replaceParams(page, {
			language
		});

		navigate && goto(newUrl, { noScroll: true, replaceState: true });
	}
</script>

<div class=" flex items-center {$$props.class}">
	<button
		class:text-gray-400={language != 'en'}
		onclick={() => {
			language = 'en';
			updateURL();
		}}
	>
		<p class="font-Poppins">EN</p>
	</button>
	<p class="px-2">|</p>
	<button
		class:text-gray-400={language != 'ka'}
		onclick={() => {
			language = 'ka';
			updateURL();
		}}
	>
		<p class="font-Poppins">KA</p>
	</button>
</div>
