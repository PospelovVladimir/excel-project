import { DEFAULT_STYLES_TOOLBAR } from '../../constants';

import $ from '../../core/dom';
import ExcelStateComponent from '../../core/ExcelStateComponent';
import isBtn from './toolbar.functions';
import createToolbar from './toolbar.template';

export default class Toolbar extends ExcelStateComponent {
	static element = 'div';

	static className = 'toolbar';

	constructor($root, options) {
		super($root, {
			name: 'toolbar',
			listeners: ['click'],
			subscribersStore: ['currentStyleCell'],
			...options,
		});
	}

	prepare() {
		this.initState(DEFAULT_STYLES_TOOLBAR);
	}

	changeState(changes) {
		this.setState(changes.currentStyleCell);
	}

	onClick(e) {
		if (isBtn(e)) {
			const $btn = $(e.target).closest('[data-format]');
			const value = JSON.parse($btn.dataset.value);

			this.$emit('toolbar:applyStyle', { ...value });
		}
	}

	get template() {
		return createToolbar(this.state);
	}

	toHTML() {
		return this.template;
	}
}
