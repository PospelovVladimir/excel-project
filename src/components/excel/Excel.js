import $ from '../../core/dom';
import Emitter from '../../core/Emitter';
import SubscriberStore from '../../core/SubscriberStore';
import { changeLastModifiedDate } from '../../redux/actions';

export default class Excel {
	static element = 'div';

	static className = 'excel';

	constructor(options) {
		this.components = options.components || [];
		this.emitter = new Emitter();
		this.store = options.store;
		this.subscriberStore = new SubscriberStore(this.store);
		this.repository = options.repository;
	}

	// собрать корневой элемент со внутренними компонентами
	getRoot() {
		const root = $.create(Excel.element, Excel.className);

		const componentOptions = {
			emitter: this.emitter,
			store: this.store,
			repository: this.repository,
		};

		this.components = this.components.map(Component => {
			const componentRoot = $.create(Component.element, Component.className, Component.attributes);
			const instanceComponent = new Component(componentRoot, componentOptions);
			componentRoot.html(instanceComponent.toHTML());
			root.append(componentRoot);

			// const comp = new Component(componentRoot);
			// window[`ccc${comp.nameComponent}`] = comp;

			// return new Component(componentRoot, componentOptions);
			return instanceComponent;
		});

		return root;
	}

	init() {
		this.subscriberStore.subscribeComponents(this.components);
		this.components.forEach(component => {
			component.init();
		});
		// dispatch change last modified date, in state
		this.store.dispatch(changeLastModifiedDate(new Date().toLocaleString()));
	}

	destroy() {
		this.subscriberStore.unsubscribeFromStore();
		this.components.forEach(component => component.destroy());
	}
}
