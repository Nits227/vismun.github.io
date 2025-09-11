export interface User {
  id: string;
  email: string;
  fullName: string;
  schoolName: string;
  grade?: string;
  role: 'student' | 'teacher' | 'admin';
  createdAt: string;
}

export interface Registration {
  id: string;
  userId: string;
  fullName: string;
  email: string;
  schoolName: string;
  grade?: string;
  role: 'student' | 'teacher';
  registrationDate: string;
  status: 'pending' | 'confirmed' | 'cancelled';
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  venue: string;
  capacity: number;
  registeredCount: number;
  status: 'upcoming' | 'ongoing' | 'completed';
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  createdBy: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface ContactInquiry {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: 'new' | 'responded' | 'closed';
  createdAt: string;
}