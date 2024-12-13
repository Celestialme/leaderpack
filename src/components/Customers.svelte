<script lang="ts">
	import locales from '@src/locales.svelte';
	let customers = [
		'Fresco',
		'8000 Vintages',
		'Royal Khvanchkara',
		'Chashnagiri',
		'Paulaner',
		'Chicago Style',
		'Ingorokva'
	];
</script>

<p class="my-[20px] text-center font-Poppins text-[26px] font-[700] text-[#014B82]">
	{locales.OurCustomers()}
</p>
<div class="flex flex-wrap items-center justify-evenly">
	{#each customers as customer}
		<img src={`/customers/${customer}.png`} alt="" width="150" />
	{/each}
</div>
