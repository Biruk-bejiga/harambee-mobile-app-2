# Harambee Student Portal - Setup Guide

## Quick Start

Follow these steps to get your student portal up and running:

### 1. Install Dependencies

The dependencies are already installed. If you need to reinstall:
```bash
npm install
```

### 2. Set Up Supabase

1. Go to [https://supabase.com](https://supabase.com) and create a free account
2. Create a new project
3. Wait for the project to finish setting up (2-3 minutes)
4. Go to Settings > API in your Supabase dashboard
5. Copy your:
   - Project URL
   - Anon/Public Key

### 3. Configure Environment Variables

Create a `.env` file in the root directory with:

```
EXPO_PUBLIC_SUPABASE_URL=your_project_url_here
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

### 4. Set Up Database Tables

Run these SQL commands in your Supabase SQL Editor (Database > SQL Editor):

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Profiles table
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

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

-- Policies for profiles
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Policies for courses (public read)
CREATE POLICY "Anyone can view courses" ON courses
  FOR SELECT TO authenticated USING (true);

-- Policies for student_courses
CREATE POLICY "Students can view own courses" ON student_courses
  FOR SELECT USING (auth.uid() = student_id);

-- Policies for payments
CREATE POLICY "Students can view own payments" ON payments
  FOR SELECT USING (auth.uid() = student_id);
```

### 5. Create Test User (Optional)

1. Go to Authentication > Users in Supabase
2. Click "Add User" > "Create new user"
3. Enter email and password
4. After creating, add a profile in the SQL Editor:

```sql
INSERT INTO profiles (id, full_name, student_id, department, year, semester)
VALUES (
  'user-uuid-from-auth-users-table',
  'John Doe',
  'STU-2021-001',
  'Accounting & Finance',
  3,
  3
);
```

### 6. Run the App

Start the development server:
```bash
npm start
```

Then:
- Press `a` for Android emulator
- Press `i` for iOS simulator (macOS only)
- Scan QR code with Expo Go app on your phone

### 7. Login

Use the test credentials you created in step 5, or create a new account through the app.

## Troubleshooting

### "No matching version found for expo"
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again

### "Supabase connection error"
- Check your `.env` file has correct credentials
- Ensure there are no extra spaces in the values
- Restart the Expo server

### "Cannot find module"
- Clear the cache: `npx expo start -c`

## Next Steps

- Customize the color scheme in `tailwind.config.js`
- Add more features to the app
- Deploy to App Store / Play Store using EAS Build

## Support

For issues, check the README.md or create an issue in the repository.
