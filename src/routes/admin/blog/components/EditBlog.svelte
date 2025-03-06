<script lang="ts">
	import axios from 'axios';
	import RichText from './RichText/RichText.svelte';
	import { obj2formData, storage_data } from './RichText/utils';
	import CloseIcon from '@src/components/icons/CloseIcon.svelte';
	import Language from '@src/components/Language.svelte';
	import { language, notification } from '@src/store.svelte';
	import FilePicker from '../../components/FilePicker.svelte';
	import RelatedBlogs from '../../components/RelatedBlogs.svelte';
	import type { Blog } from '@src/types';
	interface Props {
		show?: boolean;
		value?: {
			header: { en: string; ka: string };
			content: { en: string; ka: string };
			description: { en: string; ka: string };
			id: string;
			thumbnail: string;
			relatedBlogs: { array: Blog[]; string: string };
		};
	}

	let { show = $bindable(false), value = undefined }: Props = $props();
	let getData = $state() as () => Promise<{ images: { [key: string]: any }; data: any }>;
	let data = value || {
		header: { en: '', ka: '' },
		content: { en: '', ka: '' },
		description: { en: '', ka: '' },
		id: '',
		thumbnail: '',
		relatedBlogs: { array: [], string: '' }
	};
	let thumbnail: File | string = $state(data?.thumbnail || '');
	let showRelatedBlogs = $state(false);
	async function save() {
		//means its being edited
		if (notification.value.message) return;
		if (value) {
			await axios.patch(
				'/api/blogs',
				obj2formData({
					...(await getData()),
					id: data.id,
					storage_data,
					thumbnail,
					relatedBlogs: data.relatedBlogs.array.map((product) => product.id).join(',')
				})
			);
		} else {
			await axios.put('/api/blogs', obj2formData({ ...(await getData()), thumbnail }));
		}
		show = false;
	}
	function onFileChange(file: File) {
		thumbnail = file;
	}
</script>

<div class="relative flex h-screen flex-col items-center bg-white p-[30px] pt-[70px]">
	<div class="absolute left-0 top-0 z-50 flex w-full justify-between bg-white px-[30px] pt-2">
		<Language bind:language={language.value} navigate={false} class="relative "></Language>
		<FilePicker onchange={onFileChange} isSelected={!!thumbnail} class="max-w-max" />
		<CloseIcon onclick={() => (show = false)} class=" cursor-pointer" />
	</div>
	<RichText
		bind:getData
		value={{ content: data.content, header: data.header, description: data.description }}
	/>
	<button
		onclick={() => {
			showRelatedBlogs = true;
		}}
		class="mx-auto mb-2 mt-auto min-h-[40px] w-[300px] rounded-md bg-[#609966] text-white"
		>Related Blogs</button
	>
	<button
		onclick={save}
		class="mx-auto mt-auto min-h-[40px] w-[100px] rounded-md bg-[#609966] text-white">Save</button
	>
</div>

<RelatedBlogs bind:show={showRelatedBlogs} self={data} bind:relatedBlogs={data.relatedBlogs} />
