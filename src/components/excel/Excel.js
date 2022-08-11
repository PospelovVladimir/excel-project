import $ from '../../core/dom';
import Emitter from '../../core/Emitter';
import ExcelComponent from '../../core/ExcelComponent';

export default class Excel extends ExcelComponent {
	static element = 'div';

	static className = 'excel';

	constructor(selector, options) {
		super();
		this.$el = $(selector);
		this.components = options.components || [];
		this.emitter = new Emitter();
	}

	// собрать корневой элемент со внутренними компонентами
	getRoot() {
		const root = $.create(Excel.element, Excel.className);

		const componentOptions = {
			emitter: this.emitter,
		};

		this.components = this.components.map(Component => {
			const componentRoot = $.create(Component.element, Component.className, Component.attributes);
			componentRoot.html(Component.toHTML());
			root.append(componentRoot);

			// const comp = new Component(componentRoot);
			// window[`ccc${comp.nameComponent}`] = comp;

			return new Component(componentRoot, componentOptions);
		});

		return root;
	}

	render() {
		this.$el.append(this.getRoot());
		this.components.forEach(component => {
			component.init();
		});
	}

	destroy() {
		this.components.forEach(component => component.destroy());
	}
}
