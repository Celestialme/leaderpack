<script lang="ts">
	import Search from './icons/Search.svelte';
</script>

<div
	class="mx-auto flex h-[50px] flex-shrink items-center gap-[20px] rounded-[8px] border-[1px] border-[#DBDBDD] p-[10px]"
>
	<Search></Search>
	<input
		class=" w-[calc(100%-35px)] min-w-[100px] bg-[#F0F0F0] font-Poppins text-[24px] font-[400] outline-none"
		type="text"
		name=""
		id=""
		placeholder="Search"
	/>
</div>
