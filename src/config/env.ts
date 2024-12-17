// Environment variable validation and access
export const env = {
  airtable: {
    personalAccessToken: import.meta.env.VITE_AIRTABLE_PERSONAL_ACCESS_TOKEN as string,
    baseId: import.meta.env.VITE_AIRTABLE_BASE_ID as string,
    tableName: import.meta.env.VITE_AIRTABLE_TABLE_NAME as string,
  }
} as const;

// Validate required environment variables
const requiredEnvVars = [
  ['AIRTABLE_PERSONAL_ACCESS_TOKEN', env.airtable.personalAccessToken],
  ['AIRTABLE_BASE_ID', env.airtable.baseId],
  ['AIRTABLE_TABLE_NAME', env.airtable.tableName],
] as const;

for (const [name, value] of requiredEnvVars) {
  if (!value) {
    throw new Error(`Missing required environment variable: VITE_${name}`);
  }
}