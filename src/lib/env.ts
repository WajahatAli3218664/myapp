// Environment validation utility
export function getEnvVar(name: string): string {
  const value = process.env[name];
  if (!value) {
    console.error(`Missing required environment variable: ${name}`);
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export const ENV = {
  GROQ_API_KEY: getEnvVar('GROQ_API_KEY'),
  DATABASE_URL: getEnvVar('DATABASE_URL'),
  QDRANT_URL: getEnvVar('QDRANT_URL'),
  QDRANT_API_KEY: getEnvVar('QDRANT_API_KEY'),
  USER_ID: process.env.USER_ID || 'default',
};