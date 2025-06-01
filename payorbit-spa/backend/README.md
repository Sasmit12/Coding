# PayOrbit Backend

A Node.js backend for the PayOrbit Mentor Payout Automation System. This system manages mentor sessions, calculates payouts, generates receipts, and provides a chat system for communication between mentors and administrators.

## Features

- Session management (creation, retrieval, filtering)
- Payout calculation with tax and platform fee handling
- Receipt generation and management
- Real-time chat system
- Comprehensive audit logging
- Role-based access control (Admin vs. Mentor)
- Firebase Firestore integration

## Prerequisites

- Node.js (v16 or higher)
- Firebase project with Firestore enabled
- Firebase Admin SDK credentials

## Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```
PORT=3000
NODE_ENV=development

# Firebase Configuration
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY=your-private-key
FIREBASE_CLIENT_EMAIL=your-client-email

# JWT Configuration
JWT_SECRET=your-jwt-secret
JWT_EXPIRES_IN=24h

# CORS Configuration
ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000
```

4. Set up Firebase:
   - Create a Firebase project in the Firebase Console
   - Enable Firestore database
   - Generate a private key for the Firebase Admin SDK
   - Add the Firebase configuration to your `.env` file

## Database Structure

The system uses the following Firestore collections:

- `mentors`: Mentor profiles and rate information
- `sessions`: Session details and status
- `payouts`: Calculated payout information
- `receipts`: Generated receipt documents
- `chats`: Chat messages between users
- `auditLogs`: System-wide audit trail

## Running the Application

1. Start the development server:
```bash
npm run dev
```

2. Seed the database with sample data:
```bash
npm run seed
```

The server will start on `http://localhost:3000` by default.

## API Endpoints

### Sessions
- `POST /sessions` - Add new mentor session
- `GET /sessions` - Search/filter sessions

### Mentors
- `GET /mentors/:id` - Get mentor profile

### Payouts
- `POST /payouts/calculate` - Calculate payout for sessions
- `GET /payouts/:id` - Get payout details
- `POST /payouts/:id/process` - Process a calculated payout

### Receipts
- `POST /receipts/:payoutId` - Generate receipt
- `GET /receipts/:mentorId` - Get mentor receipts

### Chat
- `POST /chat/message` - Send a message
- `GET /chat/history/:threadId` - Get chat history
- `GET /chat/threads` - Get user's chat threads

### Audit Logs
- `GET /audit-logs` - Retrieve system audit logs

## Security

The application implements several security measures:

- Firebase Authentication integration
- Role-based access control
- Input validation using express-validator
- CORS configuration
- Comprehensive audit logging

## Error Handling

The application includes centralized error handling with:

- Appropriate HTTP status codes
- Detailed error messages (in development)
- Error logging
- Audit trail creation

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License. 