import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { globalIgnores } from 'eslint/config'

export default tseslint.config([
  globalIgnores(['dist', 'build', 'node_modules']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    rules: {
      // Disable BEM-related naming conventions since we're using Tailwind CSS
      'class-methods-use-this': 'off',
      'no-underscore-dangle': 'off',
      // Allow kebab-case in class names (common in Tailwind)
      'camelcase': 'off',
      // Disable unused vars warnings for imports that might be used in JSX
      '@typescript-eslint/no-unused-vars': ['error', { 
        'argsIgnorePattern': '^_',
        'varsIgnorePattern': '^_',
        'ignoreRestSiblings': true 
      }],
      // Allow any naming convention for CSS classes
      'no-restricted-syntax': 'off',
    },
  },
])
