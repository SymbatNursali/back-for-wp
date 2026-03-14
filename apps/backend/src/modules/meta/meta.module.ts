import type { AppModule } from '../module-contract.js';

export const metaModule: AppModule = {
  name: 'meta',
  async register(app) {
    app.get('/meta', async () => ({ module: 'meta', status: 'stub' }));
  },
};
