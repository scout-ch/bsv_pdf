import tsPlugin from '@typescript-eslint/eslint-plugin';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

export default [
  { ignores: ['dist'] },
  ...tsPlugin.configs['flat/recommended'],
  reactHooks.configs.flat['recommended-latest'],
  {
    plugins: { 'react-refresh': reactRefresh },
    rules: {
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true, allowExportNames: ['Route'] }],
    },
  },
  {
    files: ['src/routes/**'],
    rules: {
      'react-refresh/only-export-components': 'off',
    },
  },
];
