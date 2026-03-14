import type { AppModule } from '../module-contract.js';

export const chatsModule: AppModule = {
  name: 'chats',
  async register(app) {
    app.get('/chats', async () => ({ module: 'chats', status: 'stub' }));
  },
};
