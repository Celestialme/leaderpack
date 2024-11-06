<script lang="ts">
	import Search from './icons/Search.svelte';
	import locales from '@src/locales';
	export let value = '';
</script>

<div
	class="mx-auto flex h-[50px] flex-shrink items-center gap-[20px] rounded-[8px] border-[1px] border-[#DBDBDD] bg-[#ffffffb0] p-[10px] {$$props.class}"
>
	<Search></Search>
	<input
		bind:value
		class=" w-[calc(100%-35px)] min-w-[100px] bg-[transparent] font-Poppins text-[24px] font-[400] outline-none"
		type="text"
		name=""
		id=""
		placeholder={$locales.search()}
	/>
</div>
