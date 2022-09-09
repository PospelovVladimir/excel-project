import { locStorage } from '../core/utils';
import { DEFAULT_STYLES_TOOLBAR, DEFAULT_TABLE_NAME } from '../constants';

const defaultState = {
	columnState: {},
	rowState: {},
	cellState: {},
	stateCurrentCell: '',
	currentStyleCell: { ...DEFAULT_STYLES_TOOLBAR },
	tableName: DEFAULT_TABLE_NAME,
	lastModifiedDate: new Date().toLocaleString(),
};

const normalize = state => ({
	...state,
	currentStyleCell: {},
});

export default function initialState(param) {
	return locStorage(param) ? normalize(locStorage(param)) : defaultState;
}
