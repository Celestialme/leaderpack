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
			<a href="https://www.linkedin.com/leaderpackge?_l=en_US" target="_blank"
				><Media icon="linkedin" /> Leader Pack • ლიდერ პაკი</a
			>
		</div>
		<img src="/map.png" width="300px" alt="" />
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
</style>
