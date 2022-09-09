import { locStorage } from '../core/utils';

function getKeys() {
	const keys = [];
	const localStorageLenght = localStorage.length;
	for (let i = 0; i < localStorageLenght; i += 1) {
		if (localStorage.key(i).includes('excel')) {
			keys.push(localStorage.key(i));
		}
	}
	return keys;
}

function createItem(key) {
	const currentState = locStorage(key);
	const id = key.split(':')[1];
	return `<tr>
						<td><a href="#excel/${id}">${currentState.tableName}</a></td>
						<td>${currentState.lastModifiedDate}</td>
					</tr>`;
}

function createItemListHTML() {
	const keys = getKeys();
	const firstLine = !keys.length ? '<tr><th>Нет созданных таблиц</th></tr>' : `<tr><th>Название</th><th>Дата изменения</th></tr>`;
	return `${firstLine} ${keys.map(createItem).join('')}`;
}

export default function createTableListHTML() {
	return `<table class="showcase__history">
					${createItemListHTML()}
				</table>`;
}
