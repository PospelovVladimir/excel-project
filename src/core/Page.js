export default class Page {
	constructor(options) {
		this.repository = options.repository;
	}

	getRoot() {
		throw new Error('Rewrite method getRoot!');
	}

	afterRender() {}

	destroy() {}
}
