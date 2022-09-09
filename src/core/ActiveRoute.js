export default class ActiveRoute {
	static get path() {
		return window.location.hash.slice(1).split('/')[0];
	}

	static get param() {
		return window.location.hash.slice(1).split('/')[1];
	}

	static navigation(path) {
		window.location.replace(path);
	}
}
