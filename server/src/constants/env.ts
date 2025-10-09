const getEnv = (key: string, defaultValue?: string): string => {
  const value = process.env[key] || defaultValue;
  if (value === undefined) {
    throw new Error(`Environment variable ${key} is not set`);
  }
  return value;
}

export const PORT = getEnv("PORT", "3000");
export const NODE_ENV = getEnv("NODE_ENV");
export const MONGODB_URI = getEnv("MONGODB_URI");