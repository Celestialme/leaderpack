<script>
	export let title;
	export let src = '/cardbear.png';
</script>

<div
	on:click
	class="w-[280px] cursor-pointer overflow-hidden rounded-[20px] border-[1px] border-solid border-[#005500]"
>
	<div class="min-h-[200px] border-b-2 border-solid border-[#005500] bg-[#E6F5D0]">
		<img {src} alt="category image" />
	</div>
	<div class="flex h-[100px] items-center justify-center bg-[#F5F5DCC4]">
		<p class="font-Poppins text-[20px] font-[700] text-[#005500]">{title}</p>
	</div>
</div>
