import Page from '../Page';
import Router from './Router';

class ShowcasePage extends Page {
	getRoot() {
		const root = document.createElement('div');
		root.innerHTML = 'showcase';
		return root;
	}
}

describe('tests Router', () => {
	let router;
	let $root;

	beforeEach(() => {
		$root = document.createElement('div');
		router = new Router($root, { showcase: ShowcasePage });
	});

	test('should be defined', () => {
		expect(router).toBeDefined();
	});

	test('router should render "showcasePage"', () => {
		router.changePageHandler();
		expect($root.innerHTML).toBe('<div>showcase</div>');
	});
});
