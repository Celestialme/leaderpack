<script lang="ts">
	import { contact_el } from '@src/store.svelte';
	import Media from './icons/Media.svelte';
	import locales from '@src/locales.svelte';
	interface Props {
		altStyle?: boolean;
	}

	let { altStyle = false }: Props = $props();

	let title = $derived(altStyle ? locales.contactToOrder() : locales.contact());
</script>

<div class="mt-auto"></div>
<div
	bind:this={contact_el.value}
	class:altStyle
	class="mx-auto mt-[50px] w-[80%] max-w-[700px] scroll-mt-[30px] rounded-md bg-[#B2D99AA8] p-[20px]"
>
	<p class="mb-[50px] text-center font-Poppins text-[20px] font-[700] text-[#014B82]">{title}</p>
	<div class="flex flex-wrap items-center justify-evenly gap-[20px]">
		<div>
			<a href="tel:+995 510 00 22 28"><Media icon="phone" /> +995 510 00 22 28</a>
			<a href="mailto:contact@leaderpack.ge"><Media icon="email" /> contact@leaderpack.ge</a>
			<a href="https://www.facebook.com/leaderpack.ge" target="_blank">
				<Media icon="facebook" /> @Leader Pack • ლიდერ პაკი
			</a>
			<a href="https://www.instagram.com/leaderpack.ge/" target="_blank">
				<Media icon="instagram" /> ლიდერ პაკი @leaderpack.ge
			</a>
			<a href="https://www.linkedin.com/company/leaderpackge/" target="_blank"
				><Media icon="linkedin" /> Leader Pack • ლიდერ პაკი</a
			>
		</div>
		<a
			data-description={locales.map()}
			class="map relative"
			href="https://www.google.com/maps/place/Didube+Plaza/@41.7386769,44.7783268,17z/data=!4m6!3m5!1s0x40447294cd8c4faf:0xb98074af2e79b7b2!8m2!3d41.7384729!4d44.780775!16s%2Fg%2F11r96hs3t?entry=ttu&g_ep=EgoyMDI0MTIxMS4wIKXMDSoASAFQAw%3D%3D"
			target="_blank"
		>
			<img src="/map.jpg" width="300px" alt="" />
		</a>
	</div>
</div>

<style>
	a {
		display: block;
	}
	.altStyle {
		max-width: min(calc(100% - 20px), 2000px);
		margin-left: auto;
		margin-right: auto;
		width: 100%;
		background-color: #fcf4f4;
		border: 1px solid #c6c69f;
	}
	.map:hover img {
		filter: brightness(0.5);
	}
	.map:hover::after {
		content: attr(data-description);
		position: absolute;
		width: 100%;
		text-align: center;
		top: 50%;
		transform: translateY(-50%);
		color: white;
		font-weight: 700;
		font-size: 20px;
	}
</style>
