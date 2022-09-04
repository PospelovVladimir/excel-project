import { isEqual } from './utils';

export default class SubscriberStore {
	constructor(store) {
		this.store = store;
		this.unsubscribe = null;
		this.prevState = {};
	}

	subscribeComponents(components) {
		this.prevState = this.store.getState();

		this.unsubscribe = this.store.subscribe(state => {
			Object.keys(state).forEach(key => {
				if (!isEqual(this.prevState[key], state[key])) {
					components.forEach(component => {
						if (component.isWatching(key)) {
							const sliceState = {
								[key]: state[key],
							};
							component.changeState(sliceState);
						}
					});
				}
			});
			this.prevState = this.store.getState();
		});
	}

	unsubscribeFromStore() {
		this.unsubscribe.unsubscribe();
	}
}
