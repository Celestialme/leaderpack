<script lang="ts">
	import axios from 'axios';
	import RichText from './RichText/RichText.svelte';
	import { obj2formData, storage_data } from './RichText/utils';
	import CloseIcon from '@src/components/icons/CloseIcon.svelte';
	import Language from '@src/components/Language.svelte';
	import { inputError, language } from '@src/store';
	export let show = false;
	export let value:
		| { header: { en: string; ka: string }; content: { en: string; ka: string }; id: string }
		| undefined = undefined;
	let getData: () => Promise<{ images: { [key: string]: any }; data: any }>;
	async function save() {
		//means its being edited
		if ($inputError.message) return;
		if (value) {
			await axios.patch('/api/blogs', obj2formData({ ...(await getData()), storage_data }));
		} else {
			await axios.put('/api/blogs', obj2formData(await getData()));
		}
		show = false;
	}
</script>

<div class="relative flex h-screen flex-col items-center p-[30px] pt-[70px]">
	<Language bind:language={$language} navigate={false} class="absolute left-2 top-2"></Language>

	<CloseIcon on:click={() => (show = false)} class="absolute right-2 top-2 cursor-pointer" />
	<RichText bind:getData {value} />
	<button
		on:click={save}
		class="mx-auto mt-auto min-h-[40px] w-[100px] rounded-md bg-[#609966] text-white">Save</button
	>
</div>
