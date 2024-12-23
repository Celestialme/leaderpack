export async function load({ fetch, params }) {
	let _category = params.category.replaceAll('_', ' ');
	let products = fetch(`/api/products?category=${_category}`).then((res) => res.json());
	let category = fetch(`/api/categories?category=${params.category.fromSlug()}`).then((res) =>
		res.json()
	);
	let result = await Promise.all([products, category]);
	return {
		products: result[0],
		category: result[1]
	};
}
