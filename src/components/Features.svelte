<script lang="ts">
	import locales from '@src/locales.svelte';
</script>

<div class="bg-[#B2D99A] pb-[80px] pt-[10px]">
	<div class="mx-auto max-w-[2000px]">
		<p class="text-center font-Poppins text-[30px] font-[700] text-[#005500]">{locales.why()}</p>
		<p class="my-[10px] px-2 text-center font-Poppins text-[#005500]">
			{@html locales.reason()}
		</p>

		<div class="qualities mt-[50px] flex justify-evenly gap-6 px-4 max-md:flex-wrap">
			<div class="flex flex-col items-center gap-4">
				<img src="/features/Quality.png" alt="" />
				<p class="header">{locales.highquality()}</p>
				<p class="text-center">{locales.highqualityExtra()}</p>
			</div>
			<div class="flex flex-col items-center gap-4">
				<img src="/features/Speed.png" alt="" />
				<p class="header">{locales.fastDistribution()}</p>
				<p class="text-center">{locales.fastDistributionExtra()}</p>
			</div>
			<div class="flex flex-col items-center gap-4">
				<img src="/features/Custom.png" alt="" />
				<p class="header">{locales.customization()}</p>
				<p class="text-center">{locales.customizationExtra()}</p>
			</div>
		</div>
	</div>
</div>

<style>
	img {
		width: 150px;
		height: 150px;
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
