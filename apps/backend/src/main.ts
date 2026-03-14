import { getEnvConfig } from './config/env.js';
import { createApp } from './core/create-app.js';

const bootstrap = async (): Promise<void> => {
  const app = await createApp();
  const env = getEnvConfig();

  await app.listen({ port: env.port, host: env.host });
};

bootstrap().catch((error) => {
  console.error(error);
  process.exit(1);
});
