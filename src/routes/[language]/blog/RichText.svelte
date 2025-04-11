<script>
	let { content = $bindable(''), ...props } = $props();
</script>

<div {...props} class="mx-auto">
	{@html content}
</div>

<style>
	* :global(h1) {
		font-size: 24px;
	}
	* :global(h2) {
		font-size: 18px;
	}
	* :global(a) {
		color: #00d3d0;
		text-decoration: underline;
		cursor: pointer;
	}
	* :global(img) {
		cursor: pointer;
		display: inline-block;
	}

	* :global(p) {
		min-height: 16px;
	}

	@media (max-width: 600px) {
		/* Your styles here */
		* :global(img) {
			object-fit: contain;
		}
		* :global(.image_container) {
			height: auto !important;
		}
		* :global(p),
		* :global(span) {
			font-size: 16px !important;
		}
	}
</style>
