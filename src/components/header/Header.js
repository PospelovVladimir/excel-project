import $ from '../../core/dom';
import ExcelComponent from '../../core/ExcelComponent';
import { changeTableName } from '../../redux/actions';
import isInput from './header.functions';
import { DEFAULT_TABLE_NAME } from '../../constants';

export default class Header extends ExcelComponent {
	static element = 'div';

	static className = 'header';

	constructor($root, options) {
		super($root, {
			name: 'header',
			listeners: ['input'],
			...options,
		});
	}

	init() {
		super.init();
		const $input = this.$root.find('[data-input="table-name"]');
		const tableName = this.store.getState().tableName || DEFAULT_TABLE_NAME;
		$input.value(tableName);
	}

	onInput(e) {
		if (isInput(e)) {
			const $input = $(e.target);
			this.$dispatch(changeTableName({ text: $input.value() }));
		}
	}

	toHTML() {
		return `
		<input type="text" class="header__input" placeholder="Название таблицы" data-input="table-name"/>
		<div class="header__controll">
			<div class="header__btn header__btn--delete">
				<span class="material-icons">delete</span>
			</div>
			<div class="header__btn">
				<span class="material-icons">logout</span>
			</div>
		</div>`;
	}
}
