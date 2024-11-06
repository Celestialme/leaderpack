<script lang="ts">
	import locales from '@src/locales';
</script>

<p class="my-[20px] text-center font-Poppins text-[26px] font-[700] text-[#014B82]">
	{$locales.OurCustomers()}
</p>
<div class="flex flex-wrap items-center justify-evenly">
	{#each Array(5) as _, index}
		<img src={`./c${index + 1}.png`} alt="" width="150" />
	{/each}
</div>
