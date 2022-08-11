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
