import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronDown, ChevronUp, HelpCircle, Filter } from 'lucide-react';
import Layout from '../components/Layout/Layout';
import { mockFAQs } from '../lib/supabase';

const FAQ = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const categories = ['All', 'General', 'Registration', 'Event', 'Logistics'];

  const filteredFAQs = mockFAQs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = !selectedCategory || selectedCategory === 'All' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleExpanded = (id: string) => {
    setExpandedItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const expandAll = () => {
    setExpandedItems(filteredFAQs.map(faq => faq.id));
  };

  const collapseAll = () => {
    setExpandedItems([]);
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
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              Frequently Asked Questions
            </h1>
            <p className="text-xl lg:text-2xl text-blue-100 leading-relaxed">
              Find answers to common questions about SchoolMUN 2024, registration, 
              and conference logistics.
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
                placeholder="Search questions, answers, or topics..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pl-10"
              />
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Filter className="w-5 h-5 text-neutral-600" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="input-field min-w-[120px]"
                >
                  {categories.map(category => (
                    <option key={category} value={category === 'All' ? '' : category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="flex space-x-2">
                <button
                  onClick={expandAll}
                  className="text-sm text-primary-600 hover:text-primary-700 transition-colors duration-200"
                >
                  Expand All
                </button>
                <span className="text-neutral-300">|</span>
                <button
                  onClick={collapseAll}
                  className="text-sm text-primary-600 hover:text-primary-700 transition-colors duration-200"
                >
                  Collapse All
                </button>
              </div>
              
              <div className="text-sm text-neutral-600">
                {filteredFAQs.length} question{filteredFAQs.length !== 1 ? 's' : ''} found
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16 bg-neutral-50">
        <div className="container-max section-padding">
          <div className="max-w-4xl mx-auto">
            {filteredFAQs.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <div className="w-16 h-16 bg-neutral-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <HelpCircle className="w-8 h-8 text-neutral-400" />
                </div>
                <h3 className="text-xl font-semibold text-neutral-600 mb-2">No questions found</h3>
                <p className="text-neutral-500">Try adjusting your search terms or filters</p>
              </motion.div>
            ) : (
              <div className="space-y-4">
                {filteredFAQs.map((faq, index) => (
                  <motion.div
                    key={faq.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-white rounded-lg border border-neutral-200 overflow-hidden"
                  >
                    <button
                      onClick={() => toggleExpanded(faq.id)}
                      className="w-full px-6 py-4 text-left hover:bg-neutral-50 transition-colors duration-200 focus:outline-none focus:bg-neutral-50"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-primary-900 mb-2">
                            {faq.question}
                          </h3>
                          <div className="flex items-center space-x-3">
                            {faq.category && (
                              <span className="bg-primary-100 text-primary-700 px-2 py-1 rounded text-xs font-medium">
                                {faq.category}
                              </span>
                            )}
                            {faq.tags && faq.tags.length > 0 && (
                              <div className="flex space-x-1">
                                {faq.tags.slice(0, 2).map((tag, tagIndex) => (
                                  <span
                                    key={tagIndex}
                                    className="bg-neutral-100 text-neutral-600 px-2 py-1 rounded text-xs"
                                  >
                                    {tag}
                                  </span>
                                ))}
                                {faq.tags.length > 2 && (
                                  <span className="text-neutral-500 text-xs">
                                    +{faq.tags.length - 2} more
                                  </span>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="ml-4">
                          {expandedItems.includes(faq.id) ? (
                            <ChevronUp className="w-5 h-5 text-neutral-600" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-neutral-600" />
                          )}
                        </div>
                      </div>
                    </button>
                    
                    <AnimatePresence>
                      {expandedItems.includes(faq.id) && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="border-t border-neutral-200"
                        >
                          <div className="px-6 py-4">
                            <div className="prose prose-neutral max-w-none">
                              <p className="text-neutral-600 leading-relaxed">
                                {faq.answer}
                              </p>
                            </div>
                            {faq.tags && faq.tags.length > 2 && (
                              <div className="mt-4 pt-4 border-t border-neutral-100">
                                <div className="text-xs text-neutral-500 mb-2">Related topics:</div>
                                <div className="flex flex-wrap gap-1">
                                  {faq.tags.map((tag, tagIndex) => (
                                    <span
                                      key={tagIndex}
                                      className="bg-neutral-100 text-neutral-600 px-2 py-1 rounded text-xs"
                                    >
                                      {tag}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="container-max section-padding text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Still Have Questions?
            </h2>
            <p className="text-xl text-blue-100 leading-relaxed mb-8">
              Can't find the answer you're looking for? Our team is here to help! 
              Reach out to us and we'll get back to you as soon as possible.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="btn-accent inline-flex items-center justify-center space-x-2 text-lg px-8 py-4"
              >
                <HelpCircle className="w-5 h-5" />
                <span>Contact Support</span>
              </a>
              <a
                href="mailto:info@schoolmun.org"
                className="btn-secondary inline-flex items-center justify-center space-x-2 text-lg px-8 py-4 bg-white/10 border-white/30 text-white hover:bg-white hover:text-primary-900"
              >
                <span>Email Us Directly</span>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default FAQ;