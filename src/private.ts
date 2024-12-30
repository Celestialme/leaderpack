import { ADMIN_PASSWORD } from '$env/static/private';
import crypto from 'crypto';

export const ADMIN_PASSWORD_HASH = crypto
	.createHash('sha256')
	.update(ADMIN_PASSWORD)
	.digest('hex')
	.slice(0, 16);
