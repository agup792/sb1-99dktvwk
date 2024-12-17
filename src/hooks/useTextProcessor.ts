import { useState, useCallback } from 'react';
import { createRecord, fetchQuery } from '../services/airtable/records';
import type { CreateRecordInput } from '../services/airtable/types';

export function useTextProcessor() {
  const [inputText, setInputText] = useState('');
  const [recordId, setRecordId] = useState<string>('');
  const [query, setQuery] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [timerComplete, setTimerComplete] = useState(false);

  const handleProcess = useCallback(async () => {
    setIsProcessing(true);
    setError(null);
    setFetchError(null);
    setQuery(null);
    setTimerComplete(false);
    
    try {
      const input: CreateRecordInput = { text: inputText };
      const id = await createRecord(input);
      setRecordId(id);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setIsProcessing(false);
    }
  }, [inputText]);

  const handleFetchQuery = useCallback(async () => {
    if (!recordId) return;
    
    setIsFetching(true);
    setFetchError(null);
    
    try {
      const response = await fetchQuery(recordId);
      setQuery(response.query);
      
      if (response.error_message) {
        setFetchError(response.error_message);
      }
    } catch (err) {
      setFetchError(err instanceof Error ? err.message : 'Failed to fetch query');
      setQuery(null);
    } finally {
      setIsFetching(false);
    }
  }, [recordId]);

  return {
    inputText,
    setInputText,
    query,
    error,
    fetchError,
    isProcessing,
    isFetching,
    timerComplete,
    setTimerComplete,
    handleProcess,
    handleFetchQuery,
  };
}