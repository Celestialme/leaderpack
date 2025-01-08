<script lang="ts">
	interface Props {
		class?: string;
		onclick?: () => void;
		href?: string;
	}

	let props = $props();
</script>

<a href={props.href}>
	<img
		{...props}
		class="max-h-[150px] w-[15vw] min-w-[80px] max-w-[150px] {props.class}"
		width="159"
		height="162"
		src="/icons/logo.png"
		alt=""
	/>
</a>
