<script lang="ts">
	import locales from '@src/locales.svelte';
	import { header_el, products_el } from '@src/store.svelte';

	async function scroll() {
		let unsub = products_el.subscribe((d) => {
			if (d) {
				d.style.scrollMarginTop = header_el().offsetHeight + 'px';
				d.scrollIntoView({ behavior: 'smooth' });
				unsub();
			}
		});
	}
</script>

<div
	class="banner mt-[10px] flex h-[400px] flex-wrap-reverse items-center justify-between gap-y-[50px] bg-[#B2D99A] px-[5%] py-[50px]"
>
	<div class="mr-auto flex flex-col justify-center gap-[20px]">
		<p class="deserve">{@html locales.deserve()}</p>
		<p class="perfect">{@html locales.perfect()}</p>
		<button onclick={scroll}>{locales.getStarted()}</button>
	</div>
</div>

<style>
	.deserve {
		font-size: max(calc(1vw + 18px), 30px);
		max-width: calc(100vw - 45%);
		min-width: 300px;
	}
	.perfect {
		font-size: max(calc(1vw + 8px), 18px);
	}

	.banner {
		background: url('/banner.jpg');
		background-position: 75% 75%;
		background-repeat: no-repeat;
		background-size: cover;
	}
	p {
		font-family: Poppins;
		font-weight: 700;
		color: #d8fed8;
	}
	button {
		font-family: Poppins;
		color: white;
		background-color: #403f43;
		border-radius: 30px;
		font-size: 20px;
		font-weight: 700;
		padding: 5px 20px;
		width: 250px;
	}
	button:hover {
		background-color: #605f63;
	}
	@media screen and (min-width: 1400px) {
		:global(.deserve br) {
			display: none;
		}
		.banner {
			background: url('/banner2.jpg');
			background-position: 75% 75%;
			background-repeat: no-repeat;
			background-size: cover;
		}
	}
</style>
