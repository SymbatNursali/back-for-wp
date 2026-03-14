export interface EnvConfig {
  port: number;
  host: string;
}

export const getEnvConfig = (): EnvConfig => ({
  port: Number(process.env.PORT ?? 4000),
  host: process.env.HOST ?? '0.0.0.0',
});
