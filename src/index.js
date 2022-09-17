import LocalStorageRepository from './core/repository/repositories/LocalStorageRepository';
import RepositoryProvider from './core/repository/RepositoryProvider';
import Router from './core/routes/Router';
import ExcelPage from './pages/ExcelPage';
import ShowcasePage from './pages/ShowcasePage';
import './styles/index.scss';

const repository = new RepositoryProvider(new LocalStorageRepository());
const routerOptions = {
	routes: { excel: ExcelPage, showcase: ShowcasePage },
	repository,
};

// eslint-disable-next-line
const router = new Router('#app', routerOptions);
