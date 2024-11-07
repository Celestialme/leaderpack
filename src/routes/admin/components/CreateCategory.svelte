<script lang="ts">
	import { run } from 'svelte/legacy';

	import FloatingInput from '@src/components/FloatingInput.svelte';
	import Language from '@src/components/Language.svelte';
	import type { CategoryData, Mode } from '@src/types';
	import { obj2formData } from '@src/utils';
	import axios from 'axios';
	import { onDestroy } from 'svelte';
	import FilePicker from './FilePicker.svelte';
	import { inputError } from '@src/store';
	import { track } from '@src/store.svelte';
	async function save() {
		if ($inputError.message) return;
		if (mode === 'create') await axios.put('/api/categories', obj2formData(data));
		else if (mode === 'edit') await axios.patch('/api/categories', obj2formData(data));
		show = false;
		onrefresh?.();
	}

	interface Props {
		show?: boolean;
		mode?: Mode;
		data?: CategoryData;
		onrefresh?: () => void;
	}

	let {
		onrefresh,
		show = $bindable(false),
		mode = 'create',
		data = $bindable({
			image: null,
			en: {
				title: ''
			},
			ka: {
				title: ''
			}
		})
	}: Props = $props();
	let language: 'en' | 'ka' = $state('en');
	function onFileChange(file: File) {
		data.image = file;
	}
	track(
		() => {
			if (data[language].title.includes('_')) {
				$inputError.set({
					message: '_ is not allowed in category name',
					type: 'error'
				});
			} else {
				$inputError.clear();
			}
		},
		() => data[language].title
	);
	onDestroy(() => {
		$inputError.clear();
	});
</script>

<div
	onclick={() => (show = false)}
	class="fixed left-0 top-0 z-10 flex h-screen w-screen items-center justify-center bg-black opacity-50"
></div>

<div
	class="fixed left-1/2 top-1/2 z-20 flex w-[500px] max-w-[90vw] -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2 rounded-lg bg-white p-[50px]"
>
	<Language class="absolute right-4 top-2" bind:language />
	<FloatingInput label="Category Name" name="title" type="text" bind:value={data[language].title}
	></FloatingInput>
	<FilePicker onchange={onFileChange} />
	<button onclick={save}>Save</button>
</div>

<style>
	button {
		background-color: #609966;
		color: white;
		font-family: Poppins;
		font-weight: 600;
		font-size: 18px;
		padding: 5px 20px;
		border-radius: 5px;
		border: none;
		cursor: pointer;
		margin-top: 20px;
	}
	button:active {
		transform: scale(0.9);
	}
</style>
