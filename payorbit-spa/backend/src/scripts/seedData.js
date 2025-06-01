import dotenv from 'dotenv';
import { initializeApp, cert } from 'firebase-admin/app';
import { collections, createDocument } from '../services/db.js';

// Load environment variables
dotenv.config();

// Initialize Firebase Admin
initializeApp({
  credential: cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  }),
});

const seedMentors = async () => {
  const mentors = [
    {
      id: 'mentor1',
      name: 'John Doe',
      email: 'john.doe@example.com',
      expertise: ['JavaScript', 'React', 'Node.js'],
      hourlyRate: 100,
      role: 'mentor',
    },
    {
      id: 'mentor2',
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      expertise: ['Python', 'Machine Learning', 'Data Science'],
      hourlyRate: 120,
      role: 'mentor',
    },
  ];

  for (const mentor of mentors) {
    await createDocument(collections.MENTORS, mentor);
    console.log(`Created mentor: ${mentor.name}`);
  }
};

const seedSessions = async () => {
  const sessions = [
    {
      mentorId: 'mentor1',
      date: new Date('2024-03-01T10:00:00Z'),
      sessionType: 'one-on-one',
      duration: 1,
      ratePerHour: 100,
      amount: 100,
      status: 'pending',
    },
    {
      mentorId: 'mentor1',
      date: new Date('2024-03-02T15:00:00Z'),
      sessionType: 'group',
      duration: 2,
      ratePerHour: 100,
      amount: 200,
      status: 'pending',
    },
    {
      mentorId: 'mentor2',
      date: new Date('2024-03-03T14:00:00Z'),
      sessionType: 'workshop',
      duration: 3,
      ratePerHour: 120,
      amount: 360,
      status: 'pending',
    },
  ];

  for (const session of sessions) {
    await createDocument(collections.SESSIONS, session);
    console.log(`Created session for mentor: ${session.mentorId}`);
  }
};

const seedDatabase = async () => {
  try {
    console.log('Starting database seeding...');
    
    await seedMentors();
    await seedSessions();
    
    console.log('Database seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

// Run the seeding
seedDatabase(); 