export let throttle = (delay: number) => {
	let first = true;
	let timer: any;
	return (fn: () => void) => {
		if (first) {
			fn();
			first = false;
			return;
		}
		if (timer) return;
		timer = setTimeout(() => {
			fn();
			timer = undefined;
		}, delay);
	};
};

if (!String.prototype.intoSlug) {
	String.prototype.intoSlug = function (this: string): string {
		console.log(this);
		return this.replace(/\s+/g, '_');
	};
}
