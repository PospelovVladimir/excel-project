import ExcelComponent from '../../core/ExcelComponent';

export default class Toolbar extends ExcelComponent {
	static element = 'div';

	static className = 'toolbar';

	static toHTML() {
		return `
			<div class="toolbar__btn">
				<span class="material-icons">
					format_align_left
				</span>
			</div>
			<div class="toolbar__btn">
				<span class="material-icons">
					format_align_center
				</span>
			</div>
			<div class="toolbar__btn">
				<span class="material-icons">
					format_align_right
				</span>
			</div>
			<div class="toolbar__btn">
				<span class="material-icons">
					format_bold
				</span>
			</div>
			<div class="toolbar__btn">
				<span class="material-icons">
					format_italic
				</span>
			</div>
			<div class="toolbar__btn">
				<span class="material-icons">
					format_underlined
				</span>
			</div>`;
	}
}
