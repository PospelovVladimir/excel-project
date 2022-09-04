import ExcelComponent from './ExcelComponent';

export default class ExcelStateComponent extends ExcelComponent {
	constructor(...args) {
		super(...args);
	}

	get template() {
		return new Error('Override the method to get the template');
	}

	initState(initState = {}) {
		this.state = initState;
	}

	setState(newState = {}) {
		this.state = { ...this.state, ...newState };
		this.$root.html(this.template);
	}
}
