import Router from './core/routes/Router';
import ExcelPage from './pages/ExcelPage';
import ShowcasePage from './pages/ShowcasePage';
import './styles/index.scss';

const router = new Router('#app', { excel: ExcelPage, showcase: ShowcasePage });
console.log('🚀 ~ file: index.js ~ line 39 ~ router', router);
