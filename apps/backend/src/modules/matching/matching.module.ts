import type { AppModule } from '../module-contract.js';

export const matchingModule: AppModule = {
  name: 'matching',
  async register(app) {
    app.get('/matching', async () => ({ module: 'matching', status: 'stub' }));
  },
};
