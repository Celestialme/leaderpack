<script lang="ts">
	interface Props {
		title: any;
		src?: string;
		onclick?: () => void;
		class?: string;
		href?: string;
		isRelated?: boolean;
	}

	let { title, isRelated = false, src = '/cardbear.png', ...props }: Props = $props();
</script>

<a
	{...props}
	class="block w-[280px] cursor-pointer overflow-hidden rounded-[20px] border-[1px] border-solid border-[#005500]"
>
	<div
		class="min-h-[200px] border-b-2 border-solid border-[#005500] bg-[#E6F5D0] transition-colors hover:bg-green-300"
	>
		<img {src} alt={title} {title} />
	</div>
	<div class="flex h-[100px] items-center justify-center bg-[#F5F5DCC4]">
		{#if isRelated}
			<p class="text-center font-Poppins text-[22px] font-[700] text-[#005500]">{title}</p>
		{:else}
			<h2 class="text-center font-Poppins text-[22px] font-[700] text-[#005500]">{title}</h2>
		{/if}
	</div>
</a>
