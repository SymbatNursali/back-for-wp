import type { AppModule } from '../module-contract.js';

export const authModule: AppModule = {
  name: 'auth',
  async register(app) {
    app.get('/auth', async () => ({ module: 'auth', status: 'stub' }));
  },
};
