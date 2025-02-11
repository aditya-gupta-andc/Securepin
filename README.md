# PIN Authentication System

A sophisticated mobile-responsive PIN authentication system with custom numeric keypad and advanced user experience features.

## Features

- React.js frontend with TypeScript
- Custom numeric input interface with on-screen keypad
- Mobile-responsive design
- Secure PIN entry mechanism
- Modern UI with animations

## Setup

1. Clone the repository:
```bash
git clone [your-repository-url]
cd [repository-name]
```

2. Install dependencies:
```bash
npm install
```

3. Create a PostgreSQL database and set up environment variables:
Create a `.env` file in the root directory with:
```env
DATABASE_URL=your_database_url
```

4. Run database migrations:
```bash
npm run db:push
```

5. Start the development server:
```bash
npm run dev
```

## Building for Production

1. Build the application:
```bash
npm run build
```

2. Start the production server:
```bash
npm start
```

## Technologies Used

- React.js
- TypeScript
- Express.js
- PostgreSQL
- Drizzle ORM
- Tailwind CSS
- Framer Motion
- ShadcnUI Components

## License

MIT
