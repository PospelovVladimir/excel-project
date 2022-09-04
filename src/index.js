import Excel from './components/excel/Excel';
import Fx from './components/fx/Fx';
import Header from './components/header/Header';
import Table from './components/table/Table';
import Toolbar from './components/toolbar/Toolbar';
import CreateStore from './core/createStore';
import { locStorage } from './core/utils';
import initialState from './redux/initialState';
import rootReducer from './redux/rootReducer';
import './styles/index.scss';

const store = new CreateStore(rootReducer, initialState);

function updateLocStorage(state) {
	locStorage('excelState', state);
}

store.subscribe(updateLocStorage, 300);

const excel = new Excel('#app', {
	components: [Header, Toolbar, Fx, Table],
	store,
});

excel.render();
