import storybook from 'eslint-plugin-storybook'
import tsParser from '@typescript-eslint/parser'
import neostandard from 'neostandard'
import globals from 'globals'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))

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
      // Style rules (not handled by TypeScript)
      semi: ['error', 'never'],
      quotes: ['error', 'single'],

      // Disable ESLint rules that TypeScript handles better
      'no-unused-vars': 'off', // TypeScript handles this via noUnusedLocals
      'no-undef': 'off', // TypeScript handles undefined variables
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  {
    files: ['src/**/*.tsx'],
    plugins: {
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
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
      // Style rules (not handled by TypeScript)
      semi: ['error', 'never'],
      quotes: ['error', 'single'],

      // Disable ESLint rules that TypeScript handles better
      'no-unused-vars': 'off', // TypeScript handles this via noUnusedLocals
      'no-undef': 'off', // TypeScript handles undefined variables
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
      // Code style - match TypeScript settings
      semi: ['error', 'never'],
      quotes: ['error', 'single'],

      // Strict checking - match TypeScript strictness
      'no-console': 'error',
      'no-unused-vars': 'error', // Match TypeScript noUnusedLocals: true
      'no-undef': 'error',
      strict: ['error', 'global'], // Match TypeScript alwaysStrict: true

      // Additional strictness to match TypeScript behavior
      'no-implicit-globals': 'error',
      'prefer-const': 'error', // Encourage immutability
      'no-var': 'error', // Use let/const only
      'no-redeclare': 'error'
    },
  },
  {
    files: ['e2e-test/**/*.ts', 'test/unit/**/*.ts'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: './tsconfig.test.json',
        tsconfigRootDir: __dirname,
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
