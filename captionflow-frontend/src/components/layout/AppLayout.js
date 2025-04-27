import React from 'react';
import Header from './Header';

const AppLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <main className="flex-grow pt-24">
        {children}
      </main>
    </div>
  );
};

export default AppLayout; 