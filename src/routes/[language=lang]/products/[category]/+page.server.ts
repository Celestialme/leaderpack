export async function load({ fetch, params }) {
	let category = params.category.replaceAll('_', ' ');
	let products = await fetch(`/api/products?category=${category}`).then((res) => res.json());
	return {
		products
	};
}
