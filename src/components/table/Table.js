import ExcelComponent from '../../core/ExcelComponent';
import createTable from './table.template';
import resizeHandler from './table.resize';
import { shouldResize, isCell, matrix, getSelectorAdjacentCell } from './table.functions';
import TableSelection from './TableSelection';
import $ from '../../core/dom';
import { COLUMN_RESIZE, ROW_RESIZE } from '../../redux/types';
import * as actions from '../../redux/actions';
import { DEFAULT_STYLES_TOOLBAR } from '../../constants';
import parse from '../../core/parce';

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

	prepare() {
		this.selection = new TableSelection();
	}

	init() {
		super.init();

		const $cell = this.$root.find('[data-row-id="1"][data-column-id="1"]');
		$cell.setFocus();
		this.selection.select($cell);
		this.$emit('table:keydown', $cell.dataset.value);
		this.$dispatch(actions.tableCellChangeStylesCurrentCell($cell.getStyles(Object.keys(DEFAULT_STYLES_TOOLBAR))));

		this.$on('fx:input', cellData => {
			const $firstcell = this.selection.getFirstCell();
			$firstcell.setAttributes({ 'data-value': cellData }).text(parse(cellData));
			this.updateTextCellInStore($firstcell);
		});

		this.$on('fx:done', () => {
			this.selection.getFirstCell().setFocus();
		});

		this.$on('toolbar:applyStyle', styleCell => {
			this.selection.list.forEach($el => {
				if ($el.text()) {
					$el.css(styleCell);
					this.updateStylesCellInStore($el, styleCell);
				}
			});
		});
	}

	onMousedown(e) {
		if (shouldResize(e)) {
			this.tableResize(e);
		}

		if (isCell(e)) {
			const $cell = $(e.target);

			if (e.shiftKey) {
				const $prev = this.selection.getFirstCell();
				this.selection.cleanAllCells();
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

			this.$emit('table:mousedown', $cell.dataset.value || $cell.text());

			const cellStyles = $cell.getStyles(Object.keys(DEFAULT_STYLES_TOOLBAR));
			this.$dispatch(actions.tableCellChangeStylesCurrentCell(cellStyles));
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

			this.$emit('table:keydown', $cell.dataset.value || $cell.text());

			const cellStyles = $cell.getStyles(Object.keys(DEFAULT_STYLES_TOOLBAR));
			this.$dispatch(actions.tableCellChangeStylesCurrentCell(cellStyles));
		}
	}

	onInput(e) {
		if (isCell(e)) {
			const $target = $(e.target);
			const targetParse = parse($target.dataset.value);

			if (targetParse !== $target.text() && $target.hasAttribute('data-value')) {
				$target.removeAttribute('data-value');
			}

			if (targetParse !== $target.text() && !$target.hasAttribute('data-value')) {
				$target.setAttributes({ 'data-value': $target.text() });
				$target.text(parse($target.text()));
			}

			this.updateTextCellInStore($target);
		}
	}

	async tableResize(e) {
		const data = await resizeHandler(e);
		const dataType = `${data.parentType.toUpperCase()}_RESIZE`;
		if (dataType === COLUMN_RESIZE) {
			this.$dispatch(actions.tableColumnResize(data));
		} else if (dataType === ROW_RESIZE) {
			this.$dispatch(actions.tableRowResize(data));
		}
	}

	updateStylesCellInStore($cell, currentStyleCell) {
		this.$dispatch(
			actions.tableCellChangeStyles({
				id: `${$cell.dataset.rowId}:${$cell.dataset.columnId}`,
				styles: {
					...currentStyleCell,
				},
			})
		);
	}

	updateTextCellInStore($cell) {
		this.$dispatch(
			actions.tableCellChangeData({
				id: `${$cell.dataset.rowId}:${$cell.dataset.columnId}`,
				text: $cell.text(),
				formulaText: $cell.dataset.value,
			})
		);
	}

	toHTML() {
		return createTable(56, 20, this.store.getState());
	}
}
