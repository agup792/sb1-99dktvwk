import React, { useState } from 'react';
import { TextArea } from './TextArea';
import { ProcessButton } from './buttons/ProcessButton';
import { ProcessingStatus } from './ProcessingStatus';
import { QueryResult } from './QueryResult';
import { ErrorMessage } from './ErrorMessage';
import { useTextProcessor } from '../hooks/useTextProcessor';
import { TIMER_DURATION } from '../config/constants';

export function TextProcessor() {
  const {
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
    handleFetchQuery
  } = useTextProcessor();

  const [showProcessingStatus, setShowProcessingStatus] = useState(false);

  const onProcessClick = async () => {
    setShowProcessingStatus(true);
    await handleProcess();
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-7xl mx-auto p-6">
      {/* Left Panel - Input */}
      <div className="space-y-4">
        <TextArea value={inputText} onChange={setInputText} />
        <ProcessButton 
          onClick={onProcessClick}
          isProcessing={isProcessing}
          disabled={isProcessing || !inputText.trim()}
        />
      </div>

      {/* Right Panel - Output */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-[#172B4D]">Query Output</h2>
        
        {error && <ErrorMessage message={error} />}
        
        {showProcessingStatus && !error && (
          <ProcessingStatus
            isProcessing={isProcessing}
            timerComplete={timerComplete}
            onTimerComplete={() => setTimerComplete(true)}
            onFetch={handleFetchQuery}
            isFetching={isFetching}
            duration={TIMER_DURATION}
          />
        )}
        
        <QueryResult query={query} error={fetchError} />
      </div>
    </div>
  );
}