import type { AppModule } from '../module-contract.js';

export const healthModule: AppModule = {
  name: 'health',
  async register(app) {
    app.get('/health', async () => ({ status: 'ok' }));
  },
};
