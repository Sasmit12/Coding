# HarvestLink

HarvestLink is a modern e-commerce platform connecting farmers directly with consumers, built with React, Node.js, and Supabase.

## Features

### User Authentication & Profiles
- Secure user authentication with Supabase Auth
- Role-based access control (Farmers, Consumers, Admins)
- Profile management with customizable settings
- Address management for shipping and billing

### Product Management
- Product listing with rich details (images, descriptions, pricing)
- Inventory management with real-time stock updates
- Category and tag-based organization
- Organic certification badges
- Location-based product filtering

### Shopping Experience
- Advanced search with filters (price, category, location, tags)
- Responsive product grid with loading states
- Product details with image gallery
- Stock validation and low stock warnings
- Add to cart with quantity controls
- Persistent cart using localStorage

### Cart & Checkout
- Cart management with quantity updates
- Real-time price calculations
- Dynamic shipping cost calculation
- Secure checkout process
- Form validation with error handling
- Order summary with itemized details
- Support for different payment methods

### Order Management
- Order tracking with real-time updates
- Order history with detailed status
- Email notifications for order updates
- Delivery status tracking
- Support for multiple delivery methods

### Reviews & Ratings
- Product reviews with star ratings
- Review moderation system
- Helpful votes for reviews
- Review filtering and sorting
- Review analytics for farmers

### Loyalty & Rewards
- Points-based loyalty system
- Points earned on purchases
- Points redemption for discounts
- Tier-based benefits
- Transaction history

### Analytics & Reporting
- Sales analytics dashboard
- User behavior tracking
- Inventory reports
- Revenue analytics
- Custom report generation

### Mobile Responsiveness
- Fully responsive design
- Touch-friendly interfaces
- Optimized for all screen sizes
- Mobile-first approach

### Accessibility
- ARIA labels and roles
- Keyboard navigation
- Screen reader support
- High contrast mode
- Focus management

## Tech Stack

### Frontend
- React 18
- React Router v6
- React Query for data fetching
- React Hook Form for forms
- Tailwind CSS for styling
- React Hot Toast for notifications
- React Icons for icons

### Backend
- Node.js with Express
- Supabase for database and auth
- PostgreSQL for data storage
- Redis for caching
- Firebase for analytics

### Development Tools
- ESLint for code linting
- Prettier for code formatting
- Jest for testing
- GitHub Actions for CI/CD
- Docker for containerization

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Supabase account
- Firebase account

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/harvestLink.git
cd harvestLink
```

2. Install dependencies:
```bash
# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```

3. Set up environment variables:
```bash
# Frontend (.env)
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_FIREBASE_CONFIG=your_firebase_config

# Backend (.env)
DATABASE_URL=your_database_url
JWT_SECRET=your_jwt_secret
FIREBASE_ADMIN_CONFIG=your_firebase_admin_config
```

4. Start the development servers:
```bash
# Start frontend
cd frontend
npm run dev

# Start backend
cd ../backend
npm run dev
```

## Project Structure

```
harvestLink/
├── frontend/
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── pages/         # Page components
│   │   ├── services/      # API services
│   │   ├── utils/         # Utility functions
│   │   ├── context/       # React context providers
│   │   └── assets/        # Static assets
│   └── public/            # Public assets
├── backend/
│   ├── src/
│   │   ├── controllers/   # Route controllers
│   │   ├── models/        # Database models
│   │   ├── routes/        # API routes
│   │   ├── services/      # Business logic
│   │   ├── middleware/    # Custom middleware
│   │   └── utils/         # Utility functions
│   └── tests/             # Backend tests
└── docs/                  # Documentation
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Testing

```bash
# Run frontend tests
cd frontend
npm test

# Run backend tests
cd backend
npm test
```

## Deployment

### Frontend Deployment
1. Build the frontend:
```bash
cd frontend
npm run build
```

2. Deploy to your hosting service (e.g., Vercel, Netlify)

### Backend Deployment
1. Build the backend:
```bash
cd backend
npm run build
```

2. Deploy to your hosting service (e.g., Heroku, DigitalOcean)

## Security

- All API endpoints are protected with JWT authentication
- Input validation and sanitization
- Rate limiting on API endpoints
- CORS configuration
- Secure password hashing
- HTTPS enforcement
- Regular security audits

## Performance

- Code splitting for faster initial load
- Image optimization
- Caching strategies
- Lazy loading of components
- Efficient database queries
- Redis caching for frequently accessed data

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [React](https://reactjs.org/)
- [Supabase](https://supabase.io/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Query](https://tanstack.com/query/latest)
- [React Hook Form](https://react-hook-form.com/)
- [React Hot Toast](https://react-hot-toast.com/)
