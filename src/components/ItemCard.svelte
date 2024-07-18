<script>
	export let title;
	export let description;
</script>

<div
	on:click
	class="flex w-full cursor-pointer items-center gap-[20px] rounded-md border border-solid border-[#C6C69F] bg-[#FCF4F4] p-[20px]"
>
	<div class="img" />
	<div>
		<p>{title}</p>
		<p>{description}</p>
	</div>
</div>

<style>
	.img {
		width: 150px;
		height: 150px;
		background-size: 150px 150px;
		background-image: url('/box.png');
	}

	div:nth-child(2) > .img,
	div:nth-child(3n) > .img {
		background-image: url('/box2.png');
	}
</style>
