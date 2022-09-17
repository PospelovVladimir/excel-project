export default class RepositoryProvider {
	constructor(repository) {
		this.repository = repository;
	}

	getOne(key) {
		return this.repository.getOne(key);
	}

	setByKey(key, state) {
		this.repository.setByKey(key, state);
	}

	deleteByKey(key) {
		this.repository.deleteByKey(key);
	}
}
