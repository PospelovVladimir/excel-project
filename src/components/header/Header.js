import $ from '../../core/dom';
import ExcelComponent from '../../core/ExcelComponent';
import { changeTableName } from '../../redux/actions';
import { isInput, isBtn } from './header.functions';
import { DEFAULT_TABLE_NAME } from '../../constants';
import ActiveRoute from '../../core/ActiveRoute';
import { locStorageDeleteItemByKey } from '../../core/utils';

export default class Header extends ExcelComponent {
	static element = 'div';

	static className = 'header';

	constructor($root, options) {
		super($root, {
			name: 'header',
			listeners: ['input', 'click'],
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

	onClick(e) {
		if (isBtn(e)) {
			const $target = $(e.target);

			if ($target.dataset.btn === 'delete-current-table') {
				locStorageDeleteItemByKey(`excel:${ActiveRoute.param}`);
				ActiveRoute.navigation('#showcase');
			}

			if ($target.dataset.btn === 'logout') {
				ActiveRoute.navigation('#showcase');
			}
		}
	}

	toHTML() {
		return `
		<input type="text" class="header__input" placeholder="Название таблицы" data-input="table-name"/>
		<div class="header__controll">
			<div class="header__btn header__btn--delete">
				<i class="material-icons" data-btn="delete-current-table">delete</i>
			</div>
			<div class="header__btn">
				<i class="material-icons" data-btn="logout">logout</i>
			</div>
		</div>`;
	}
}
