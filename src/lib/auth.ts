import bcrypt from 'bcryptjs';
import Cookies from 'js-cookie';
import { User } from '../types';

// Mock database - in production, use a real database
let users: User[] = [
  {
    id: '1',
    email: 'admin@school.edu',
    fullName: 'Admin User',
    schoolName: 'School Administration',
    role: 'admin',
    createdAt: new Date().toISOString()
  }
];

let registrations: any[] = [];

export const hashPassword = async (password: string): Promise<string> => {
  return bcrypt.hash(password, 10);
};

export const comparePassword = async (password: string, hash: string): Promise<boolean> => {
  return bcrypt.compare(password, hash);
};

export const generateToken = (): string => {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
};

export const setAuthToken = (token: string, user: User) => {
  Cookies.set('auth_token', token, { expires: 7 });
  Cookies.set('user_data', JSON.stringify(user), { expires: 7 });
};

export const getAuthToken = (): string | undefined => {
  return Cookies.get('auth_token');
};

export const getCurrentUser = (): User | null => {
  const userData = Cookies.get('user_data');
  return userData ? JSON.parse(userData) : null;
};

export const removeAuthToken = () => {
  Cookies.remove('auth_token');
  Cookies.remove('user_data');
};

export const signUp = async (userData: {
  fullName: string;
  email: string;
  password: string;
  schoolName: string;
  grade?: string;
  role: 'student' | 'teacher';
}): Promise<{ success: boolean; user?: User; error?: string }> => {
  try {
    // Check if user already exists
    const existingUser = users.find(u => u.email === userData.email);
    if (existingUser) {
      return { success: false, error: 'User already exists with this email' };
    }

    // Hash password
    const hashedPassword = await hashPassword(userData.password);

    // Create new user
    const newUser: User = {
      id: Date.now().toString(),
      email: userData.email,
      fullName: userData.fullName,
      schoolName: userData.schoolName,
      grade: userData.grade,
      role: userData.role,
      createdAt: new Date().toISOString()
    };

    // Store user (in production, save to database)
    users.push(newUser);

    // Generate token and set cookies
    const token = generateToken();
    setAuthToken(token, newUser);

    return { success: true, user: newUser };
  } catch (error) {
    return { success: false, error: 'Registration failed' };
  }
};

export const signIn = async (email: string, password: string): Promise<{ success: boolean; user?: User; error?: string }> => {
  try {
    // Find user
    const user = users.find(u => u.email === email);
    if (!user) {
      return { success: false, error: 'Invalid email or password' };
    }

    // For demo purposes, accept any password for existing users
    // In production, verify against hashed password
    
    // Generate token and set cookies
    const token = generateToken();
    setAuthToken(token, user);

    return { success: true, user };
  } catch (error) {
    return { success: false, error: 'Login failed' };
  }
};

export const signOut = () => {
  removeAuthToken();
};

// Mock data functions
export const getRegistrations = () => registrations;

export const addRegistration = (registration: any) => {
  registrations.push({
    ...registration,
    id: Date.now().toString(),
    registrationDate: new Date().toISOString(),
    status: 'pending'
  });
};

export const exportRegistrations = () => {
  const csvContent = [
    ['Name', 'Email', 'School', 'Grade', 'Role', 'Registration Date', 'Status'],
    ...registrations.map(reg => [
      reg.fullName,
      reg.email,
      reg.schoolName,
      reg.grade || 'N/A',
      reg.role,
      new Date(reg.registrationDate).toLocaleDateString(),
      reg.status
    ])
  ].map(row => row.join(',')).join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'registrations.csv';
  a.click();
  window.URL.revokeObjectURL(url);
};