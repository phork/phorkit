const { defaults } = require('jest-config');

module.exports = {
  verbose: false,
  testEnvironment: 'jest-environment-jsdom',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    '^.+\\.jsx?$': 'babel-jest',
  },
  transformIgnorePatterns: ['/node_modules/(?!lodash-es).+\\.js$'],
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/__tests__/tsconfig.json',
      diagnostics: true,
    },
  },
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'tsx'],
  modulePathIgnorePatterns: [...defaults.modulePathIgnorePatterns, 'lib/package.json'],
  testPathIgnorePatterns: [...defaults.testPathIgnorePatterns, '.d.ts$'],
  testMatch: ['**/__tests__/**/*.(spec|test).[jt]s?(x)'],
  moduleNameMapper: {
    '^lib(.*)$': '<rootDir>/src$1',
    '^__mocks__/(.*)$': '<rootDir>/__mocks__/$1',
    '\\.css$': '<rootDir>/__mocks__/style.mock.js',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/file.mock.js',
  },
};
