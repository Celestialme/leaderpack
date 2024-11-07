import { redirect, type Handle } from '@sveltejs/kit';
import { init_db } from './db';

import { ADMIN_PASSWORD_HASH } from './private';
init_db();
export let handle: Handle = async function ({ event, resolve }) {
	if (event.url.pathname === '/') {
		throw redirect(302, '/en');
	}

	if (event.url.pathname.startsWith('/admin') || event.request.method != 'GET') {
		let session = event.cookies.get('session');
		if (session != ADMIN_PASSWORD_HASH) {
			if (event.request.method != 'GET' && !event.url.pathname.startsWith('/admin/login')) {
				return new Response('Unauthorized', {
					status: 401
				});
			} else if (!event.url.pathname.startsWith('/admin/login')) {
				throw redirect(302, '/admin/login');
			}
		} else if (event.url.pathname.startsWith('/admin/login')) {
			throw redirect(302, '/admin');
		}
	}
	const response = await resolve(event);
	return response;
};
