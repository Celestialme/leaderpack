import { ADMIN_PASSWORD_HASH } from '@src/private';
import { error } from '@sveltejs/kit';
import crypto from 'crypto';
export const actions = {
	login: async ({ request, cookies }) => {
		let data = await request.formData();
		let password = data.get('password') as string;
		let hash_password = crypto.createHash('sha256').update(password).digest('hex').slice(0, 16);
		if (hash_password != ADMIN_PASSWORD_HASH) {
			throw error(401, 'Wrong password');
		}
		cookies.set('session', hash_password, {
			path: '/',
			httpOnly: false,
			sameSite: 'lax',
			expires: new Date(Date.now() + 60 * 60 * 24 * 1000)
		});
		return {};
	}
};
