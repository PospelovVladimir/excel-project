import { locStorage } from '../../utils';

export default class LocalStorageRepository {
	getOne(key) {
		return locStorage(`excel:${key}`);
	}

	setByKey(key, state) {
		locStorage(`excel:${key}`, state);
	}

	deleteByKey(key) {
		localStorage.removeItem(key);
	}
}
