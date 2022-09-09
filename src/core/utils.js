export default function firstCharacterUpperCase(str = '') {
	if (typeof str !== 'string') {
		return '';
	}
	return `${str.charAt(0).toUpperCase()}${str.slice(1)}`;
}

export function range(start, end) {
	let localStart = start;
	let localEnd = end;

	if (localStart > localEnd) {
		[localEnd, localStart] = [localStart, localEnd];
	}

	return new Array(localEnd - localStart + 1).fill('').map((_, i) => localStart + i);
}

export function locStorage(key, data = null) {
	if (data) {
		localStorage.setItem(key, JSON.stringify(data));
		return true;
	}

	return JSON.parse(localStorage.getItem(key));
}

export function locStorageDeleteItemByKey(key) {
	return localStorage.removeItem(key);
}

export function isEqual(a, b) {
	if (typeof a === 'object' && typeof b === 'object') {
		return JSON.stringify(a) === JSON.stringify(b);
	}
	return a === b;
}

export function camelize(text) {
	return text.replace(/^([A-Z])|[\s-_]+(\w)/g, (match, p1, p2) => {
		if (p2) return p2.toUpperCase();
		return p1.toLowerCase();
	});
}

export function decamelize(str, separator) {
	const calculateSeparator = typeof separator === 'undefined' ? '_' : separator;

	return str
		.replace(/([a-z\d])([A-Z])/g, `$1${calculateSeparator}$2`)
		.replace(/([A-Z]+)([A-Z][a-z\d]+)/g, `$1${calculateSeparator}$2`)
		.toLowerCase();
}

export function debounce(fn, ms) {
	let timeout = false;
	// eslint-disable-next-line
	return function (...args) {
		if (timeout) return false;

		fn.apply(this, args);
		timeout = true;

		setTimeout(() => {
			timeout = false;
		}, ms);
		return true;
	};
}
