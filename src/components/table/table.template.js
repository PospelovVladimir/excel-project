function generateTableHeader(countColumn) {
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

		headers += `<div class="table__row-column table__row-column--header">${String.fromCharCode(minCalculate).repeat(count)}</div>`;
		minCalculate += 1;
	}

	return headers;
}

function genearateTableCell(countColumn, numberRow) {
	let cell = '';

	for (let i = 1; i <= countColumn; i += 1) {
		cell += `<div class="table__row-column" contenteditable data-row="${numberRow}" data-column="${i}"></div>`;
	}
	return cell;
}

export default function generateTableHTML(countColumn = 10, countRow = 20) {
	let row = '';

	for (let i = 1; i <= countRow; i += 1) {
		row += ` <div class="table__row">
			<div class="table__row-info">${i}</div>
			<div class="table__row-data">
				${genearateTableCell(countColumn, i)}
			</div>
		</div>
		`;
	}

	return `
		<div class="table__row">
			<div class="table__row-info table__row-info--master"></div>
			<div class="table__row-data">
				${generateTableHeader(countColumn)}
			</div>
		</div> 
		${row}`;
}
