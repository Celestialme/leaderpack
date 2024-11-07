<script lang="ts">
	interface Props {
		title: any;
		description: any;
		sizes: any;
		material: any;
		src?: string;
		onclick?: () => void;
		class?: string;
	}

	let {
		title,
		description,
		sizes,
		material,
		src = '/box.png',
		class: _class,
		...props
	}: Props = $props();
</script>

<div
	{...props}
	class="flex w-full cursor-pointer items-center gap-[20px] rounded-md border border-solid border-[#C6C69F] bg-[#FCF4F4] p-[20px] {_class}"
>
	<img {src} alt="Box" width="150" height="150" class="max-h-full" />
	<div>
		<p>{title}</p>
		<p>{description}</p>
		<p>{material}</p>
		<p>{sizes}</p>
	</div>
</div>
