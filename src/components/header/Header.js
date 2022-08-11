import ExcelComponent from '../../core/ExcelComponent';

export default class Header extends ExcelComponent {
	static element = 'div';

	static className = 'header';

	constructor($root, options) {
		super($root, {
			name: 'header',
			listeners: [],
			...options,
		});
	}

	static toHTML() {
		return `
		<input type="text" class="header__input" value="Название таблицы" />
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
