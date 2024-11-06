<script lang="ts">
	import { page } from '$app/stores';
	import locales from '@src/locales';
</script>

<p class="my-[20px] text-center font-Poppins text-[26px] font-[700] text-[#014B82]">
	{locales.OurCustomers[$page.params.language as 'en' | 'ka']}
</p>
<div class="flex flex-wrap items-center justify-evenly">
	{#each Array(5) as _, index}
		<img src={`./c${index + 1}.png`} alt="" width="150" />
	{/each}
</div>
