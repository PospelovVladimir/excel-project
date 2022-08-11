export default class Emitter {
	constructor() {
		this.listeners = {};
	}

	subscribe(event, fn) {
		this.listeners[event] = this.listeners[event] || [];
		this.listeners[event].push(fn);

		return () => {
			this.listeners[event] = this.listeners[event].filter(listener => listener !== fn);
		};
	}

	emit(event, ...data) {
		if (!Array.isArray(this.listeners[event])) return false;
		this.listeners[event].forEach(listener => listener(...data));
		return true;
	}
}
