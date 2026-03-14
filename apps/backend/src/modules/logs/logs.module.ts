import type { AppModule } from '../module-contract.js';

export const logsModule: AppModule = {
  name: 'logs',
  async register(app) {
    app.get('/logs', async () => ({ module: 'logs', status: 'stub' }));
  },
};
