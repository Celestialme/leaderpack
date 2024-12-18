<script lang="ts">
	let { opened = $bindable(), ...props } = $props();
</script>

<svg
	class={props.class}
	width={props.width || '43'}
	height="30"
	viewBox="0 0 43 30"
	fill="black"
	xmlns="http://www.w3.org/2000/svg"
	{...props}
>
	<g id="menu">
		{#if !opened}
			<rect id="menu-bottom" width="43" height="3.52941" />
			<rect id="menu-middle" y="13.2353" width="43" height="3.52941" />
			<rect id="menu-top" y="26.4706" width="43" height="3.52941" />
		{:else}
			<rect class="origin-center rotate-45" y="13.2353" width="43" height="3.52941" />
			<rect class="origin-center -rotate-45" y="13.2353" width="43" height="3.52941" />
		{/if}
	</g>
</svg>
