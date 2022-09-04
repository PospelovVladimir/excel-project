function toButton({ icon, type, active, value }) {
	return `<div class="toolbar__btn ${active === true ? 'is-active' : ''}" 
						data-format="${type}"
						data-value='${JSON.stringify(value)}'
					>
					<span class="material-icons">
						format_${icon}
					</span>
				</div>`;
}

export default function createToolbar(state = {}) {
	const buttons = [
		{
			icon: 'align_left',
			type: 'left',
			active: state.textAlign === 'left',
			value: { textAlign: 'left' },
		},
		{
			icon: 'align_center',
			type: 'center',
			active: state.textAlign === 'center',
			value: { textAlign: 'center' },
		},
		{
			icon: 'align_right',
			type: 'right',
			active: state.textAlign === 'right',
			value: { textAlign: 'right' },
		},
		{
			icon: 'bold',
			type: 'bold',
			active: state.fontWeight === 'bold',
			value: { fontWeight: state.fontWeight === 'bold' ? 'normal' : 'bold' },
		},
		{
			icon: 'italic',
			type: 'italic',
			active: state.fontStyle === 'italic',
			value: { fontStyle: state.fontStyle === 'italic' ? 'normal' : 'italic' },
		},
		{
			icon: 'underlined',
			type: 'underlined',
			active: state.textDecoration === 'underline',
			value: { textDecoration: state.textDecoration === 'underline' ? 'none' : 'underline' },
		},
	];

	return buttons.map(toButton).join('');
}
