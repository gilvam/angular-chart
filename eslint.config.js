// @ts-check
const eslint = require('@eslint/js');
const tseslint = require('typescript-eslint');
const angular = require('angular-eslint');
const eslintConfigPrettier = require('eslint-config-prettier');
const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended');

module.exports = tseslint.config(
	{
		extends: [
			eslint.configs.recommended,
			...tseslint.configs.recommended,
			...tseslint.configs.stylistic,
			...angular.configs.tsRecommended,
			eslintPluginPrettierRecommended
		],
		files: ['**/*.ts'],
		processor: angular.processInlineTemplates,
		rules: {
			// eslint rules
			'@typescript-eslint/comma-dangle': 'off',
			'@typescript-eslint/lines-between-class-members': 'off',
			'@typescript-eslint/no-shadow': 'error',
			'@typescript-eslint/no-explicit-any': 'error',
			'@typescript-eslint/no-unused-vars': 'error',
			'@typescript-eslint/no-namespace': 'error',
			'@typescript-eslint/no-empty-interface': 'error',
			'@typescript-eslint/no-empty-function': 'error',

			// eslint angular rules
			'@angular-eslint/directive-selector': ['error', { type: 'attribute', prefix: 'app', style: 'camelCase' }],
			'@angular-eslint/component-selector': ['error', { type: 'element', prefix: 'app', style: 'kebab-case' }],
			'@angular-eslint/component-class-suffix': ['error', { suffixes: ['Component', 'Directive', 'Pipe', 'Guard'] }],

			// // eslint sort
			// 'sort-imports': [
			// 	'error',
			// 	{
			// 		ignoreCase: false,
			// 		ignoreDeclarationSort: false,
			// 		ignoreMemberSort: false,
			// 		memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
			// 		allowSeparatedGroups: false
			// 	}
			// ],

			// prettier rules
			...eslintConfigPrettier.rules,
			'prettier/prettier': 'error',

			// other rules
			camelcase: ['error', { allow: ['/^[_][A-Z0-9]*$/'] }]
		}
	},
	{
		files: ['**/*.html'],
		extends: [...angular.configs.templateRecommended, ...angular.configs.templateAccessibility],
		rules: {}
	}
);
