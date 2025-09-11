import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Megaphone, Calendar, AlertCircle, Info, CheckCircle, Search, Filter } from 'lucide-react';
import Layout from '../components/Layout/Layout';

const Announcements = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPriority, setSelectedPriority] = useState('');

  const announcements = [
    {
      id: '1',
      title: 'Registration Deadline Extended',
      content: 'Due to high demand, we have extended the registration deadline to March 10, 2024. Don\'t miss this opportunity to be part of the Innovation Summit!',
      priority: 'high',
      createdAt: '2024-02-28T10:00:00Z',
      createdBy: 'Event Organizers'
    },
    {
      id: '2',
      title: 'Workshop Schedule Released',
      content: 'The detailed workshop schedule is now available. Check out the exciting sessions on AI in Education, Digital Classroom Management, and Student Engagement Strategies.',
      priority: 'medium',
      createdAt: '2024-02-25T14:30:00Z',
      createdBy: 'Program Committee'
    },
    {
      id: '3',
      title: 'Parking Information Update',
      content: 'Additional parking spaces have been secured at the nearby community center. Free shuttle service will be provided every 15 minutes during event hours.',
      priority: 'low',
      createdAt: '2024-02-22T09:15:00Z',
      createdBy: 'Logistics Team'
    },
    {
      id: '4',
      title: 'Featured Speaker Announcement',
      content: 'We are excited to announce Dr. Sarah Johnson as our keynote speaker. She will present on "The Future of Educational Technology" on Day 1.',
      priority: 'high',
      createdAt: '2024-02-20T16:45:00Z',
      createdBy: 'Event Organizers'
    },
    {
      id: '5',
      title: 'Lunch Menu Available',
      content: 'The complete lunch menu for both days is now available for download. We have options for all dietary requirements including vegetarian, vegan, and gluten-free meals.',
      priority: 'low',
      createdAt: '2024-02-18T11:20:00Z',
      createdBy: 'Catering Team'
    },
    {
      id: '6',
      title: 'Student Showcase Applications Open',
      content: 'Students can now apply to present their innovative projects during the Student Showcase session. Applications are due by March 5, 2024.',
      priority: 'medium',
      createdAt: '2024-02-15T13:00:00Z',
      createdBy: 'Student Committee'
    }
  ];

  const priorities = ['All', 'High', 'Medium', 'Low'];

  const filteredAnnouncements = announcements.filter(announcement => {
    const matchesSearch = announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         announcement.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPriority = !selectedPriority || selectedPriority === 'All' || 
                           announcement.priority.toLowerCase() === selectedPriority.toLowerCase();
    return matchesSearch && matchesPriority;
  });

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high': return AlertCircle;
      case 'medium': return Info;
      case 'low': return CheckCircle;
      default: return Info;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700 border-red-200';
      case 'medium': return 'bg-accent-100 text-primary-900 border-accent-200';
      case 'low': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-neutral-100 text-neutral-700 border-neutral-200';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-20">
        <div className="container-max section-padding">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="flex items-center justify-center space-x-3 mb-6">
              <Megaphone className="w-8 h-8 text-accent-400" />
              <h1 className="text-4xl lg:text-5xl font-bold">
                Announcements
              </h1>
            </div>
            <p className="text-xl lg:text-2xl text-blue-100 leading-relaxed">
              Stay updated with the latest news and important information about 
              the Annual School Innovation Summit
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-8 bg-white border-b border-neutral-200">
        <div className="container-max section-padding">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search announcements..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pl-10"
              />
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Filter className="w-5 h-5 text-neutral-600" />
                <select
                  value={selectedPriority}
                  onChange={(e) => setSelectedPriority(e.target.value)}
                  className="input-field min-w-[120px]"
                >
                  {priorities.map(priority => (
                    <option key={priority} value={priority === 'All' ? '' : priority}>
                      {priority} Priority
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="text-sm text-neutral-600">
                {filteredAnnouncements.length} announcement{filteredAnnouncements.length !== 1 ? 's' : ''} found
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Announcements List */}
      <section className="py-16 bg-neutral-50">
        <div className="container-max section-padding">
          {filteredAnnouncements.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="w-16 h-16 bg-neutral-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-neutral-400" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-600 mb-2">No announcements found</h3>
              <p className="text-neutral-500">Try adjusting your search terms or filters</p>
            </motion.div>
          ) : (
            <div className="max-w-4xl mx-auto space-y-6">
              {filteredAnnouncements.map((announcement, index) => {
                const PriorityIcon = getPriorityIcon(announcement.priority);
                return (
                  <motion.div
                    key={announcement.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="card hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start space-x-4 flex-1">
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center border ${getPriorityColor(announcement.priority)}`}>
                          <PriorityIcon className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-xl font-bold text-primary-900">{announcement.title}</h3>
                            <span className={`px-2 py-1 rounded text-xs font-medium border ${getPriorityColor(announcement.priority)}`}>
                              {announcement.priority.toUpperCase()}
                            </span>
                          </div>
                          <p className="text-neutral-600 leading-relaxed mb-4">
                            {announcement.content}
                          </p>
                          <div className="flex items-center space-x-4 text-sm text-neutral-500">
                            <div className="flex items-center space-x-1">
                              <Calendar className="w-4 h-4" />
                              <span>{formatDate(announcement.createdAt)}</span>
                            </div>
                            <span>•</span>
                            <span>By {announcement.createdBy}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Subscribe Section */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="container-max section-padding text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Stay Updated
            </h2>
            <p className="text-xl text-blue-100 leading-relaxed mb-8">
              Never miss important updates! Subscribe to our announcement notifications 
              and get the latest news delivered directly to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="input-field flex-1 text-neutral-900"
              />
              <button className="btn-accent px-6 py-3">
                Subscribe
              </button>
            </div>
            <p className="text-sm text-blue-200 mt-4">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Announcements;