<script>
	export let title;
	export let description;
	export let sizes;
	export let material;
	export let src = '/box.png';
</script>

<div
	on:click
	class="flex w-full cursor-pointer items-center gap-[20px] rounded-md border border-solid border-[#C6C69F] bg-[#FCF4F4] p-[20px] {$$props.class}"
>
	<img {src} alt="Box" width="150" height="150" class="max-h-full" />
	<div>
		<p>{title}</p>
		<p>{description}</p>
		<p>{material}</p>
		<p>{sizes}</p>
	</div>
</div>
