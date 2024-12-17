import axios, { AxiosError } from 'axios';
import { ZAPIER_WEBHOOK_URL } from '../config/constants';

export async function processText(text: string): Promise<string> {
  try {
    const response = await axios.post(
      ZAPIER_WEBHOOK_URL, 
      { text },
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        // Add timeout to prevent long-running requests
        timeout: 10000
      }
    );
    
    if (response.data && typeof response.data === 'object') {
      return response.data.query || 'No query generated';
    }
    
    return 'No query generated';
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      
      // More specific error messages
      if (axiosError.code === 'ECONNABORTED') {
        throw new Error('Request timed out. Please try again.');
      }
      
      if (axiosError.response) {
        const status = axiosError.response.status;
        switch (status) {
          case 403:
            throw new Error('Access to the Zapier webhook is forbidden. Please check the webhook URL.');
          case 404:
            throw new Error('Zapier webhook URL not found. Please verify the URL.');
          case 429:
            throw new Error('Too many requests. Please try again later.');
          default:
            throw new Error(`Server error: ${status}`);
        }
      }
      
      if (axiosError.request) {
        throw new Error('Unable to reach the server. Please check your internet connection and try again.');
      }
      
      throw new Error('Failed to process the request. Please try again.');
    }
    
    throw new Error('An unexpected error occurred. Please try again.');
  }
}