<script lang="ts">
	import { track } from '@src/store.svelte';

	import Checkbox from '@src/components/Checkbox.svelte';
	import AddButton from '@src/components/icons/AddButton.svelte';
	import CloseIcon from '@src/components/icons/CloseIcon.svelte';
	import Delete from '@src/components/icons/Delete.svelte';
	import type { ImageFile, UploadedImage } from '@src/types';
	interface Props {
		images?: { array: ImageFile[]; string: string };
		show?: boolean;
	}

	let { images = $bindable({ array: [], string: '' }), show = $bindable(false) }: Props = $props();
	let uploadedImages: UploadedImage[] = $state([]);
	let input = $state() as HTMLInputElement;
	function onChange() {
		for (let file of input?.files || []) {
			let meta_data: ImageFile['meta_data'] = {
				thumbnail: false,
				branded: false
			};
			(file as ImageFile).meta_data = meta_data;
			images.array.push(file as ImageFile);
		}
		images = images;
	}
	if (images.string) {
		uploadedImages = JSON.parse(images.string);
	}

	track(
		() => (images.string = JSON.stringify(uploadedImages)),
		() => uploadedImages
	);
</script>

<div
	class="fixed left-1/2 top-1/2 z-20 flex h-[90%] w-[90%] -translate-x-1/2 -translate-y-1/2 flex-col rounded-md bg-white px-4 py-2"
>
	<div class="mb-4 flex items-center justify-between">
		<AddButton onclick={() => input.click()} class="mx-auto cursor-pointer active:scale-90" />
		<CloseIcon class="-ml-[30px]" onclick={() => (show = false)} />
	</div>
	<div class="flex flex-wrap justify-center gap-4 overflow-auto">
		{#each images.array as image}
			<div
				class="flex w-[300px] flex-col items-center rounded-md border-2 border-solid border-[#686a68] p-4 px-[50px]"
			>
				<Delete
					class="cursor-pointer"
					onclick={() => (images.array = images.array.filter((img) => img !== image))}
				></Delete>
				<img
					class="h-[200px] w-[200px] flex-grow object-contain"
					src={URL.createObjectURL(image)}
					alt="product images"
				/>
				<p class="max-w-full overflow-hidden text-ellipsis text-nowrap font-Poppins">
					{image.name}
				</p>

				<Checkbox
					class="mt-2"
					selected
					label="thumbnail"
					group="thumbnail"
					bind:checked={image.meta_data.thumbnail}
				/>
				<Checkbox class="mt-2" label="Branded" bind:checked={image.meta_data.branded} />
			</div>
		{/each}

		{#each uploadedImages.filter((image) => !image.deleted) as image}
			<div
				class="flex w-[300px] flex-col items-center rounded-md border-2 border-solid border-[#686a68] p-4 px-[50px]"
			>
				<Delete class="cursor-pointer" onclick={() => (image.deleted = true)}></Delete>
				<img class="h-[200px] w-[200px] flex-grow object-contain" src={image.url} alt="product " />
				<p class="max-w-full overflow-hidden text-ellipsis text-nowrap font-Poppins">
					{image.name}
				</p>

				<Checkbox
					class="mt-2"
					selected
					label="thumbnail"
					group="thumbnail"
					bind:checked={image.thumbnail}
				/>
				<Checkbox class="mt-2" label="Branded" bind:checked={image.branded} />
			</div>
		{/each}
	</div>

	<button
		class="mx-auto mt-4 min-h-[40px] w-[100px] rounded-md bg-[#609966] text-white"
		onclick={() => (show = false)}>Save</button
	>
</div>
<input type="file" hidden bind:this={input} multiple onchange={onChange} />
