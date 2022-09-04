import $ from '../../core/dom';
import ExcelComponent from '../../core/ExcelComponent';

export default class Fx extends ExcelComponent {
	static element = 'div';

	static className = 'fx';

	constructor($root, options) {
		super($root, {
			name: 'Fx',
			listeners: ['input', 'keydown'],
			subscribersStore: ['stateCurrentCell'],
			...options,
		});
	}

	init() {
		super.init();
		this.$fxInput = this.$root.find('[data-fx-input]');

		this.$on('table:keydown', data => {
			this.$fxInput.value(data);
		});

		this.$on('table:mousedown', data => {
			this.$fxInput.value(data);
		});
	}

	changeState({ stateCurrentCell }) {
		this.$fxInput.value(stateCurrentCell.formulaText || stateCurrentCell.text);
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

	toHTML() {
		return `
		<span class="fx__ico material-icons">
			functions
		</span>
		<input class="fx__input" data-fx-input type="text" name="" />`;
	}
}
