// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	interface String {
		intoSlug(): string;
		fromSlug(): string;
	}
	var dataLayer: Array<any>;
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
