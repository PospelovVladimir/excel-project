import ActiveRoute from '../ActiveRoute';
import $ from '../dom';

export default class Router {
	constructor(selector, routes = {}) {
		if (!selector) throw new Error('selector in Router class, is not found');

		this.changePageHandler = this.changePageHandler.bind(this);

		this.$rootElApp = $(selector);
		this.routes = routes;
		this.page = null;
		this.init();
	}

	changePageHandler() {
		if (this.page) {
			this.page.destroy();
		}

		const Page = Object.prototype.hasOwnProperty.call(this.routes, ActiveRoute.path) ? this.routes[ActiveRoute.path] : this.routes.showcase;
		const page = new Page(ActiveRoute.param);
		this.page = page;
		this.$rootElApp.clear().append(this.page.getRoot());
		this.page.afterRender();
	}

	init() {
		window.addEventListener('hashchange', this.changePageHandler);
		this.changePageHandler();
	}

	destroy() {
		window.removeEventListener('hashchange', this.changePageHandler);
	}
}
