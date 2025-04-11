export async function load({ fetch, params }) {
	let blog = await fetch(`/api/blogs?blog=${params.blog}`).then((res) => res.json());
	return {
		blog
	};
}
