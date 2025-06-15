// Development configuration
export const devConfig = {
  // Enable/disable console logging in development
  enableConsoleLogs: process.env.NODE_ENV === 'development',
  
  // Suppress specific error types in development
  suppressErrors: {
    chromeExtensions: true,
    analytics: true,
    networkErrors: false, // Keep network errors visible
  },
  
  // Firebase configuration for development
  firebase: {
    enableAnalytics: false, // Disable analytics in development to avoid ad blocker issues
    enablePerformance: false,
  },
  
  // React Query configuration for development
  reactQuery: {
    retry: 1,
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
  },
};

// Helper function to check if we should log something
export const shouldLog = (type, message) => {
  if (!devConfig.enableConsoleLogs) return false;
  
  if (type === 'error' && devConfig.suppressErrors.chromeExtensions) {
    return !message?.includes('chrome-extension://') && 
           !message?.includes('ERR_BLOCKED_BY_CLIENT');
  }
  
  if (type === 'error' && devConfig.suppressErrors.analytics) {
    return !message?.includes('mixpanel.com') && 
           !message?.includes('analytics');
  }
  
  return true;
}; 