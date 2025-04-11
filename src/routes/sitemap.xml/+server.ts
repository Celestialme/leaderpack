import { getBlogs, getCategories, getProducts } from '@src/db';
import '@src/utils';
export async function GET() {
	let baseUrl = 'https://leaderpack.ge';
	let blogs = (await getBlogs({ sitemap: true })) as { title_en: string; title_ka: string }[];
	let categories = (await getCategories({ sitemap: true })) as {
		id: string;
		title_en: string;
		title_ka: string;
	}[];
	let products = (await getProducts({ all: true, sitemap: true })) as {
		category_id: string;
		title_en: string;
		title_ka: string;
	}[];
	const urls = [
		'/ka',
		'/en',
		'/ka/about',
		'/en/about',
		'/ka/contact',
		'/en/contact',
		'/ka/blog',
		'/en/blog'
	];
	for (let blog of blogs) {
		urls.push(`/en/blog/${blog.title_en.intoSlug()}`);
		urls.push(`/ka/blog/${blog.title_ka.intoSlug()}`);
	}
	for (let category of categories) {
		urls.push(`/en/products/${category.title_en.intoSlug()}`);
		urls.push(`/ka/products/${category.title_ka.intoSlug()}`);
	}
	for (let product of products) {
		let category = categories.find((x) => x.id == product.category_id) as {
			title_en: string;
			title_ka: string;
		};
		urls.push(`/en/products/${category.title_en.intoSlug()}/${product.title_en.intoSlug()}`);
		urls.push(`/ka/products/${category.title_ka.intoSlug()}/${product.title_ka.intoSlug()}`);
	}
	const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${urls
					.map(
						(url) => `
            <url>
                <loc>${baseUrl}${url}</loc>
                <lastmod>${new Date().toISOString()}</lastmod>
                <changefreq>weekly</changefreq>
                <priority>0.8</priority>
            </url>
        `
					)
					.join('')}
    </urlset>`;
	return new Response(sitemap, {
		headers: {
			'Content-Type': 'application/xml'
		}
	});
}
