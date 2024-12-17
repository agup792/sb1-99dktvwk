import React from 'react';
import { TextProcessor } from './components/TextProcessor';
import { Header } from './components/Header';

export function App() {
  return (
    <div className="min-h-screen bg-[#F4F5F7]">
      <Header />
      <main>
        <TextProcessor />
      </main>
    </div>
  );
}

export default App;