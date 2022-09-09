export default class Page {
	constructor(params) {
		this.params = params;
	}

	getRoot() {
		throw new Error('Rewrite method getRoot!');
	}

	afterRender() {}

	destroy() {}
}
