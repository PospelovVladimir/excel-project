import ExcelComponent from '../../core/ExcelComponent';
import generateTableHTML from './table.template';
import resizeHandler from './table.resize';
import { shouldResize, isCell, matrix, getSelectorAdjacentCell } from './table.functions';
import TableSelection from './TableSelection';
import $ from '../../core/dom';

export default class Table extends ExcelComponent {
	static element = 'div';

	static className = 'table';

	static attributes = {
		'data-table': '',
	};

	constructor($root, options) {
		super($root, {
			name: 'table',
			listeners: ['mousedown', 'keydown', 'input'],
			...options,
		});
	}

	static toHTML() {
		return generateTableHTML(56, 20);
	}

	prepare() {
		this.selection = new TableSelection();
	}

	init() {
		super.init();
		const $cell = this.$root.find('[data-row-id="1"][data-column-id="1"]');
		
		$cell.setFocus();
		this.selection.select($cell);
		this.$emit('table:keydown', $cell.text());

		this.$subscribe('fx:input', data => {
			this.selection.getFirstCell().text(data);
		});

		this.$subscribe('fx:done', () => {
			this.selection.getFirstCell().setFocus();
		});
	}

	onMousedown(e) {
		if (shouldResize(e)) {
			resizeHandler(e);
		}

		if (isCell(e)) {
			const $cell = $(e.target);

			if (e.shiftKey) {
				const $prev = this.selection.getFirstCell();
				this.selection.cleanAllCells();
				this.selection.select($prev);
				const $filteredCells = matrix($prev, $cell).map(data => this.$root.find(data));

				this.selection.selectGroup($filteredCells);
			} else if (e.ctrlKey && TableSelection.hasSelected($cell)) {
				if (!this.selection.hasSelectedOne()) {
					this.selection.unSelect($cell);
				}
			} else if (e.ctrlKey && !TableSelection.hasSelected($cell)) {
				this.selection.select($cell);
			} else {
				this.selection.cleanAllCells();
				this.selection.select($cell);
			}

			this.$emit('table:mousedown', $cell.text());
		}
	}

	onKeydown(e) {
		const keys = ['Tab', 'Shift', 'ArrowRight', 'ArrowLeft', 'ArrowDown', 'ArrowUp', 'Enter'];
		if (keys.includes(e.key)) {
			const $current = $(e.target);
			const rowId = +$current.dataset.rowId;
			const columnId = +$current.dataset.columnId;
			const $cell = this.$root.find(getSelectorAdjacentCell(e, columnId, rowId));

			if (!$cell.hasElement()) return;

			if (!e.shiftKey) {
				e.preventDefault();
				this.selection.cleanAllCells();
				$cell.setFocus();
				this.selection.select($cell);
			} else if (e.shiftKey && e.key === 'Tab') {
				this.selection.cleanAllCells();
				this.selection.select($cell);
			}

			this.$emit('table:keydown', $cell.text());
		}
	}

	onInput(e) {
		if (isCell(e)) {
			this.$emit('table:input', $(e.target).text());
		}
	}
}
