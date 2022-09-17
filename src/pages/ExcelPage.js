import Excel from '../components/excel/Excel';
import Fx from '../components/fx/Fx';
import Header from '../components/header/Header';
import Table from '../components/table/Table';
import Toolbar from '../components/toolbar/Toolbar';
import CreateStore from '../core/store/СreateStore';
import Page from '../core/Page';
import initialState from '../redux/initialState';
import rootReducer from '../redux/rootReducer';

export default class ExcelPage extends Page {
	constructor(options) {
		super(options);
		this.unsub = null;
		this.param = options.param ? options.param : Date.now();
	}

	getRoot() {
		const store = new CreateStore(rootReducer, initialState(this.repository.getOne(this.param)));
		const updateStorage = state => this.repository.setByKey(this.param, state);

		this.unsub = store.subscribe(updateStorage);

		this.excel = new Excel({
			components: [Header, Toolbar, Fx, Table],
			store,
			repository: this.repository,
		});

		return this.excel.getRoot();
	}

	afterRender() {
		this.excel.init();
	}

	destroy() {
		this.unsub.unsubscribe();
		this.excel.destroy();
	}
}
