export async function load({ fetch, params }) {
	let product = fetch(`/api/products?product=${params.product.fromSlug()}`).then((res) =>
		res.json()
	);
	let category = fetch(`/api/categories?category=${params.category.fromSlug()}`).then((res) =>
		res.json()
	);
	let result = await Promise.all([product, category]);
	return {
		product: result[0],
		category: result[1]
	};
}
