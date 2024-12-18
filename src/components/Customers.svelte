<script lang="ts">
	import locales from '@src/locales.svelte';
	let customers = ['ფრესკო', '8000 მოს', 'როიალ', 'ჭაშნ', 'Paulaner', 'ჩიკაგო', 'ინგორო'];
</script>

<p class="my-[20px] text-center font-Poppins text-[26px] font-[700] text-[#014B82]">
	{locales.OurCustomers()}
</p>
<div class="flex flex-wrap items-center justify-evenly gap-2 gap-y-4">
	{#each customers as customer, i}
		<img
			src={`/customers/${customer}.png`}
			alt=""
			width={i == customers.length - 1 ? '250' : '150'}
		/>
	{/each}
</div>
