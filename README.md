# Harambee Student Portal

A fully functional mobile student portal application built with React Native, Expo, NativeWind, and Supabase.

## Features

- **Authentication**: Secure login with Supabase
- **Dashboard**: Quick access to all portal features
- **Grades**: View course grades and GPA
- **Course Management**: Add and drop courses
- **Payments**: Track and manage tuition payments
- **Department**: View department information
- **Schedule**: Class schedule and timetable
- **Inbox**: Messages and notifications
- **Profile**: User profile management
- **Slips**: Request and download academic slips
- **Withdrawal**: Submit withdrawal requests

## Tech Stack

- **React Native**: Mobile app framework
- **Expo**: Development platform
- **Expo Router**: File-based routing
- **NativeWind**: Tailwind CSS for React Native
- **Supabase**: Backend and authentication
- **TypeScript**: Type safety

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Expo CLI
- Expo Go app (for testing on physical device)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd harambee-portal-2
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
   - Copy `.env.example` to `.env`
   - Add your Supabase credentials:
     ```
     EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
     EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
     ```

### Supabase Setup

1. Create a new Supabase project at https://supabase.com
2. Get your project URL and anon key from Settings > API
3. Create the following tables in your Supabase database:

```sql
-- Users table (extends Supabase auth.users)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users PRIMARY KEY,
  full_name TEXT,
  student_id TEXT UNIQUE,
  department TEXT,
  year INTEGER,
  semester INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Courses table
CREATE TABLE courses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  code TEXT NOT NULL,
  name TEXT NOT NULL,
  credits INTEGER NOT NULL,
  instructor TEXT,
  schedule TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Student courses (enrollment)
CREATE TABLE student_courses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID REFERENCES profiles(id),
  course_id UUID REFERENCES courses(id),
  grade TEXT,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Payments table
CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID REFERENCES profiles(id),
  description TEXT NOT NULL,
  amount DECIMAL NOT NULL,
  due_date DATE,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Running the App

1. Start the development server:
```bash
npm start
```

2. Run on specific platform:
```bash
npm run android  # For Android
npm run ios      # For iOS (macOS only)
npm run web      # For web browser
```

3. Scan the QR code with Expo Go app (Android) or Camera app (iOS)

## Project Structure

```
harambee-portal-2/
├── app/                    # App screens (Expo Router)
│   ├── (auth)/            # Authentication screens
│   │   └── login.tsx
│   ├── (tabs)/            # Tab navigation screens
│   │   ├── home.tsx
│   │   ├── schedule.tsx
│   │   ├── inbox.tsx
│   │   └── profile.tsx
│   ├── grades.tsx
│   ├── course-add.tsx
│   ├── course-drop.tsx
│   ├── department.tsx
│   ├── payments.tsx
│   ├── slips.tsx
│   ├── withdrawal.tsx
│   ├── _layout.tsx        # Root layout
│   └── index.tsx          # Entry point
├── lib/                   # Utilities and configurations
│   └── supabase.ts        # Supabase client
├── global.css             # Global styles
├── tailwind.config.js     # Tailwind configuration
├── babel.config.js        # Babel configuration
├── metro.config.js        # Metro bundler config
└── package.json

```

## Design Features

- **Modern UI**: Clean and professional design
- **Gradient Backgrounds**: Beautiful gradient effects
- **Smooth Animations**: Engaging user experience
- **Responsive Layout**: Works on all screen sizes
- **Icon System**: Ionicons for consistent iconography
- **Color Scheme**: Professional blue and gold palette

## Customization

### Colors

Edit `tailwind.config.js` to customize the color palette:

```javascript
colors: {
  primary: {
    DEFAULT: '#2563EB',
    light: '#60A5FA',
    dark: '#1E40AF',
  },
  // ... more colors
}
```

### Fonts

To use custom fonts, install expo-font and update the font configuration.

## Testing

Test credentials (if you set up test data in Supabase):
- Email: test@student.edu
- Password: your_test_password

## Deployment

### Building for Production

1. Configure app.json with your app details
2. Build for Android:
```bash
eas build --platform android
```

3. Build for iOS:
```bash
eas build --platform ios
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT License

## Support

For support, email support@harambee.edu or open an issue in the repository.
