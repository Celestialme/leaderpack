<script lang="ts">
	import { contact_el } from '@src/store';
	import Media from './icons/Media.svelte';
</script>

<div
	bind:this={$contact_el}
	class="mx-auto mt-[50px] w-[80%] max-w-[700px] rounded-md bg-[#B2D99AA8] p-[20px]"
>
	<p class="mb-[50px] text-center font-Poppins text-[20px] font-[700] text-[#014B82]">Contact Us</p>
	<div class="flex flex-wrap items-center justify-evenly gap-[20px]">
		<div>
			<p><Media icon="phone" /> +1234567890</p>
			<p><Media icon="email" /> lorem.ipsum@gmail.com</p>
			<p><Media icon="facebook" /> @lorem.ipsum</p>
			<p><Media icon="instagram" /> @lorem.ipsum</p>
			<p><Media icon="linkedin" /> linkedin.com/lorem.ipsum</p>
		</div>
		<img src="./map.png" width="300px" alt="" />
	</div>
</div>
