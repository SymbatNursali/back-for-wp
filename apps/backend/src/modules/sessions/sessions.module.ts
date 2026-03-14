import type { AppModule } from '../module-contract.js';

export const sessionsModule: AppModule = {
  name: 'sessions',
  async register(app) {
    app.get('/sessions', async () => ({ module: 'sessions', status: 'stub' }));
  },
};
