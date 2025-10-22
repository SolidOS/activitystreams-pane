import storybook from 'eslint-plugin-storybook'
import tsParser from '@typescript-eslint/parser'
import tseslintPlugin from '@typescript-eslint/eslint-plugin'
import neostandard from 'neostandard'
import globals from 'globals'

export default [
  ...neostandard(),
  {
    ignores: [
      'lib/**',
      'node_modules/**',
      'coverage/**',
      'storybook-static/**'
    ],
  },
  {
    files: ['src/**/*.ts'],
    plugins: {
      '@typescript-eslint': tseslintPlugin,
      storybook,
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
      },
      parser: tsParser,
      parserOptions: {
        project: ['./tsconfig.json']
      },
    },
    rules: {
      semi: ['error', 'never'],
      quotes: ['error', 'single'],
      'no-console': 'error',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': ['warn', {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      }],
      '@typescript-eslint/no-explicit-any': 'warn',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  {
    files: ['src/**/*.js', 'src/**/*.cjs', 'src/**/*.mjs'],

    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
      }
    },
    rules: {
      semi: ['error', 'never'],
      quotes: ['error', 'single'],
      'no-console': 'error',
      'no-unused-vars': 'error',
      'no-undef': 'error'
    },
  },
  {
    files: ['e2e-test/**/*.ts', 'test/unit/**/*.ts'],
    plugins: {
      'typescript-eslint': tseslintPlugin,
    },
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: ['./tsconfig.test.json'],
      },
    },
    rules: {
      semi: ['error', 'never'],
      quotes: ['error', 'single'],
      'no-console': 'off', // Allow console in tests
      'no-undef': 'off', // Tests may define globals
    }
  },
]
