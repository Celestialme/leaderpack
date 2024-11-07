<script lang="ts">
	import { page } from '$app/stores';
	import Header from '@src/components/Header.svelte';
	import locales from '@src/locales';
</script>

<div class="flex h-screen w-full flex-col">
	<Header></Header>
	<div
		class="mx-auto my-auto flex max-h-[80%] w-[1000px] max-w-[90%] flex-grow flex-col items-center rounded-lg p-4 shadow"
	>
		<h1 class="mb-[100px] font-Poppins text-[22px] font-[700]">Leader Pack</h1>
		<p class="text-justify font-Poppins text-[20px] font-[400]">
			{locales.about_content[$page.params.language as 'en' | 'ka']}
		</p>
	</div>
</div>
