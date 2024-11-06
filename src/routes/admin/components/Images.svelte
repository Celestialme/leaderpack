<script lang="ts">
	import Checkbox from '@src/components/Checkbox.svelte';
	import AddButton from '@src/components/icons/AddButton.svelte';
	import CloseIcon from '@src/components/icons/CloseIcon.svelte';
	import Delete from '@src/components/icons/Delete.svelte';
	import type { ImageFile, UploadedImage } from '@src/types';
	export let images: { array: ImageFile[]; string: string } = { array: [], string: '' };
	export let show = false;
	let uploadedImages: UploadedImage[] = [];
	let input: HTMLInputElement;
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
	$: images.string = JSON.stringify(uploadedImages);
</script>

<div
	class="fixed left-1/2 top-1/2 z-20 flex h-[90%] w-[90%] -translate-x-1/2 -translate-y-1/2 flex-col rounded-md bg-white px-4 py-2"
>
	<div class="mb-4 flex items-center justify-between">
		<AddButton on:click={() => input.click()} class="mx-auto cursor-pointer active:scale-90" />
		<CloseIcon class="-ml-[30px]" on:click={() => (show = false)} />
	</div>
	<div class="flex flex-wrap justify-center gap-4 overflow-auto">
		{#each images.array as image}
			<div
				class="flex w-[300px] flex-col items-center rounded-md border-2 border-solid border-[#686a68] p-4 px-[50px]"
			>
				<Delete
					class="cursor-pointer"
					on:click={() => (images.array = images.array.filter((img) => img !== image))}
				></Delete>
				<img
					class="h-[200px] w-[200px] flex-grow object-contain"
					src={URL.createObjectURL(image)}
					alt="image"
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
				<Delete class="cursor-pointer" on:click={() => (image.deleted = true)}></Delete>
				<img class="h-[200px] w-[200px] flex-grow object-contain" src={image.url} alt="image" />
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
		on:click={() => (show = false)}>Save</button
	>
</div>
<input type="file" hidden bind:this={input} multiple on:change={onChange} />
