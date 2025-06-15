import React from 'react';

const LoginTroubleshooting = ({ error }) => {
  // Don't show if no error
  if (!error) return null;

  const getTroubleshootingTips = (errorMessage) => {
    const tips = [];

    if (errorMessage.toLowerCase().includes('invalid') || errorMessage.toLowerCase().includes('wrong')) {
      tips.push(
        "• Check that your email address is spelled correctly",
        "• Make sure your password is correct (passwords are case-sensitive)",
        "• Try copying and pasting your password to avoid typos"
      );
    }

    if (errorMessage.toLowerCase().includes('not found') || errorMessage.toLowerCase().includes('no user')) {
      tips.push(
        "• Verify that you're using the correct email address",
        "• Make sure you have created an account with this email",
        "• Check if you need to register first"
      );
    }

    if (errorMessage.toLowerCase().includes('network') || errorMessage.toLowerCase().includes('connection')) {
      tips.push(
        "• Check your internet connection",
        "• Try refreshing the page",
        "• Disable any VPN or proxy if you're using one"
      );
    }

    if (errorMessage.toLowerCase().includes('too many') || errorMessage.toLowerCase().includes('attempts')) {
      tips.push(
        "• Wait a few minutes before trying again",
        "• Try using the 'Forgot Password' feature",
        "• Contact support if the issue persists"
      );
    }

    // Default tips if no specific error is matched
    if (tips.length === 0) {
      tips.push(
        "• Double-check your email and password",
        "• Make sure Caps Lock is off",
        "• Try using the 'Forgot Password' feature",
        "• Contact support if the problem continues"
      );
    }

    return tips;
  };

  const tips = getTroubleshootingTips(error);

  return (
    <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
      <h4 className="text-sm font-medium text-blue-900 mb-2">
        Having trouble signing in?
      </h4>
      <ul className="text-sm text-blue-800 space-y-1">
        {tips.map((tip, index) => (
          <li key={index} className="flex items-start">
            <span className="mr-2 text-blue-600">•</span>
            {tip}
          </li>
        ))}
      </ul>
      <div className="mt-3 pt-3 border-t border-blue-200">
        <a
          href="/forgot-password"
          className="text-sm text-blue-600 hover:text-blue-800 font-medium"
        >
          Forgot your password?
        </a>
      </div>
    </div>
  );
};

export default LoginTroubleshooting; 