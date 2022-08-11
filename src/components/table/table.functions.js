import { range } from '../../core/utils';

export function shouldResize(e) {
	return e.target.dataset.btnResizeControll;
}

export function isCell(e) {
	return e.target.dataset.cell;
}

export function matrix($prev, $current) {
	const column = range(+$current.dataset.columnId, +$prev.dataset.columnId); // [4]
	const row = range(+$current.dataset.rowId, +$prev.dataset.rowId); // [1,2]

	return row.reduce((acc, r) => {
		column.forEach(c => {
			acc.push(`[data-row-id="${r}"][data-column-id="${c}"]`);
		});
		return acc;
	}, []);
}

export function getSelectorAdjacentCell(e, column, row) {
	let columnId = column;
	let rowId = row;

	switch (e.key) {
		case 'Tab':
			if (!e.shiftKey) {
				columnId += 1;
			} else if (e.shiftKey) {
				columnId -= 1;
			}
			break;
		case 'ArrowRight':
			columnId += 1;
			break;
		case 'ArrowLeft':
			columnId -= 1;
			break;
		case 'Enter':
		case 'ArrowDown':
			rowId += 1;
			break;
		case 'ArrowUp':
			rowId -= 1;
			break;
		default:
			break;
	}
	return `[data-row-id="${rowId}"][data-column-id="${columnId}"]`;
}
