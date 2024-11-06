import sqlite3 from 'sqlite3';
const db = new sqlite3.Database('./db.db');
import crypto from 'crypto';
import type { Blog, Category, Product, UploadedImage } from './types';
import imageKit, { deleteImage } from './imagekit';

export function init_db() {
	db.exec(`CREATE TABLE IF NOT EXISTS blogs (
	id TEXT PRIMARY KEY ,
	title_en TEXT NOT NULL,
	title_ka TEXT NOT NULL,
	content_en TEXT NOT NULL,
	content_ka TEXT NOT NULL
)`);

	db.exec(`CREATE TABLE IF NOT EXISTS categories (
    id TEXT PRIMARY KEY ,
	title_en TEXT NOT NULL,
    title_ka TEXT NOT NULL,
	imageURL TEXT NOT NULL
);`);

	db.exec(`CREATE TABLE IF NOT EXISTS products (
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
	relatedProducts TEXT,
	images TEXT NOT NULL
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
	await new Promise<void>((resolve, reject) => {
		db.run(
			`INSERT INTO categories(id, title_en, title_ka, imageURL) VALUES(?,?,?,?)`,
			[id, title_en, title_ka, imageURL],
			(err) => {
				if (err) {
					reject(err);
				} else {
					resolve();
				}
			}
		);
	});
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
	await new Promise<void>((resolve, reject) => {
		db.run(
			`UPDATE categories SET title_en = ?, title_ka = ? , imageURL = ? WHERE id = ?`,
			[title_en, title_ka, imageURL, id],
			(err) => {
				if (err) {
					reject(err);
				} else {
					resolve();
				}
			}
		);
	});
}
export async function deleteCategory({ id }: { id: string }) {
	db.run(`DELETE FROM products WHERE category_id = ?`, [id]);
	await new Promise<void>((resolve, reject) => {
		db.run(`DELETE FROM categories WHERE id = ?`, [id], (err) => {
			if (err) {
				reject(err);
			} else {
				resolve();
			}
		});
	});
	await imageKit.deleteFolder(`LeaderPack/${id}`);
}
export function getCategories() {
	return new Promise<Category[]>((resolve, reject) => {
		db.all(`SELECT * FROM categories`, (err, rows) => {
			if (err) {
				reject(err);
			} else {
				resolve(rows as Category[]);
			}
		});
	});
}
export function getCategory({ id }: { id: string }) {
	return new Promise<Category>((resolve, reject) => {
		db.get(`SELECT * FROM categories WHERE id = ?`, [id], (err, row) => {
			if (err) {
				reject(err);
			} else {
				resolve(row as Category);
			}
		});
	});
}
export async function insertProduct(params: Product) {
	await new Promise<void>((resolve, reject) => {
		db.run(
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
				 relatedProducts,
				 images
				 ) 
				 VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
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
			],
			(err) => {
				if (err) {
					reject(err);
				} else {
					resolve();
				}
			}
		);
	});
}

export async function updateProduct(params: Product) {
	await new Promise<void>((resolve, reject) => {
		db.run(
			`
			UPDATE products SET 
			category_id = ?, 
			title_en = ?, 
			title_ka = ?, 
			description_en = ?, 
			description_ka = ?, 
			material_en = ?, 
			material_ka = ?, 
			sizes_en = ?, 
			sizes_ka = ?,
			colors_en = ?,
			colors_ka = ?, 
			options_en = ?,
			options_ka = ?, 
			details_en = ?,
			details_ka = ?, 
			branding = ?,
			relatedProducts = ?,
			images = ?
			WHERE id = ?`,
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
			],
			(err) => {
				if (err) {
					reject(err);
				} else {
					resolve();
				}
			}
		);
	});
}

export async function deleteProduct({ id }: { id: string }) {
	let product = await getProduct(id);
	let images: UploadedImage[] = JSON.parse(product.images);
	images.forEach((image) => {
		deleteImage(image.id).catch((err) => console.log(err));
	});
	await new Promise<void>((resolve, reject) => {
		db.run(`DELETE FROM products WHERE id = ?`, [id], (err) => {
			if (err) {
				reject(err);
			} else {
				resolve();
			}
		});
	});
}

export function getProducts(params: { all: true }): any;
export function getProducts(params: { category_id: string }): any;
export function getProducts(params: { category: string }): any;
export function getProducts(params: { category?: string; category_id?: string; all?: true }) {
	if (params?.category_id) {
		return new Promise((resolve, reject) => {
			db.all(`SELECT * FROM products where category_id = ?`, [params.category_id], (err, rows) => {
				if (err) {
					reject(err);
				} else {
					resolve(rows);
				}
			});
		});
	} else if (params?.category) {
		return new Promise((resolve, reject) => {
			db.all(
				`SELECT products.* FROM  categories,products where category_id = categories.id and (categories.title_en = ? or categories.title_ka = ?)`,
				[params.category, params.category],
				(err, rows) => {
					if (err) {
						reject(err);
					} else {
						resolve(rows);
					}
				}
			);
		});
	} else if (params?.all) {
		return new Promise((resolve, reject) => {
			db.all(`SELECT * FROM products`, (err, rows) => {
				if (err) {
					reject(err);
				} else {
					resolve(rows);
				}
			});
		});
	}
}

export async function getProduct(id_title: string) {
	let product: Product = await new Promise<Product>((resolve, reject) => {
		db.get(
			`SELECT * FROM products where id = ? or title_en = ? or title_ka = ?`,
			[id_title, id_title, id_title],
			(err, row) => {
				if (err) {
					reject(err);
				} else {
					resolve(row as Product);
				}
			}
		);
	});
	let ids = product.relatedProducts.split(',');
	let relatedProducts = await getRelatedProducts(ids);
	return { ...product, relatedProducts };
}

export function getRelatedProducts(ids: string[]) {
	return new Promise<Product[]>((resolve, reject) => {
		let idsString = ids.map((id) => `'${id}'`).join(',');
		db.all(
			`SELECT products.*, categories.title_en as category_title_en, categories.title_ka as category_title_ka  FROM categories,products where categories.id = products.category_id AND products.id in (${idsString})`,
			(err, rows) => {
				if (err) {
					reject(err);
				} else {
					resolve(rows as Product[]);
				}
			}
		);
	});
}
export function getBlogs() {
	return new Promise<Blog[]>((resolve, reject) => {
		db.all(`SELECT * FROM blogs`, (err, rows) => {
			if (err) {
				reject(err);
			} else {
				resolve(rows as Blog[]);
			}
		});
	});
}

export function getBlog({ blog }: { blog: string }) {
	return new Promise<Blog>((resolve, reject) => {
		db.get(
			`SELECT * FROM blogs WHERE  id = ? or title_en = ? or title_ka = ?`,
			[blog, blog, blog],
			(err, row) => {
				if (err) {
					reject(err);
				} else {
					resolve(row as Blog);
				}
			}
		);
	});
}

export async function deleteBlog({ id }: { id: string }) {
	await new Promise<void>((resolve, reject) => {
		db.run(`DELETE FROM blogs WHERE id = ?`, [id], (err) => {
			if (err) {
				reject(err);
			} else {
				resolve();
			}
		});
	});
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
	await new Promise<void>((resolve, reject) => {
		db.run(
			`INSERT INTO blogs(id,title_en, title_ka, content_en, content_ka) VALUES(?,?,?,?,?)`,
			[id, title_en, title_ka, content_en, content_ka],
			(err) => {
				if (err) {
					reject(err);
				} else {
					resolve();
				}
			}
		);
	});
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
	await new Promise<void>((resolve, reject) => {
		db.run(
			`UPDATE blogs SET title_en = ?, title_ka = ? , content_en = ? , content_ka = ? WHERE id = ?`,
			[title_en, title_ka, content_en, content_ka, id],
			(err) => {
				if (err) {
					reject(err);
				} else {
					resolve();
				}
			}
		);
	});
}
