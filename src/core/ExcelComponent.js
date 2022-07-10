import DomListener from './DomListener';

export default class ExcelComponent extends DomListener {
	constructor($root, property = {}) {
		super($root, property.listeners);
		this.nameComponent = property.name;
	}

	static toHTML() {
		return '';
	}

	init() {
		this.initDomListeners();
	}

	destroy() {
		this.removeDomListeners();
	}
}
