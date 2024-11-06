import crypto from 'crypto';
const ADMIN_PASSWORD = 'admin';
export const ADMIN_PASSWORD_HASH = crypto
	.createHash('sha256')
	.update(ADMIN_PASSWORD)
	.digest('hex')
	.slice(0, 16);
