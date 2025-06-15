import { devConfig, shouldLog } from '../config/development.js';

// Console utilities to handle errors gracefully
export const setupConsoleErrorHandling = () => {
  // Store original console methods
  const originalError = console.error;
  const originalWarn = console.warn;
  const originalLog = console.log;

  // Filter out Chrome extension errors
  const shouldSuppressError = (message) => {
    if (typeof message === 'string') {
      return (
        message.includes('chrome-extension://') ||
        message.includes('ERR_BLOCKED_BY_CLIENT') ||
        message.includes('Failed to load resource') ||
        message.includes('net::ERR_FAILED') ||
        message.includes('contentScript.bundle.js') ||
        message.includes('mixpanel.com') ||
        message.includes('analytics')
      );
    }
    return false;
  };

  // Override console.error to filter out extension errors
  console.error = (...args) => {
    if (shouldLog('error', args[0]) && !shouldSuppressError(args[0])) {
      originalError.apply(console, args);
    }
  };

  // Override console.warn to filter out extension warnings
  console.warn = (...args) => {
    if (shouldLog('warn', args[0]) && !shouldSuppressError(args[0])) {
      originalWarn.apply(console, args);
    }
  };

  // Override console.log to respect development config
  console.log = (...args) => {
    if (shouldLog('log', args[0])) {
      originalLog.apply(console, args);
    }
  };

  // Handle unhandled promise rejections
  window.addEventListener('unhandledrejection', (event) => {
    if (shouldSuppressError(event.reason?.message || event.reason)) {
      event.preventDefault();
      return;
    }
    // Log legitimate unhandled rejections
    if (shouldLog('error', event.reason?.message)) {
      console.error('Unhandled promise rejection:', event.reason);
    }
  });

  // Handle global errors
  window.addEventListener('error', (event) => {
    if (shouldSuppressError(event.message)) {
      event.preventDefault();
      return;
    }
    // Log legitimate errors
    if (shouldLog('error', event.message)) {
      console.error('Global error:', event.error);
    }
  });

  // Log that console error handling is set up
  if (devConfig.enableConsoleLogs) {
    console.log('Console error handling initialized');
  }
};

// Initialize console error handling
setupConsoleErrorHandling(); 