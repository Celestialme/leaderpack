export async function load({ fetch, params }) {
	let product = await fetch(`/api/products?product=${params.product.replaceAll('_', ' ')}`).then(
		(res) => res.json()
	);
	return {
		product
	};
}
