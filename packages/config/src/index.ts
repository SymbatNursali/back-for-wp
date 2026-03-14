export interface AppConfig {
  nodeEnv: string;
  port: number;
}

export const createAppConfig = (): AppConfig => ({
  nodeEnv: process.env.NODE_ENV ?? 'development',
  port: Number(process.env.PORT ?? 4000),
});
