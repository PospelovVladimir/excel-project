import Excel from './components/excel/Excel';
import Fx from './components/fx/Fx';
import Header from './components/header/Header';
import Table from './components/table/Table';
import Toolbar from './components/toolbar/Toolbar';
import './styles/index.scss';

const excel = new Excel('#app', {
	components: [Header, Toolbar, Fx, Table],
});

console.dir(excel.render());