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
}

export default function $(selector) {
	return new Dom(selector);
}

$.create = (tagName, classes = '') => {
	const el = document.createElement(tagName);
	if (classes) {
		el.classList.add(classes);
	}
	// Elements -> incleded native methods dom
	return $(el);
};
