<script>
	let { content = $bindable(''), ...props } = $props();
</script>

<div {...props}>
	{@html content}
</div>

<style>
	@import './RichText.css';
</style>
