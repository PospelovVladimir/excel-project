import ExcelComponent from '../../core/ExcelComponent';
import generateTableHTML from './table.template';
import resizeHandler from './table.resize';
import shouldResize from './table.functions';

export default class Table extends ExcelComponent {
	static element = 'div';

	static className = 'table';

	static attributes = {
		'data-table': '',
	};

	constructor($root) {
		super($root, {
			name: 'table',
			listeners: ['mousedown'],
		});
	}

	static toHTML() {
		return generateTableHTML(56, 20);
	}

	onMousedown(e) {
		if (shouldResize(e)) {
			resizeHandler(e);
			console.log(this);
		}
	}
}
