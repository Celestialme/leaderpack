export async function load({ fetch }) {
	let categories = await fetch('/api/categories').then((res) => res.json());

	return {
		categories
	};
}
