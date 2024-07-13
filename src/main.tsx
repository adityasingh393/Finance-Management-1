import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import './styles/globals.css';
import { initializeDummyData } from '../src/utils/dummyData.ts'

// Setting session storage for testing and Initializing this dummy data in localForage for testing
const setupTestEnvironment = async () => {
  sessionStorage.setItem("currentUser", "john.doe@example.com");
  await initializeDummyData();
};

setupTestEnvironment().then(() => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
});
