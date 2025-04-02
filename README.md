# Interactive Quiz Platform with Leaderboards

A modern quiz application where users can participate in quizzes across various categories and compete for top positions on the leaderboard, while admins can easily create and manage quiz content.

## Features

- **Clean, Intuitive UI**: Vibrant blue color scheme featuring a home dashboard, quiz creation interface, and competitive leaderboard
- **Admin Panel**: Create quizzes with customizable settings (question types, time limits, categories)
- **Leaderboard System**: Filter options (Local/Global/Friends) showing top performers with profile pictures and scores
- **Category Organization**: Quizzes organized by categories (Science, Geography, Sports, Biology) with visual icons
- **User Authentication**: Personalized welcome screens and progress tracking

## Tech Stack

- React with TypeScript
- Vite for fast development and building
- Tailwind CSS for styling
- Supabase for backend and authentication
- React Router for navigation
- Shadcn UI components

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Project Structure

- `/src/components/auth`: Authentication components
- `/src/components/dashboard`: Dashboard UI components
- `/src/components/quiz`: Quiz-related components
- `/src/components/ui`: Reusable UI components
- `/src/contexts`: React context providers
- `/src/lib`: Utility functions and services

## Database Schema

The application uses Supabase with tables for:
- Users/Profiles
- Categories
- Quizzes
- Questions
- User Scores/Progress

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
