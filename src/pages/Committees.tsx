import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Users, BookOpen, Filter } from 'lucide-react';
import Layout from '../components/Layout/Layout';
import { mockCommittees } from '../lib/supabase';

const Committees = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('');

  const filteredCommittees = mockCommittees.filter(committee => {
    const matchesSearch = committee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         committee.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         committee.topic_areas?.some(topic => 
                           topic.toLowerCase().includes(searchTerm.toLowerCase())
                         );
    
    const matchesGrade = !selectedGrade || 
                        committee.eligible_grades?.includes(selectedGrade);
    
    return matchesSearch && matchesGrade;
  });

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
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              Conference Committees
            </h1>
            <p className="text-xl lg:text-2xl text-blue-100 leading-relaxed">
              Explore our diverse range of committees covering critical global issues 
              and international relations topics.
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
                placeholder="Search committees, topics, or descriptions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pl-10"
              />
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Filter className="w-5 h-5 text-neutral-600" />
                <select
                  value={selectedGrade}
                  onChange={(e) => setSelectedGrade(e.target.value)}
                  className="input-field min-w-[120px]"
                >
                  <option value="">All Grades</option>
                  <option value="9">Grade 9</option>
                  <option value="10">Grade 10</option>
                  <option value="11">Grade 11</option>
                  <option value="12">Grade 12</option>
                </select>
              </div>
              
              <div className="text-sm text-neutral-600">
                {filteredCommittees.length} committee{filteredCommittees.length !== 1 ? 's' : ''} found
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Committees Grid */}
      <section className="py-16 bg-neutral-50">
        <div className="container-max section-padding">
          {filteredCommittees.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="w-16 h-16 bg-neutral-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-neutral-400" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-600 mb-2">No committees found</h3>
              <p className="text-neutral-500">Try adjusting your search terms or filters</p>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {filteredCommittees.map((committee, index) => (
                <motion.div
                  key={committee.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="card hover:shadow-lg transition-all duration-300"
                >
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <h3 className="text-xl font-bold text-primary-900 leading-tight">
                        {committee.name}
                      </h3>
                      <div className="flex items-center space-x-1 text-sm text-neutral-600 bg-neutral-100 px-2 py-1 rounded">
                        <Users className="w-4 h-4" />
                        <span>{committee.min_delegates}-{committee.max_delegates}</span>
                      </div>
                    </div>

                    <p className="text-neutral-600 leading-relaxed">
                      {committee.description}
                    </p>

                    {committee.topic_areas && committee.topic_areas.length > 0 && (
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2 text-sm font-medium text-neutral-700">
                          <BookOpen className="w-4 h-4" />
                          <span>Topic Areas:</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {committee.topic_areas.map((topic, topicIndex) => (
                            <span
                              key={topicIndex}
                              className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-medium"
                            >
                              {topic}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="border-t border-neutral-200 pt-4 flex items-center justify-between">
                      <div className="space-y-1">
                        <div className="text-sm font-medium text-neutral-700">Eligible Grades</div>
                        <div className="text-sm text-neutral-600">
                          {committee.eligible_grades?.join(', ') || 'All grades'}
                        </div>
                      </div>
                      
                      <div className="space-y-1 text-right">
                        <div className="text-sm font-medium text-neutral-700">Delegate Capacity</div>
                        <div className="text-sm text-neutral-600">
                          {committee.min_delegates} - {committee.max_delegates} delegates
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Committee Information */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="container-max section-padding">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Committee Assignment Process
            </h2>
            <p className="text-xl text-blue-100 leading-relaxed mb-8">
              Our committee assignment process ensures fair distribution while considering 
              school preferences and delegate experience levels.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              <div className="bg-white/10 rounded-lg p-6">
                <div className="w-12 h-12 bg-accent-400 text-primary-900 rounded-lg flex items-center justify-center font-bold text-xl mb-4">
                  1
                </div>
                <h3 className="font-bold mb-2">Submit Preferences</h3>
                <p className="text-blue-100 text-sm">
                  Schools rank their top committee choices during registration
                </p>
              </div>
              
              <div className="bg-white/10 rounded-lg p-6">
                <div className="w-12 h-12 bg-accent-400 text-primary-900 rounded-lg flex items-center justify-center font-bold text-xl mb-4">
                  2
                </div>
                <h3 className="font-bold mb-2">Assignment Review</h3>
                <p className="text-blue-100 text-sm">
                  Our team reviews preferences and delegate qualifications
                </p>
              </div>
              
              <div className="bg-white/10 rounded-lg p-6">
                <div className="w-12 h-12 bg-accent-400 text-primary-900 rounded-lg flex items-center justify-center font-bold text-xl mb-4">
                  3
                </div>
                <h3 className="font-bold mb-2">Final Assignments</h3>
                <p className="text-blue-100 text-sm">
                  Assignments are released 2 weeks before the conference
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Committees;