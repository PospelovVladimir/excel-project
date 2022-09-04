import { locStorage } from '../core/utils';
import { DEFAULT_STYLES_TOOLBAR, DEFAULT_TABLE_NAME } from '../constants';

const defaultState = {
	columnState: {},
	rowState: {},
	cellState: {},
	stateCurrentCell: '',
	currentStyleCell: { ...DEFAULT_STYLES_TOOLBAR },
	tableName: DEFAULT_TABLE_NAME,
};

const normalize = state => ({
	...state,
	currentStyleCell: {},
});

const initialState = locStorage('excelState') ? normalize(locStorage('excelState')) : defaultState;
export default initialState;
