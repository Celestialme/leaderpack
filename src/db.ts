import type { Product, UploadedImage } from './types';
import imageKit, { deleteImage } from './imagekit';

import { POSTGRESQL_URL } from '$env/static/private';
import pg from 'pg';

const pool = new pg.Pool({
	connectionString: POSTGRESQL_URL,
	max: 10, // Maximum number of connections in the pool
	idleTimeoutMillis: 30000 // Close idle clients after 30 seconds
});

export async function query(sql: string, values: any[] = []) {
	const client = await pool.connect();
	try {
		const resp = await client.query(sql, values);
		return resp;
	} finally {
		client.release(); // Return the client to the pool
	}
}

export function init_db() {
	query(`CREATE TABLE IF NOT EXISTS blogs (
	id TEXT PRIMARY KEY ,
	title_en TEXT NOT NULL,
	title_ka TEXT NOT NULL,
	content_en TEXT NOT NULL,
	content_ka TEXT NOT NULL,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`);

	query(`CREATE TABLE IF NOT EXISTS categories (
    id TEXT PRIMARY KEY ,
	title_en TEXT NOT NULL,
    title_ka TEXT NOT NULL,
	"imageURL" TEXT NOT NULL,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`);

	query(`CREATE TABLE IF NOT EXISTS products (
    id TEXT PRIMARY KEY ,
    category_id TEXT NOT NULL,
    title_en TEXT NOT NULL,
    title_ka TEXT NOT NULL,
    description_en TEXT NOT NULL,
    description_ka TEXT NOT NULL,
    material_en TEXT NOT NULL,
    material_ka TEXT NOT NULL,
    sizes_en TEXT NOT NULL,
    sizes_ka TEXT NOT NULL,
	colors_ka TEXT NOT NULL,
	colors_en TEXT NOT NULL,
	options_en TEXT NOT NULL,
	options_ka TEXT NOT NULL,
	details_en TEXT NOT NULL,
	details_ka TEXT NOT NULL,
	branding INTEGER NOT NULL,
	"relatedProducts" TEXT,
	images TEXT NOT NULL,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
	);`);
}
export async function insertCategory({
	id,
	title_en,
	title_ka,
	imageURL
}: {
	id: string;
	title_en: string;
	title_ka: string;
	imageURL: string;
}) {
	await query(`INSERT INTO categories(id, title_en, title_ka, "imageURL") VALUES($1,$2,$3,$4)`, [
		id,
		title_en,
		title_ka,
		imageURL
	]);
}
export async function updateCategory({
	id,
	title_en,
	title_ka,
	imageURL
}: {
	id: string;
	title_en: string;
	title_ka: string;
	imageURL: string;
}) {
	await query(
		`UPDATE categories SET title_en = $1, title_ka = $2 , "imageURL" = $3 WHERE id = $4`,
		[title_en, title_ka, imageURL, id]
	);
}
export async function deleteCategory({ id }: { id: string }) {
	query(`DELETE FROM products WHERE category_id = $1`, [id]);
	await query(`DELETE FROM categories WHERE id = $1`, [id]);
	await imageKit.deleteFolder(`LeaderPack/${id}`);
}
export function getCategories() {
	return query(`SELECT * FROM categories ORDER BY created_at ASC`).then((res) => res.rows);
}

export async function getCategory(id_title: string) {
	return query(`SELECT * FROM categories where id = $1 or title_en = $2 or title_ka = $3`, [
		id_title,
		id_title,
		id_title
	]).then((res) => res.rows[0]);
}
export async function insertProduct(params: Product) {
	await query(
		`INSERT INTO products(
				 id,
				 category_id,
				 title_en, 
				 title_ka, 
				 description_en, 
				 description_ka,
				 material_en,
				 material_ka,
				 sizes_en, 
				 sizes_ka,
				 colors_en,
				 colors_ka,
				 options_en,
				 options_ka,
				 details_en,
				 details_ka ,
				 branding,
				 "relatedProducts",
				 images
				 ) 
				 VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19)`,
		[
			params.id,
			params.category_id,
			params.title_en,
			params.title_ka,
			params.description_en,
			params.description_ka,
			params.material_en,
			params.material_ka,
			params.sizes_en,
			params.sizes_ka,
			params.colors_en,
			params.colors_ka,
			params.options_en,
			params.options_ka,
			params.details_en,
			params.details_ka,
			params.branding,
			params.relatedProducts,
			params.images
		]
	);
}

export async function updateProduct(params: Product) {
	await query(
		`
			UPDATE products SET 
			category_id = $1, 
			title_en = $2, 
			title_ka = $3, 
			description_en = $4, 
			description_ka = $5, 
			material_en = $6, 
			material_ka = $7, 
			sizes_en = $8, 
			sizes_ka = $9,
			colors_en = $10,
			colors_ka = $11, 
			options_en = $12,
			options_ka = $13, 
			details_en = $14,
			details_ka = $15, 
			branding = $16,
			"relatedProducts" = $17,
			images = $18
			WHERE id = $19`,
		[
			params.category_id,
			params.title_en,
			params.title_ka,
			params.description_en,
			params.description_ka,
			params.material_en,
			params.material_ka,
			params.sizes_en,
			params.sizes_ka,
			params.colors_en,
			params.colors_ka,
			params.options_en,
			params.options_ka,
			params.details_en,
			params.details_ka,
			params.branding,
			params.relatedProducts,
			params.images,
			params.id
		]
	);
}

export async function deleteProduct({ id }: { id: string }) {
	let product = await getProduct(id);
	let images: UploadedImage[] = JSON.parse(product.images);
	images.forEach((image) => {
		deleteImage(image.id).catch((err) => console.log(err));
	});
	await query(`DELETE FROM products WHERE id = $1`, [id]);
}

export function getProducts(params: { all: true }): any;
export function getProducts(params: { category_id: string }): any;
export function getProducts(params: { category: string }): any;
export function getProducts(params: { category?: string; category_id?: string; all?: true }) {
	if (params?.category_id) {
		return query(`SELECT * FROM products where category_id = $1 ORDER BY created_at ASC`, [
			params.category_id
		]).then((res) => res.rows);
	} else if (params?.category) {
		return query(
			`SELECT products.* FROM  categories,products where category_id = categories.id and (categories.title_en = $1 or categories.title_ka = $1) ORDER BY created_at ASC`,
			[params.category]
		).then((res) => res.rows);
	} else if (params?.all) {
		return query(`SELECT * FROM products ORDER BY created_at ASC`).then((res) => res.rows);
	}
}

export async function getProduct(id_title: string) {
	let product: Product = (
		await query(`SELECT * FROM products where id = $1 or title_en = $1 or title_ka = $1`, [
			id_title
		])
	).rows[0];
	let ids = product.relatedProducts.split(',');
	let relatedProducts = await getRelatedProducts(ids);
	return { ...product, relatedProducts };
}

export function getRelatedProducts(ids: string[]) {
	let idsString = ids.map((id) => `'${id}'`).join(',');
	return query(
		`SELECT products.*, categories.title_en as category_title_en, categories.title_ka as category_title_ka  FROM categories,products where categories.id = products.category_id AND products.id in (${idsString})`
	).then((res) => res.rows);
}
export function getBlogs() {
	return query(`SELECT * FROM blogs`).then((res) => res.rows);
}

export function getBlog({ blog }: { blog: string }) {
	return query(`SELECT * FROM blogs WHERE  id = $1 or title_en = $1 or title_ka = $1`, [blog]).then(
		(res) => res.rows[0]
	);
}

export async function deleteBlog({ id }: { id: string }) {
	await query(`DELETE FROM blogs WHERE id = $1`, [id]);
}

export async function insertBlog({
	id,
	title_en,
	title_ka,
	content_en,
	content_ka
}: {
	id: string;
	title_en: string;
	title_ka: string;
	content_en: string;
	content_ka: string;
}) {
	await query(
		`INSERT INTO blogs(id,title_en, title_ka, content_en, content_ka) VALUES($1,$2,$3,$4,$5)`,
		[id, title_en, title_ka, content_en, content_ka]
	);
}

export async function updateBlog({
	id,
	title_en,
	title_ka,
	content_en,
	content_ka
}: {
	id: string;
	title_en: string;
	title_ka: string;
	content_en: string;
	content_ka: string;
}) {
	await query(
		`UPDATE blogs SET title_en = $1, title_ka = $2 , content_en = $3 , content_ka = $4 WHERE id = $5`,
		[title_en, title_ka, content_en, content_ka, id]
	);
}

export async function getData() {
	let resp: any = await query(
		`SELECT * FROM categories ORDER BY created_at ASC;
		SELECT * FROM products ORDER BY created_at ASC;`
	);
	return {
		categories: resp[0].rows,
		products: resp[1].rows
	};
}
