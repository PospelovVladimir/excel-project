import $ from '../../core/dom';
import ExcelComponent from '../../core/ExcelComponent';

export default class Excel extends ExcelComponent {
	static element = 'div';

	static className = 'excel';

	constructor(selector, options) {
		super();
		this.$el = $(selector);
		this.components = options.components || [];
	}

	// собрать корневой элемент со внутренними компонентами
	getRoot() {
		const root = $.create(Excel.element, Excel.className);

		this.components = this.components.map(Component => {
			const componentRoot = $.create(Component.element, Component.className, Component.attributes);
			componentRoot.html(Component.toHTML());
			root.append(componentRoot);

			// const comp = new Component(componentRoot);
			// window[`ccc${comp.nameComponent}`] = comp;

			// return comp;
			return new Component(componentRoot);
		});

		return root;
	}

	render() {
		this.$el.append(this.getRoot());
		this.components.forEach(component => {
			component.init();
		});
	}
}
