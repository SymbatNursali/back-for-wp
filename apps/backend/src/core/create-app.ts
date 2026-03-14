import Fastify, { type FastifyInstance } from 'fastify';
import { registerPlugins } from '../plugins/register-plugins.js';
import { registerModules } from '../modules/register-modules.js';

export const createApp = async (): Promise<FastifyInstance> => {
  const app = Fastify({ logger: true });

  await registerPlugins(app);
  await registerModules(app);

  return app;
};
