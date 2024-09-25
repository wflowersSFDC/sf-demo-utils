module.exports = {
  extends: ['eslint-config-salesforce-typescript', 'plugin:sf-plugin/recommended'],
  root: true,
  rules: {
    header: 'off',
    'no-console': 'warn',
    'sf-plugin/no-missing-messages': 'off',
  },
};
