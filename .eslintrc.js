module.exports = {
	env: {
		browser: true,
		es2021: true,
		jest: true
	},
	extends: ['plugin:react/recommended'],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaFeatures: {
			jsx: true
		},
		ecmaVersion: 'latest',
		sourceType: 'module'
	},
	plugins: [
		'react',
		'@typescript-eslint',
		'unused-imports',
		'react-hooks',
		'unused-imports'
	],
	rules: {
		'unused-imports/no-unused-imports': 'error',
		'react/jsx-no-undef': 'off',
		semi: [2, 'never'],
		'react/jsx-filename-extension': [
			2,
			{
				extensions: ['.js', '.jsx', '.tsx', '.ts']
			}
		],
		'import/no-unresolved': 'off',
		'import/prefer-default-export': 'off',
		'no-unused-vars': 'off',
		'react/require-default-props': 'off',
		'react/react-in-jsx-scope': 'off',
		'react/function-component-definition': 'off',
		'no-shadow': 'off',
		'import/extensions': 'off',
		'import/no-extraneous-dependencies': 'off',
		'react/jsx-props-no-spreading': 'off',
		'no-underscore-dangle': 'off',
		'react/no-deprecated': 'off',
		'max-len': 'off',
		'react-hooks/rules-of-hooks': 'off',
		'react-hooks/exhaustive-deps': 'error',
		'no-param-reassign': 'off',
		'react/prop-types': 0,
		'react/display-name': 'off',
		'no-undef': 'off',
		'react/no-array-index-key': 'off'
	}
}
