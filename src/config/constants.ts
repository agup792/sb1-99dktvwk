// Application constants
export const MAX_TEXT_LENGTH = 20000;
export const TIMER_DURATION = 150; // seconds

// Error messages
export const ERROR_MESSAGES = {
  RECORD_CREATE: 'Failed to create record in Airtable',
  RECORD_FETCH: 'Failed to fetch query from Airtable',
  INVALID_RESPONSE: 'Invalid response from server',
  NETWORK_ERROR: 'Network error occurred',
  UNAUTHORIZED: 'Unauthorized access to Airtable',
} as const;