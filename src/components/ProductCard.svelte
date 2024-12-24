<script lang="ts">
	interface Props {
		title: any;
		src?: string;
		onclick?: () => void;
		class?: string;
	}

	let { title, src = '/cardbear.png', ...props }: Props = $props();
</script>

<div
	{...props}
	class="w-[280px] cursor-pointer overflow-hidden rounded-[20px] border-[1px] border-solid border-[#005500]"
>
	<div
		class="min-h-[200px] border-b-2 border-solid border-[#005500] bg-[#E6F5D0] transition-colors hover:bg-green-300"
	>
		<img {src} alt="category" />
	</div>
	<div class="flex h-[100px] items-center justify-center bg-[#F5F5DCC4]">
		<p class="text-center font-Poppins text-[22px] font-[700] text-[#005500]">{title}</p>
	</div>
</div>
