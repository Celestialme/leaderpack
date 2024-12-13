<script lang="ts">
	import locales from '@src/locales.svelte';
</script>

<div class="mt-[50px] bg-[#B2D99A] pb-[80px] pt-[10px]">
	<p class="text-center font-Poppins text-[30px] font-[700] text-[#005500]">{locales.why()}</p>
	<p class="mb-[10px] text-center font-Poppins text-[12px] text-[#005500]">
		{@html locales.reason()}
	</p>

	<div class="qualities mt-[50px] flex justify-evenly gap-6 px-4">
		<div class="flex flex-col items-center gap-4">
			<img src="/features/Quality.png" alt="" />
			<p class="header">{locales.highquality()}</p>
			<p>{locales.highqualityExtra()}</p>
		</div>
		<div class="flex flex-col items-center gap-4">
			<img src="/features/Speed.png" alt="" />
			<p class="header">{locales.fastDistribution()}</p>
			<p>{locales.fastDistributionExtra()}</p>
		</div>
		<div class="flex flex-col items-center gap-4">
			<img src="/features/Custom.png" alt="" />
			<p class="header">{locales.customization()}</p>
			<p>{locales.customizationExtra()}</p>
		</div>
	</div>
</div>

<style>
	img {
		width: 150px;
		height: 100px;
		object-fit: cover;
	}
	.qualities p.header {
		color: #005500;
		font-family: Poppins;
		font-weight: 700;
		font-size: 15px;
		margin-top: 10px;
	}
</style>
