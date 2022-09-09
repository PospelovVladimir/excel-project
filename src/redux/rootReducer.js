import {
	COLUMN_RESIZE,
	ROW_RESIZE,
	CHANGE_DATA_CELL,
	CHANGE_STYLES_CELL,
	CHANGE_STYLE_CURRENT_CELL,
	CHANGE_TABLE_NAME,
	CHANGE_LAST_MODIFIED_DATE,
} from './types';

export default function rootReducer(state, action = {}) {
	switch (action.type) {
		case '__INIT__':
			return {
				...state,
				init: true,
			};
		case COLUMN_RESIZE:
			return {
				...state,
				columnState: {
					...state.columnState,
					[action.data.id]: action.data.value,
				},
			};
		case ROW_RESIZE:
			return {
				...state,
				rowState: {
					...state.rowState,
					[action.data.id]: action.data.value,
				},
			};
		case CHANGE_DATA_CELL:
			return {
				...state,
				cellState: {
					...state.cellState,
					[action.data.id]: {
						text: action.data.text,
						formulaText: action.data.formulaText,
						styles: {
							...(state.cellState[action.data.id] ? { ...state.cellState[action.data.id].styles } : {}),
						},
					},
				},
				stateCurrentCell: {
					text: action.data.text,
					formulaText: action.data.formulaText,
				},
			};
		case CHANGE_STYLES_CELL:
			return {
				...state,
				cellState: {
					...state.cellState,
					[action.data.id]: {
						text: state.cellState[action.data.id].text,
						formulaText: state.cellState[action.data.id].formulaText,
						styles: {
							...state.cellState[action.data.id].styles,
							...action.data.styles,
						},
					},
				},
				currentStyleCell: {
					...state.currentStyleCell,
					...action.data.styles,
				},
			};
		case CHANGE_STYLE_CURRENT_CELL:
			return {
				...state,
				currentStyleCell: {
					...action.data,
				},
			};
		case CHANGE_TABLE_NAME:
			return {
				...state,
				tableName: action.data.text,
			};
		case CHANGE_LAST_MODIFIED_DATE:
			return {
				...state,
				lastModifiedDate: action.data,
			};
		default:
			return state;
	}
}
