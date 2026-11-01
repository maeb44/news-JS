import globals from 'globals';
import eslintConfigPrettier from 'eslint-config-prettier/flat';
import tseslint from 'typescript-eslint';
import { defineConfig } from 'eslint/config';

export default defineConfig([
    {
        ignores: ['dist/**', 'node_modules/**'],
    },
    tseslint.configs.recommended,
    {
        files: ['src/**/*.{ts,tsx}'],
        languageOptions: {
            globals: { ...globals.browser },
        },
        rules: {
            '@typescript-eslint/no-explicit-any': 'error',
        },
    },

    {
        files: ['dist/**/*', '**/*.cjs', '**/*.config.js', '**/*.config.mjs', '**/*.config.ts'],
        rules: {
            '@typescript-eslint/no-require-imports': 'off',
        },
    },
    eslintConfigPrettier,
]);
