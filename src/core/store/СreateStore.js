export default class CreateStore {
	constructor(rootReducer, state = {}) {
		this.reducer = rootReducer;
		this.state = this.reducer({ ...state }, { type: '__INIT__' });
		this.subscribers = [];
	}

	subscribe(fx) {
		this.subscribers.push(fx);
		const context = this;
		return {
			unsubscribe() {
				context.subscribers = context.subscribers.filter(subscriber => subscriber !== fx);
			},
		};
	}

	dispatch(action) {
		this.state = this.reducer(this.state, action);
		this.subscribers.forEach(subscriber => subscriber(this.state));
	}

	getState() {
		return this.state;
	}
}
