import Airtable from 'airtable';
import { env } from '../../config/env';

// Initialize Airtable with configuration
Airtable.configure({
  apiKey: env.airtable.personalAccessToken,
  endpointUrl: 'https://api.airtable.com',
  apiVersion: '0.1.0',
  noRetryIfRateLimited: false
});

export const base = new Airtable().base(env.airtable.baseId);
export const table = base(env.airtable.tableName);