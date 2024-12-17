import { table } from './config';
import { handleAirtableError } from './errors';
import { validateCreateInput } from './validation';
import { ERROR_MESSAGES } from '../../config/constants';
import type { CreateRecordInput, QueryResponse } from './types';

export async function createRecord(input: CreateRecordInput): Promise<string> {
  try {
    validateCreateInput(input);

    const record = await table.create([{
      fields: {
        text: input.text,
        status: 'pending'
      }
    }]);

    if (!record || record.length === 0) {
      throw new Error('No record was created');
    }

    return record[0].id;
  } catch (error) {
    throw handleAirtableError(error, ERROR_MESSAGES.RECORD_CREATE);
  }
}

export async function fetchQuery(recordId: string): Promise<QueryResponse> {
  try {
    if (!recordId) {
      throw new Error('Record ID is required');
    }

    const record = await table.find(recordId);
    const { query, status, processing_time, error_message } = record.fields;

    if (!query && status === 'error') {
      throw new Error(error_message || 'An error occurred while processing the query');
    }

    if (!query) {
      throw new Error('Query not yet available');
    }

    return {
      query,
      status,
      processing_time,
      error_message
    };
  } catch (error) {
    throw handleAirtableError(error, ERROR_MESSAGES.RECORD_FETCH);
  }
}