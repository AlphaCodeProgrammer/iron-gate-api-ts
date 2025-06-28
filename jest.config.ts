/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleNameMapper: {
      '^src/(.*)$': '<rootDir>/src/$1',
    },
    moduleFileExtensions: ['ts', 'js', 'json', 'node'],
    rootDir: '.',
    testRegex: '.*\\.spec\\.ts$',
    transform: {
      '^.+\\.ts$': 'ts-jest',
    },
  };
  