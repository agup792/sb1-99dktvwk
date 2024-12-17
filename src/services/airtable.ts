import Airtable from 'airtable';
import { env } from '../config/env';
import { ERROR_MESSAGES } from '../config/constants';
import type { AirtableRecord, AirtableError } from '../types/airtable';

// Initialize Airtable with debug mode to see detailed errors
Airtable.configure({
  apiKey: env.airtable.personalAccessToken,
  endpointUrl: 'https://api.airtable.com',
  apiVersion: '0.1.0',
  noRetryIfRateLimited: false
});

const base = new Airtable().base(env.airtable.baseId);
const table = base(env.airtable.tableName);

export async function createRecord(text: string): Promise<string> {
  try {
    console.log('Creating record with text length:', text.length);
    console.log('Using base ID:', env.airtable.baseId);
    console.log('Using table name:', env.airtable.tableName);
    
    const record = await table.create([{
      fields: {
        text,
        status: 'pending',
        created_at: new Date().toISOString()
      }
    }]);

    if (!record || record.length === 0) {
      throw new Error('No record was created');
    }

    return record[0].id;
  } catch (error) {
    console.error('Airtable create error:', error);
    
    const airtableError = error as AirtableError;
    
    if (airtableError.statusCode === 401 || airtableError.statusCode === 403) {
      throw new Error('Authentication failed. Please check your Airtable Personal Access Token.');
    }
    
    if (airtableError.statusCode === 404) {
      throw new Error('Base or table not found. Please check your Base ID and Table Name.');
    }
    
    if (airtableError.statusCode === 422) {
      throw new Error('Invalid field names or values. Please check your table schema.');
    }
    
    if (airtableError.message) {
      throw new Error(`Airtable Error: ${airtableError.message}`);
    }
    
    throw new Error(ERROR_MESSAGES.RECORD_CREATE);
  }
}

export async function fetchQuery(recordId: string): Promise<string> {
  try {
    const record = await table.find(recordId);
    const fields = record.fields as Partial<AirtableRecord>;
    
    if (!fields.query) {
      throw new Error('Query not yet available');
    }
    
    return fields.query;
  } catch (error) {
    console.error('Airtable fetch error:', error);
    
    const airtableError = error as AirtableError;
    
    if (airtableError.statusCode === 401 || airtableError.statusCode === 403) {
      throw new Error('Authentication failed. Please check your Airtable Personal Access Token.');
    }
    
    if (airtableError.statusCode === 404) {
      throw new Error('Record not found. The record might have been deleted.');
    }
    
    if (airtableError.message) {
      throw new Error(`Airtable Error: ${airtableError.message}`);
    }
    
    throw new Error(ERROR_MESSAGES.RECORD_FETCH);
  }
}