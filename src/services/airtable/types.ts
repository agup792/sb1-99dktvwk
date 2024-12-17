import type { AirtableRecord as BaseAirtableRecord, AirtableError as BaseAirtableError } from '../../types/airtable';

export interface CreateRecordInput {
  text: string;
}

export interface UpdateRecordInput {
  id: string;
  fields: Partial<BaseAirtableRecord>;
}

export interface QueryResponse {
  query: string;
  status: BaseAirtableRecord['status'];
  processing_time?: number;
  error_message?: string;
}

export type { BaseAirtableRecord as AirtableRecord, BaseAirtableError };