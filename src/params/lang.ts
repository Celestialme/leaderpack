export function match(value): value is 'en' | 'ka' {
	return ['en', 'ka'].includes(value);
}
