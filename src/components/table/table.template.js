import { DEFAULT_STYLES_TOOLBAR } from '../../constants';

import { decamelize } from '../../core/utils';

function getWidth(columnState, i) {
	if (!columnState) return '';
	return Object.prototype.hasOwnProperty.call(columnState, i) ? `width:${columnState[i]}px;` : ``;
}

function getHeight(rowState, i) {
	if (!rowState) return '';
	return Object.prototype.hasOwnProperty.call(rowState, i) ? `height:${rowState[i]}px;` : ``;
}

function getDataCell(cellState, row, column) {
	if (!cellState) return '';
	const cellId = `${row}:${column}`;
	return Object.prototype.hasOwnProperty.call(cellState, cellId) ? cellState[cellId].text : ``;
}

function stylesFormat(styles) {
	return Object.keys(styles)
		.map(key => `${decamelize(key, '-')}:${styles[key]}`)
		.join(';');
}

function getStyles(cellState, row, column) {
	if (!cellState) return '';
	const cellId = `${row}:${column}`;

	if (Object.prototype.hasOwnProperty.call(cellState, cellId)) {
		return `${stylesFormat({ ...DEFAULT_STYLES_TOOLBAR, ...cellState[cellId].styles })}`;
	}

	return `${stylesFormat(DEFAULT_STYLES_TOOLBAR)}`;
}

function getFormula(cellState, row, column) {
	if (!cellState) return '';
	const cellId = `${row}:${column}`;

	if (Object.prototype.hasOwnProperty.call(cellState, cellId) && cellState[cellId].formulaText) {
		return `data-value="${cellState[cellId].formulaText}"`;
	}

	return ``;
}

function generateTableHeader(countColumn, columnState = {}) {
	const min = 65; // A
	const max = 90; // Z
	let headers = '';
	let minCalculate = min;
	let count = 1;

	for (let i = 1; i <= countColumn; i += 1) {
		if (minCalculate > max) {
			minCalculate = min;
			count += 1;
		}

		headers += `
		<div class="table__row-column table__row-column--header" data-master-cell-type="column" data-master-cell-id="${i}" style="${getWidth(columnState, i)}">
			<span class="table__row-column-text">${String.fromCharCode(minCalculate).repeat(count)}</span>
			<i class="table__row-column-resize-controll" data-btn-resize-controll="column"></i>
		</div>`;

		minCalculate += 1;
	}

	return headers;
}

function generateTableCell(countColumn, numberRow, state = {}) {
	let cell = '';

	for (let i = 1; i <= countColumn; i += 1) {
		cell += `<div 
		class="table__row-column" 
		data-cell="cell" 
		data-row-id="${numberRow}" 
		data-column-id="${i}" 
		contenteditable
		${getFormula(state.cellState, numberRow, i)}
		style="${getWidth(state.columnState, i)}${getStyles(state.cellState, numberRow, i)}"
		>${getDataCell(state.cellState, numberRow, i)}</div>`;
	}
	return cell;
}

export default function createTable(countColumn = 10, countRow = 20, state = {}) {
	let row = '';

	for (let i = 1; i <= countRow; i += 1) {
		row += ` <div class="table__row" style="${getHeight(state.rowState, i)}">
			<div class="table__row-info" data-master-cell-type="row" data-master-cell-id="${i}">
				<span class="table__row-info-text">${i}</span>
				<i class="table__row-info-resize-controll" data-btn-resize-controll="row"></i></div>
			<div class="table__row-data">
				${generateTableCell(countColumn, i, state)}
			</div>
		</div>
		`;
	}

	return `
		<div class="table__row">
			<div class="table__row-info table__row-info--master" data-test="1"></div>
			<div class="table__row-data">
				${generateTableHeader(countColumn, state.columnState)}
			</div>
		</div> 
		${row}`;
}
