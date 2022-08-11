import DomListener from './DomListener';

export default class ExcelComponent extends DomListener {
	constructor($root, property = {}) {
		super($root, property.listeners);
		this.nameComponent = property.name;
		this.emitter = property.emitter;
		this.unsubscribes = [];

		this.prepare();
	}

	static toHTML() {
		return '';
	}

	prepare() {
		return this;
	}

	$subscribe(event, fn) {
		const unsubscribe = this.emitter.subscribe(event, fn);
		this.unsubscribes.push(unsubscribe);
	}

	$emit(event, data) {
		this.emitter.emit(event, data);
	}

	init() {
		this.initDomListeners();
	}

	destroy() {
		this.removeDomListeners();
		this.unsubscribes.forEach(unsubscribe => unsubscribe());
	}
}
