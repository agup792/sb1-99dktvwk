import { CreateRecordInput, UpdateRecordInput } from './types';
import { MAX_TEXT_LENGTH } from '../../config/constants';

export function validateCreateInput(input: CreateRecordInput): void {
  if (!input.text) {
    throw new Error('Text is required');
  }

  if (input.text.length > MAX_TEXT_LENGTH) {
    throw new Error(`Text exceeds maximum length of ${MAX_TEXT_LENGTH} characters`);
  }
}

export function validateUpdateInput(input: UpdateRecordInput): void {
  if (!input.id) {
    throw new Error('Record ID is required');
  }

  if (!input.fields || Object.keys(input.fields).length === 0) {
    throw new Error('At least one field must be provided for update');
  }
}