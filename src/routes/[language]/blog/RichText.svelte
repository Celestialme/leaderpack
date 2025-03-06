<script>
	let { content = $bindable(''), ...props } = $props();
</script>

<div {...props} class="mx-auto">
	{@html content}
</div>

<style>
	@import './RichText.css';
</style>
