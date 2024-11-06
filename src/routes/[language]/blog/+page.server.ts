export async function load({ fetch, url }) {
	let blog = url.searchParams.get('blog')?.replaceAll('_', ' ');
	let query = blog ? `?blog=${blog}` : '';
	let blogs = await fetch(`/api/blogs${query}`).then((res) => res.json());

	return {
		blogs
	};
}
