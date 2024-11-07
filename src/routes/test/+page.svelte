<script lang="ts">
	let images = ['/48.jpg', '/52.jpg', '/51.jpg', '/55.jpg', '/58.jpg'];
	let index = 0;
	let side1 = images[index];
	let side2 = images[index];
	let first = true;
	let is_running = false;
	function change(d: number) {
		if (is_running) return;
		is_running = true;
		setTimeout(() => (is_running = false), 200);
		if (index + d > images.length - 1) {
			index = 0;
			side1 = images[images.length - 1];
			side2 = images[index];
			return;
		}
		if (index + d < 0) {
			index = images.length - 1;
			side1 = images[0];
			side2 = images[index];
			return;
		}
		first = false;
		side1 = images[index];
		index += d;
		side2 = images[index];
	}
</script>

{#key index}
	<div class="relative h-[300px] w-[300px] overflow-hidden">
		<div class:opacity-0={is_running} class="arrow left" onclick={() => change(-1)}></div>
		<div class:opacity-0={is_running} class="arrow right" onclick={() => change(1)}></div>
		<img src={side1} alt="" class:animate={index !== 0 || !first} />
		<img src={side2} alt="" class:animate2={index !== 0 || !first} />
		<div class="absolute bottom-2 z-10 flex w-full items-center justify-center gap-2">
			{#each images as _, i}
				<div
					class:opacity-100={i === index}
					class:w-[15px]={i === index}
					class:h-[15px]={i === index}
					class="h-[10px] w-[10px] rounded-full bg-white opacity-50 transition-all"
				></div>
			{/each}
		</div>
	</div>
{/key}

<style>
	img {
		width: 100%;
		height: 100%;
		position: absolute;
		left: 0;
		top: 0;
		object-fit: contain;
	}
	img:nth-child(1) {
		z-index: 1;
	}
	.animate {
		animation: change 0.4s linear forwards;
	}
	.animate2 {
		animation: change2 0.4s linear forwards;
	}
	@keyframes change {
		0% {
			opacity: 1;
		}
		100% {
			filter: blur(5px);
			opacity: 0;
		}
	}
	@keyframes change2 {
		0% {
			transform: scale(1.1);
			filter: blur(5px);
		}
		100% {
			transform: scale(1);
			filter: blur(0px);
		}
	}
	.arrow {
		position: absolute;
		top: 50%;
		border: solid white;
		border-width: 0 5px 5px 0;
		display: inline-block;
		padding: 8px;
		z-index: 10;
		cursor: pointer;
		transition: all 0.2s;
		opacity: 0.5;
	}

	.right {
		right: 10px;
		transform: rotate(-45deg);
	}
	.right:active {
		transform: scale(0.7) rotate(-45deg);
	}
	.left:active {
		transform: scale(0.7) rotate(135deg);
	}
	.left {
		left: 10px;
		transform: rotate(135deg);
		-webkit-transform: rotate(135deg);
	}
</style>
