module.exports = {
	roots: ['<rootDir>/test'],
	setupFiles: ['<rootDir>/test/envVariables.ts'],
	transform: {
		'^.+\\.tsx?$': 'ts-jest',
	},
	testRegex: '(/__test__/.*|(\\.|/)(test|spec))\\.[jt]sx?$',
	moduleFileExtensions: ['ts', 'js', 'json', 'node'],
	verbose: true,
	collectCoverage: true,
	collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
	coveragePathIgnorePatterns: ['/node_modules'],
	coverageThreshold: {
		global: {
			branches: 50,
			functions: 50,
			lines: 50,
			statements: 50,
		},
	},
	reporters: ['default', 'jest-junit'],
	coverageReporters: ['text', 'text-summary', 'json-summary', 'cobertura', 'html', 'json', 'lcov'],
	globals: {
		'ts-jest': {
			tsconfig: {
				sourceMap: true,
				inlineSourceMap: true,
			},
		},
	},
	preset: 'ts-jest',
	testEnvironment: 'node',
}