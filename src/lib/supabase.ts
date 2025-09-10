import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Mock data for development
export const mockCommittees = [
  {
    id: '1',
    name: 'United Nations Security Council',
    slug: 'unsc',
    description: 'The Security Council has primary responsibility for the maintenance of international peace and security.',
    topic_areas: ['International Peace', 'Security', 'Conflict Resolution'],
    min_delegates: 15,
    max_delegates: 15,
    eligible_grades: ['9', '10', '11', '12']
  },
  {
    id: '2',
    name: 'General Assembly',
    slug: 'ga',
    description: 'The General Assembly is the main deliberative organ of the United Nations.',
    topic_areas: ['Global Issues', 'Human Rights', 'Development'],
    min_delegates: 50,
    max_delegates: 100,
    eligible_grades: ['9', '10', '11', '12']
  },
  {
    id: '3',
    name: 'Economic and Social Council',
    slug: 'ecosoc',
    description: 'ECOSOC coordinates economic and social work of UN specialized agencies.',
    topic_areas: ['Economic Development', 'Social Issues', 'Environmental Concerns'],
    min_delegates: 25,
    max_delegates: 54,
    eligible_grades: ['10', '11', '12']
  }
];

export const mockFAQs = [
  {
    id: '1',
    question: 'What is Model United Nations?',
    answer: 'Model United Nations (MUN) is an educational simulation where students role-play as delegates to the United Nations and simulate UN committees.',
    category: 'General',
    tags: ['basics', 'introduction']
  },
  {
    id: '2',
    question: 'How do I register my school?',
    answer: 'To register your school, click on the Registration page, fill out the school information form, and submit your delegate preferences.',
    category: 'Registration',
    tags: ['registration', 'school']
  },
  {
    id: '3',
    question: 'What documents do I need to bring?',
    answer: 'You will need to bring student ID cards, permission slips for minors, and any required medical forms.',
    category: 'Event',
    tags: ['documents', 'requirements']
  }
];

export const mockAnnouncements = [
  {
    id: '1',
    title: 'Registration Now Open!',
    content: 'We are excited to announce that registration for MUN 2024 is now open. Early bird pricing available until March 15th.',
    scope: 'global' as const,
    pinned: true,
    created_at: new Date().toISOString()
  },
  {
    id: '2',
    title: 'Study Guide Released',
    content: 'The official study guide for all committees has been released. Download it from the Resources page.',
    scope: 'global' as const,
    pinned: false,
    created_at: new Date().toISOString()
  }
];