import ExcelComponent from '../../core/ExcelComponent';

export default class Fx extends ExcelComponent {
	static element = 'div';

	static className = 'fx';

	constructor($root) {
		super($root, {
			name: 'Fx',
			listeners: ['input'],
		});
	}

	onInput() {
		console.dir(this);
		console.dir('Fx onInput yes');
	}

	onClick() {
		console.dir(this);
		console.log('Fx onClick yes');
	}

	static toHTML() {
		return `
		<span class="fx__ico material-icons">
			functions
		</span>
		<input class="fx__input" type="text" name="" />`;
	}
}
