export default class TableSelection {
	static className = 'selected';

	static classNamePre = 'pre-selected';

	constructor() {
		this.list = [];
	}

	select($cell) {
		this.list.push($cell);
		$cell.addClass(TableSelection.className);
	}

	selectGroup($cells) {
		this.list.push(...$cells);
		$cells.forEach($cell => {
			$cell.addClass(TableSelection.className);
		});
	}

	unSelect($cell) {
		$cell.removeClass(TableSelection.className);
		this.list.forEach(($item, i) => {
			if ($item.dataset.rowId === $cell.dataset.rowId && $item.dataset.columnId === $cell.dataset.columnId) {
				this.list.splice(i, 1);
			}
		});
	}

	static hasSelected($cell) {
		return $cell.hasClass(TableSelection.className);
	}

	cleanAllCells() {
		this.list.forEach($cell => {
			$cell.removeClass(TableSelection.className);
		});
		this.list = [];
	}

	hasSelectedOne() {
		return this.list.length < 2;
	}

	getFirstCell() {
		const [res] = this.list.slice(0, 1);
		return res;
	}

	// реализовать метод удаления всех ячеек кроме последней, ее пожно через поп взять а потом почиститьь массив предварительно удалив классы

	// Добавить метод поиска ячейки или ячеек в хранилище, для работы с ними (удаление и тд) Возможно сделать его статическим, так как он нужен только классу
}
