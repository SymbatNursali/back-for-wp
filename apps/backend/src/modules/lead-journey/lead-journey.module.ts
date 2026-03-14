import type { AppModule } from '../module-contract.js';

export const leadJourneyModule: AppModule = {
  name: 'lead-journey',
  async register(app) {
    app.get('/lead-journey', async () => ({ module: 'lead-journey', status: 'stub' }));
  },
};
