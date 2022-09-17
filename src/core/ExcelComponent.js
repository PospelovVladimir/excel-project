import DomListener from './DomListener';

export default class ExcelComponent extends DomListener {
	constructor($root, property = {}) {
		super($root, property.listeners);
		this.nameComponent = property.name;
		this.emitter = property.emitter;
		this.store = property.store;
		this.subscribersStore = property.subscribersStore || [];
		this.unsubscribes = [];
		this.repository = property.repository;

		this.prepare();
	}

	toHTML() {
		return '';
	}

	prepare() {}

	changeState() {}

	isWatching(key) {
		return this.subscribersStore.includes(key);
	}

	$dispatch(action) {
		this.store.dispatch(action);
	}

	$on(event, fn) {
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
