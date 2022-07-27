export default function $(selector) {
	return new Dom(selector);
}

$.create = (tagName, classes = '', attributes = {}) => {
	const el = document.createElement(tagName);
	if (classes) {
		el.classList.add(classes);
	}

	if (Object.keys(attributes).length > 0) {
		Object.keys(attributes).forEach(key => {
			el.setAttribute(key, attributes[key]);
		});
	}

	// Elements -> incleded native methods dom
	return $(el);
};

class Dom {
	constructor(selector) {
		this.$el = typeof selector === 'string' ? document.querySelector(selector) : selector;
	}

	html(html) {
		if (typeof html === 'string') {
			this.$el.innerHTML = html;
			return this;
		}
		return this.$el.innerHTML;
	}

	clear() {
		this.html('');
		return this;
	}

	on(eventType, callback) {
		this.$el.addEventListener(eventType, callback);
	}

	off(eventType, callback) {
		this.$el.removeEventListener(eventType, callback);
	}

	append(node) {
		const advancedNode = node instanceof Dom ? node.$el : node;

		if (Element.prototype.append) {
			this.$el.append(advancedNode);
		} else {
			this.$el.appendChild(advancedNode);
		}
		return this;
	}

	closest(selector) {
		let parent = this.$el;
		while (parent) {
			if (parent.matches(selector)) {
				return $(parent);
			}

			parent = parent.parentElement;
		}

		return null;
	}

	get dataset() {
		return this.$el.dataset;
	}

	get getSize() {
		return this.$el.getBoundingClientRect();
	}

	addClass(classes) {
		this.$el.classList.add(...classes.split(' '));
		return this;
	}

	removeClass(classes) {
		this.$el.classList.remove(...classes.split(' '));
		return this;
	}

	findAll(selector) {
		return this.$el.querySelectorAll(selector);
	}

	css(styles = {}) {
		Object.keys(styles).forEach(key => {
			this.$el.style[key] = styles[key];
		});
		return this;
	}
}
