import type { FastifyInstance } from 'fastify';

export const registerPlugins = async (_app: FastifyInstance): Promise<void> => {
  // Register shared plugins here (logger, CORS, metrics, etc.)
};
