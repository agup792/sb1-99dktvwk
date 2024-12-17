import type { AirtableError } from '../../types/airtable';

export function handleAirtableError(error: unknown, defaultMessage: string): Error {
  console.error('Airtable error:', error);
  
  const airtableError = error as AirtableError;
  
  if (airtableError.statusCode === 401 || airtableError.statusCode === 403) {
    return new Error('Authentication failed. Please check your Airtable Personal Access Token.');
  }
  
  if (airtableError.statusCode === 404) {
    return new Error('Base or table not found. Please check your Base ID and Table Name.');
  }
  
  if (airtableError.statusCode === 422) {
    return new Error(`Invalid field values: ${airtableError.message}`);
  }
  
  if (airtableError.message) {
    return new Error(`Airtable Error: ${airtableError.message}`);
  }
  
  return new Error(defaultMessage);
}