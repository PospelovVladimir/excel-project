import $ from '../../core/dom';
import Emitter from '../../core/Emitter';
import SubscriberStore from '../../core/SubscriberStore';

export default class Excel {
	static element = 'div';

	static className = 'excel';

	constructor(selector, options) {
		this.$el = $(selector);
		this.components = options.components || [];
		this.emitter = new Emitter();
		this.store = options.store;
		this.subscriberStore = new SubscriberStore(this.store);
	}

	// собрать корневой элемент со внутренними компонентами
	getRoot() {
		const root = $.create(Excel.element, Excel.className);

		const componentOptions = {
			emitter: this.emitter,
			store: this.store,
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

	render() {
		this.$el.append(this.getRoot());

		this.subscriberStore.subscribeComponents(this.components);
		this.components.forEach(component => {
			component.init();
		});
	}

	destroy() {
		this.subscriberStore.unsubscribeFromStore();
		this.components.forEach(component => component.destroy());
	}
}
