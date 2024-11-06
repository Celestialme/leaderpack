import { getRelatedProducts, insertProduct, updateProduct } from '@src/db';

export async function POST({ request }) {
	let data = await request.formData();
	let ids = JSON.parse(data.get('ids') as string);
	let products = await getRelatedProducts(ids);
	return new Response(JSON.stringify(products));
}
