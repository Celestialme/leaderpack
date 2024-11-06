<script lang="ts">
	import { page } from '$app/stores';
	import locales from '@src/locales';
</script>

<div class="mt-[50px] bg-[#B2D99A] pb-[80px] pt-[10px]">
	<p class="text-center font-Poppins text-[30px] font-[700] text-[#005500]">
		{locales.why[$page.params.language as 'en' | 'ka']}
	</p>
	<p class="mb-[10px] text-center font-Poppins text-[12px] text-[#005500]">
		{@html locales.reason[$page.params.language as 'en' | 'ka']}
	</p>

	<div class="qualities flex justify-evenly">
		<div class="text-center">
			<img src="./rb-1.png" alt="" />
			<p>{locales.highquality[$page.params.language as 'en' | 'ka']}</p>
		</div>
		<div class="text-center">
			<img src="./rb-2.png" alt="" />
			<p>{locales.fastDistribution[$page.params.language as 'en' | 'ka']}</p>
		</div>
		<div class="text-center">
			<img src="./rb-3.png" alt="" />
			<p>{locales.customization[$page.params.language as 'en' | 'ka']}</p>
		</div>
	</div>
</div>

<style>
	img {
		width: 150px;
		height: 100px;
		object-fit: cover;
	}
	.qualities p {
		color: #005500;
		font-family: Poppins;
		font-weight: 700;
		font-size: 15px;
		margin-top: 10px;
	}
</style>
