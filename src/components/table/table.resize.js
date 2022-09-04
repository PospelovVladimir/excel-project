import { DEFAULT_STYLES_TOOLBAR } from '../../constants';
import $ from '../../core/dom';

export default function resizeHandler(e) {
	return new Promise(resolve => {
		const $resizer = $(e.target);
		const $table = $resizer.closest('[data-table]');
		const $parent = $resizer.closest('[data-master-cell-type]');
		const parentId = $parent.dataset.masterCellId;
		const parentSize = $parent.getSize;
		const parentType = $parent.dataset.masterCellType;
		const axis = parentType === 'column' ? 'X' : 'Y';
		const lengthValue = parentType === 'column' ? 'width' : 'height';
		const positionValue = parentType === 'column' ? 'right' : 'bottom';
		let mouseValueEnd;

		$table.addClass('unselectable');
		$resizer.addClass('is-active');

		document.onmousemove = event => {
			mouseValueEnd = event[`client${axis}`];
			$resizer.css({ [positionValue]: `${e[`client${axis}`] - mouseValueEnd}px` });
		};

		document.onmouseup = () => {
			const quantity = mouseValueEnd - e[`client${axis}`];

			document.onmousemove = null;
			document.onmouseup = null;

			$parent.css({ [lengthValue]: `${parentSize[lengthValue] + quantity}px` });
			$resizer.css({ [positionValue]: `0px` });
			$table.removeClass('unselectable');
			$resizer.removeClass('is-active');

			if (parentType === 'column') {
				$table.findAll(`[data-cell][data-${parentType}-id="${parentId}"]`).forEach(cell => {
					const $cell = $(cell);
					$cell.css({
						[lengthValue]: `${$cell.getSize[lengthValue] + quantity}px`,
						...$cell.getStyles(Object.keys(DEFAULT_STYLES_TOOLBAR)),
					});
				});
			}

			if (parentType === 'row') {
				$resizer.closest('.table__row').css({ [lengthValue]: `${parentSize[lengthValue] + quantity}px` });
			}

			resolve({
				parentType,
				id: parentId,
				value: parentSize[lengthValue] + quantity,
			});
		};
	});
}
