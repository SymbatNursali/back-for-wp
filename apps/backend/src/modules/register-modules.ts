import type { FastifyInstance } from 'fastify';
import type { AppModule } from './module-contract.js';
import { authModule } from './auth/auth.module.js';
import { chatsModule } from './chats/chats.module.js';
import { healthModule } from './health/health.module.js';
import { leadJourneyModule } from './lead-journey/lead-journey.module.js';
import { logsModule } from './logs/logs.module.js';
import { matchingModule } from './matching/matching.module.js';
import { metaModule } from './meta/meta.module.js';
import { sessionsModule } from './sessions/sessions.module.js';

const modules: AppModule[] = [
  healthModule,
  authModule,
  sessionsModule,
  chatsModule,
  matchingModule,
  metaModule,
  logsModule,
  leadJourneyModule,
];

export const registerModules = async (app: FastifyInstance): Promise<void> => {
  for (const module of modules) {
    await module.register(app);
  }
};
