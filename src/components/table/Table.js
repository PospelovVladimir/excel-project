import ExcelComponent from '../../core/ExcelComponent';
import generateTableHTML from './table.template';

export default class Table extends ExcelComponent {
	static element = 'div';

	static className = 'table';

	static toHTML() {
		return generateTableHTML(56, 20);
	}
}
