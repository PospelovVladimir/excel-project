import {
	CHANGE_DATA_CELL,
	CHANGE_LAST_MODIFIED_DATE,
	CHANGE_STYLES_CELL,
	CHANGE_STYLE_CURRENT_CELL,
	CHANGE_TABLE_NAME,
	COLUMN_RESIZE,
	ROW_RESIZE,
} from './types';

export function tableColumnResize(data) {
	return {
		type: COLUMN_RESIZE,
		data,
	};
}

export function tableRowResize(data) {
	return {
		type: ROW_RESIZE,
		data,
	};
}

export function tableCellChangeData(data) {
	return {
		type: CHANGE_DATA_CELL,
		data,
	};
}

export function tableCellChangeStyles(data) {
	return {
		type: CHANGE_STYLES_CELL,
		data,
	};
}

export function tableCellChangeStylesCurrentCell(data) {
	return {
		type: CHANGE_STYLE_CURRENT_CELL,
		data,
	};
}

export function changeTableName(data) {
	return {
		type: CHANGE_TABLE_NAME,
		data,
	};
}

export function changeLastModifiedDate(data) {
	return {
		type: CHANGE_LAST_MODIFIED_DATE,
		data,
	};
}
