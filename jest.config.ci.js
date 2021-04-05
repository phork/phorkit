const config = require('./jest.config');

module.exports = {
  ...config,
  globals: {
    ...config.globals,
    'ts-jest': {
      ...config.globals['ts-jest'],
      tsconfig: '<rootDir>/__tests__/tsconfig.ci.json',
      diagnostics: true,
    },
  },
  modulePathIgnorePatterns: [...config.modulePathIgnorePatterns, '<rootDir>/package.json'],
  moduleNameMapper: {
    '^lib(.*)$': '<rootDir>/lib$1',
    '^__mocks__/(.*)$': '<rootDir>/__mocks__/$1',
    '\\.css$': '<rootDir>/__mocks__/style.mock.js',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/file.mock.js',
  },
};
