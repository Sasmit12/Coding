
# QuickCred - Loan Application System

## Introduction
**QuickCred** is a frontend loan application system built using HTML, CSS, JavaScript, and Firebase. It allows users to sign up, log in, reset passwords, and access a home dashboard. Firebase Authentication is used to securely manage user login and registration. The project simulates a real-world loan management experience with a clean, responsive UI and interactive features.

## Project Type
Frontend

## Deployed App  
- Netlify Link: https://app.netlify.com/sites/deft-pastelito-1d0148/
- GitHub Link: https://github.com/masai-course/sasmit_nakhate_fs42_520034/tree/master/QuickCred-Loan-Application-System

## Directory Structure
```
QuickCred - Loan Application System/
├── html/
│   ├── login.html
│   ├── signup.html
│   ├── forgotpassword.html
│   └── home.html
├── css/
├── login.css
│   ├── signup.css
│   ├── forgotpassword.css
│   └── home.css
├── js/
├── login.js
│   ├── signup.js
│   ├── forgotpassword.js
│   └── home.js
├── assets/
│   ├── login.html
│   ├── signup.html
│   ├── forgotpassword.html
│   └── home.html
```

## Video Walkthrough of the Project
📹 [Project Demo - YouTube (1–3 min)](https://youtube.com/link-to-project-demo)

## Video Walkthrough of the Codebase
📹 [Codebase Walkthrough - YouTube (1–5 min)](https://youtube.com/link-to-code-tour)

## Features
- ✅ Firebase-based Login & Signup  
- ✅ Forgot Password with Firebase Email Recovery  
- ✅ Home/Dashboard after login  
- ✅ Form validation using JavaScript  
- ✅ Clean UI with responsive design  
- ✅ Firebase Authentication integration

## Design Decisions & Assumptions
- Firebase used only for authentication (no Firestore or Realtime DB used)
- Frontend-only logic with Firebase SDK handling auth flows
- Users are redirected manually after successful auth events
- Form validations handled with JavaScript
- Email/password only auth method enabled in Firebase console

## Installation & Getting Started

1. Clone the repository
2. Set up Firebase project & update config in `firebase.js`
3. Open the HTML files in browser (served via Netlify or Live Server)

```bash
git clone https://github.com/yourusername/QuickCred---Loan-Application-System.git
cd "QuickCred - Loan Application System"
```

## Usage

- Visit `signup.html` to register a new user  
- Go to `login.html` to log in  
- Use `forgotpassword.html` to trigger Firebase password reset  
- After login, access the `home.html` dashboard  

## Firebase Setup

To run this project locally with Firebase:
1. Create a project on [Firebase Console](https://console.firebase.google.com)
2. Enable **Authentication → Email/Password**
3. Copy your config and paste it in `js/firebase.js`

```js
const firebaseConfig = {
  apiKey: "AIzaSyDWrweJMXxZcMTdbL5jfqoe5mb2YYFsuYY",
  authDomain: "quickcred-56139.firebaseapp.com",
  databaseURL: "https://quickcred-56139-default-rtdb.firebaseio.com",
  projectId: "quickcred-56139",
  storageBucket: "quickcred-56139.firebasestorage.app",
  messagingSenderId: "853955541453",
  appId: "1:853955541453:web:b2201a66aa1995349dec84",
  measurementId: "G-BLCFHC7WCT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

```

## Screenshots
> _Included in assets

## Credentials
> _No preset credentials; register a new account via the signup page_

## APIs Used
- ✅ [Firebase Authentication](https://firebase.google.com/products/auth)

## API Endpoints
Handled via Firebase SDK (no custom backend endpoints)

## Technology Stack
- HTML5  
- CSS3 (Flexbox, Grid, Responsive Design)  
- JavaScript  
- **Firebase Authentication**
