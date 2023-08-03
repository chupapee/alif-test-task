const { configure, presets } = require('eslint-kit');

module.exports = configure({
	allowDebug: process.env.NODE_ENV !== 'production',

	presets: [
		presets.imports({ sort: { newline: 'always' } }),
		presets.node(),
		presets.prettier({
			endOfLine: 'lf',
			semi: true,
			singleQuote: true,
			useTabs: true,
			tabWidth: 4,
			quoteProps: 'as-needed',
			trailingComma: 'es5',
			bracketSpacing: true,
			jsxBracketSameLine: false,
		}),
		presets.typescript(),
		presets.react({ version: 'detect' }),
	],
});
