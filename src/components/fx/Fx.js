import $ from '../../core/dom';
import ExcelComponent from '../../core/ExcelComponent';

export default class Fx extends ExcelComponent {
	static element = 'div';

	static className = 'fx';

	constructor($root, options) {
		super($root, {
			name: 'Fx',
			listeners: ['input', 'keydown'],
			...options,
		});
	}

	init() {
		super.init();
		const fxInput = this.$root.find('[data-fx-input]');

		this.$subscribe('table:input', data => {
			fxInput.value(data);
		});

		this.$subscribe('table:keydown', data => {
			fxInput.value(data);
		});

		this.$subscribe('table:mousedown', data => {
			fxInput.value(data);
		});
	}

	onInput(e) {
		this.$emit('fx:input', $(e.target).value());
	}

	onKeydown(e) {
		const key = ['Enter', 'Tab'];
		// Можно дописать более сильную логику
		// разбить нажатия на ентер, таб, или шифт таб, и сделать два события 'fx:done-right' 'fx:done-left' 'fx:done-bottom'
		if (key.includes(e.key)) {
			e.preventDefault();
			this.$emit('fx:done');
		}
	}

	static toHTML() {
		return `
		<span class="fx__ico material-icons">
			functions
		</span>
		<input class="fx__input" data-fx-input type="text" name="" />`;
	}
}
