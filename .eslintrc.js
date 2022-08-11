module.exports = {
	env: {
		browser: true,
		es2021: true,
		// node: true,
		// commonjs: true,
	},
	extends: [
		// 'eslint:recommended',
		'airbnb-base',
		'plugin:import/recommended',
		'prettier'
	],
	parserOptions: {
		ecmaFeatures: {
			jsx: true
		},
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	rules: {
		// "max-len": [1, 70, 2, { ignoreComments: true }]
		indent: ['error', 'tab', { 
			SwitchCase: 1, 
		}],
		// indent: [2, 'tab'],
		'no-tabs': 0,
		'linebreak-style': ['error', 'windows'],
		'no-console': 'off',
		'arrow-parens': 'off',
		'comma-dangle': 'off',
		'import/extensions': 'off',
		'no-use-before-define': ["error", { "classes": false }]
		// 'react/jsx-filename-extension': [1, { 'extensions': ['.js', '.jsx'] }] тогда ошибки JSX not allowed in files with extension '.js' не будет
	},
};
