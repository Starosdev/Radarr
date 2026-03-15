import '@testing-library/jest-dom/vitest';

// Mock window.Radarr global
window.Radarr = {
  apiKey: 'test-api-key',
  apiRoot: '/api/v3',
  instanceName: 'Radarr',
  theme: 'dark',
  urlBase: '',
  version: '6.1.1.0',
  isProduction: true,
};
