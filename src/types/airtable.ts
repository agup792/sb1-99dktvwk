export interface AirtableRecord {
  id: string;
  text: string;
  query?: string;
  status: 'pending' | 'completed' | 'error';
  error_message?: string;
  processing_time?: number;
}

export interface AirtableError extends Error {
  statusCode?: number;
  error?: {
    type?: string;
    message?: string;
  };
}