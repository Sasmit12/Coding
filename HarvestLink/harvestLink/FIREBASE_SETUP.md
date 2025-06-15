# Firebase Setup Guide for HarvestLink

## Current Issue
The Firebase project is not properly configured, causing authentication errors.

## Steps to Fix

### 1. Go to Firebase Console
Visit [https://console.firebase.google.com/](https://console.firebase.google.com/)

### 2. Create or Select Project
- If you don't have a project, create a new one named "harvestlink-f56c9"
- If you have the project, select it

### 3. Enable Authentication
1. In the Firebase Console, go to "Authentication" in the left sidebar
2. Click "Get started" or "Sign-in method"
3. Enable the following providers:
   - Email/Password
   - Google (optional)
   - Any other providers you want

### 4. Set up Firestore Database
1. Go to "Firestore Database" in the left sidebar
2. Click "Create database"
3. Choose "Start in test mode" for development
4. Select a location close to your users

### 5. Update Configuration (if needed)
If your project ID is different, update the `firebaseConfig` in `src/config/firebase.js`:

```javascript
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id",
  measurementId: "your-measurement-id",
};
```

### 6. Security Rules
For development, you can use these basic Firestore rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

**Note:** These rules allow all access. For production, you should implement proper security rules.

### 7. Test the Setup
After completing the setup:
1. Restart your development server
2. Try to register a new user
3. Check the browser console for any remaining errors

## Current Configuration
Your current Firebase config is pointing to:
- Project ID: `harvestlink-f56c9`
- API Key: `AIzaSyDYVmuBiND28hYN5gUZubYbUhhpnmNo6do`

If this project doesn't exist or you don't have access to it, you'll need to create a new Firebase project and update the configuration.

## Error Handling
The app now includes error handling for Firebase initialization failures, so it won't crash if Firebase is not properly configured. 