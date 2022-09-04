export default function parse(value = '') {
	if (!value.startsWith('=') || (value.startsWith('=') && value.length < 3)) return value;
	try {
		// eslint-disable-next-line
		return String(eval(value.slice(1)));
	} catch (e) {
		return value;
	}
}
