import Excel from '../components/excel/Excel';
import Fx from '../components/fx/Fx';
import Header from '../components/header/Header';
import Table from '../components/table/Table';
import Toolbar from '../components/toolbar/Toolbar';
import CreateStore from '../core/createStore';
import Page from '../core/Page';
import { locStorage } from '../core/utils';
import initialState from '../redux/initialState';
import rootReducer from '../redux/rootReducer';

function createStorageKey(param) {
	return `excel:${param}`;
}

export default class ExcelPage extends Page {
	getRoot() {
		const params = this.params ? this.params : Date.now();
		const store = new CreateStore(rootReducer, initialState(createStorageKey(params)));
		const updateLocStorage = state => locStorage(createStorageKey(params), state);

		store.subscribe(updateLocStorage);

		this.excel = new Excel({
			components: [Header, Toolbar, Fx, Table],
			store,
		});

		return this.excel.getRoot();
	}

	afterRender() {
		this.excel.init();
	}

	destroy() {
		this.excel.destroy();
	}
}
