import firstCharacterUpperCase from './utils';

function getMethodName(str) {
	return `on${firstCharacterUpperCase(str)}`;
}

export default class DomListener {
	constructor($root, listeners = []) {
		this.$root = $root;
		this.listeners = listeners;
	}

	initDomListeners() {
		this.listeners.forEach(listener => {
			const method = getMethodName(listener);
			if (!this[method]) {
				throw new Error(`method ${method} is not defined in ${this.nameComponent}!`);
			}

			this[method] = this[method].bind(this);
			this.$root.on(listener, this[method]);
		});
	}

	removeDomListeners() {
		this.listeners.forEach(listener => {
			const method = getMethodName(listener);
			this.$root.off(listener, this[method]);
		});
	}
}
