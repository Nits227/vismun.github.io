export interface User {
  id: string;
  email: string;
  role: 'admin' | 'coordinator' | 'delegate';
  full_name?: string;
  phone?: string;
  created_at: string;
  updated_at: string;
}

export interface School {
  id: string;
  name: string;
  slug?: string;
  address?: string;
  contact_email: string;
  contact_phone?: string;
  coordinator_uid?: string;
  created_at: string;
  updated_at: string;
}

export interface Event {
  id: string;
  name: string;
  start_date?: string;
  end_date?: string;
  venue?: string;
  location?: string;
  rules?: string;
  schedule?: any;
  created_at: string;
  updated_at: string;
}

export interface Committee {
  id: string;
  name: string;
  slug?: string;
  description?: string;
  topic_areas?: string[];
  min_delegates?: number;
  max_delegates?: number;
  eligible_grades?: string[];
  created_at: string;
  updated_at: string;
}

export interface Registration {
  id: string;
  school_id: string;
  event_id?: string;
  status: 'draft' | 'submitted' | 'confirmed' | 'cancelled';
  form_data?: any;
  created_at: string;
  updated_at: string;
  school?: School;
  event?: Event;
}

export interface Delegate {
  id: string;
  registration_id: string;
  user_id?: string;
  name: string;
  grade?: string;
  email?: string;
  is_minor?: boolean;
  parent_name?: string;
  parent_contact?: string;
  committee_id?: string;
  country_id?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
  committee?: Committee;
  country?: Country;
}

export interface Country {
  id: string;
  name: string;
  iso_code?: string;
  created_at: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  scope: 'global' | 'event' | 'school';
  event_id?: string;
  school_id?: string;
  start_at?: string;
  end_at?: string;
  pinned?: boolean;
  created_at: string;
  updated_at: string;
}

export interface Document {
  id: string;
  registration_id?: string;
  delegate_id?: string;
  uploaded_by?: string;
  doc_type: 'study_guide' | 'confirmation' | 'certificate' | 'other';
  url: string;
  visibility: 'public' | 'registration' | 'delegate' | 'private';
  metadata?: any;
  created_at: string;
  updated_at: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category?: string;
  tags?: string[];
  created_at: string;
  updated_at: string;
}

export interface Inquiry {
  id: string;
  name?: string;
  email?: string;
  school_id?: string;
  subject?: string;
  message: string;
  status: 'new' | 'open' | 'closed';
  created_at: string;
  updated_at: string;
}