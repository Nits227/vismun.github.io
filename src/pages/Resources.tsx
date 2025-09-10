import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, BookOpen, Video, FileText, Clock, Search, Filter, ExternalLink } from 'lucide-react';
import Layout from '../components/Layout/Layout';

const Resources = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const resources = [
    {
      id: '1',
      title: 'MUN Procedures and Rules',
      description: 'Comprehensive guide to parliamentary procedure and debate rules',
      category: 'Rules & Procedures',
      type: 'PDF',
      size: '2.4 MB',
      downloadUrl: '#',
      featured: true
    },
    {
      id: '2',
      title: 'UNSC Study Guide 2024',
      description: 'Complete study guide for Security Council delegates',
      category: 'Study Guides',
      type: 'PDF',
      size: '3.1 MB',
      downloadUrl: '#',
      featured: true
    },
    {
      id: '3',
      title: 'Resolution Writing Workshop',
      description: 'Video tutorial on crafting effective UN resolutions',
      category: 'Video Tutorials',
      type: 'Video',
      duration: '45 min',
      downloadUrl: '#',
      featured: false
    },
    {
      id: '4',
      title: 'Delegate Preparation Timeline',
      description: 'Step-by-step preparation schedule for delegates',
      category: 'Preparation',
      type: 'PDF',
      size: '1.2 MB',
      downloadUrl: '#',
      featured: false
    },
    {
      id: '5',
      title: 'Sample Position Papers',
      description: 'Examples of well-written position papers from previous conferences',
      category: 'Examples',
      type: 'PDF',
      size: '4.7 MB',
      downloadUrl: '#',
      featured: false
    },
    {
      id: '6',
      title: 'Public Speaking for MUN',
      description: 'Tips and techniques for effective public speaking in committee',
      category: 'Video Tutorials',
      type: 'Video',
      duration: '32 min',
      downloadUrl: '#',
      featured: false
    }
  ];

  const categories = ['All', 'Study Guides', 'Rules & Procedures', 'Video Tutorials', 'Preparation', 'Examples'];

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || selectedCategory === 'All' || resource.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const preparationTimeline = [
    {
      phase: '8 Weeks Before',
      title: 'Initial Preparation',
      tasks: [
        'Receive committee assignment',
        'Begin background research',
        'Understand your country\'s position'
      ]
    },
    {
      phase: '6 Weeks Before',
      title: 'Deep Research',
      tasks: [
        'Study committee topics thoroughly',
        'Research your country\'s policies',
        'Review past UN resolutions'
      ]
    },
    {
      phase: '4 Weeks Before',
      title: 'Position Paper',
      tasks: [
        'Draft position paper',
        'Review and refine arguments',
        'Submit position paper'
      ]
    },
    {
      phase: '2 Weeks Before',
      title: 'Final Preparation',
      tasks: [
        'Practice public speaking',
        'Prepare opening statement',
        'Review parliamentary procedure'
      ]
    }
  ];

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
              Resources & Study Materials
            </h1>
            <p className="text-xl lg:text-2xl text-blue-100 leading-relaxed">
              Everything you need to prepare for SchoolMUN 2024, from study guides 
              to video tutorials and preparation timelines.
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
                placeholder="Search resources..."
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
                  className="input-field min-w-[150px]"
                >
                  {categories.map(category => (
                    <option key={category} value={category === 'All' ? '' : category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="text-sm text-neutral-600">
                {filteredResources.length} resource{filteredResources.length !== 1 ? 's' : ''} found
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Resources */}
      <section className="py-16 bg-neutral-50">
        <div className="container-max section-padding">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-primary-900 mb-4">
              Featured Resources
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              Essential materials to get you started with your MUN preparation
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {resources.filter(r => r.featured).map((resource, index) => (
              <motion.div
                key={resource.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="card hover:shadow-lg transition-all duration-300 border-l-4 border-l-accent-400"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                      {resource.type === 'Video' ? (
                        <Video className="w-6 h-6 text-primary-600" />
                      ) : (
                        <FileText className="w-6 h-6 text-primary-600" />
                      )}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-primary-900">{resource.title}</h3>
                      <span className="text-sm text-accent-600 font-medium">{resource.category}</span>
                    </div>
                  </div>
                  <span className="bg-accent-400 text-primary-900 text-xs px-2 py-1 rounded font-medium">
                    Featured
                  </span>
                </div>

                <p className="text-neutral-600 mb-4">{resource.description}</p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-neutral-500">
                    <span>{resource.type}</span>
                    {resource.size && <span>{resource.size}</span>}
                    {resource.duration && (
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{resource.duration}</span>
                      </div>
                    )}
                  </div>
                  <a
                    href={resource.downloadUrl}
                    className="btn-primary inline-flex items-center space-x-2"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download</span>
                  </a>
                </div>
              </motion.div>
            ))}
          </div>

          {/* All Resources */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-primary-900">All Resources</h3>
            
            {filteredResources.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-neutral-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-neutral-400" />
                </div>
                <h3 className="text-xl font-semibold text-neutral-600 mb-2">No resources found</h3>
                <p className="text-neutral-500">Try adjusting your search terms or filters</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredResources.map((resource, index) => (
                  <motion.div
                    key={resource.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-white rounded-lg border border-neutral-200 p-6 hover:shadow-md transition-all duration-200"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                          {resource.type === 'Video' ? (
                            <Video className="w-5 h-5 text-primary-600" />
                          ) : (
                            <FileText className="w-5 h-5 text-primary-600" />
                          )}
                        </div>
                        <div>
                          <h4 className="font-semibold text-primary-900">{resource.title}</h4>
                          <p className="text-neutral-600 text-sm">{resource.description}</p>
                          <div className="flex items-center space-x-4 mt-1 text-xs text-neutral-500">
                            <span className="bg-neutral-100 px-2 py-1 rounded">{resource.category}</span>
                            <span>{resource.type}</span>
                            {resource.size && <span>{resource.size}</span>}
                            {resource.duration && (
                              <div className="flex items-center space-x-1">
                                <Clock className="w-3 h-3" />
                                <span>{resource.duration}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <a
                        href={resource.downloadUrl}
                        className="btn-secondary inline-flex items-center space-x-2"
                      >
                        <Download className="w-4 h-4" />
                        <span>Download</span>
                      </a>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Preparation Timeline */}
      <section className="py-16 bg-white">
        <div className="container-max section-padding">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-primary-900 mb-4">
              Delegate Preparation Timeline
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              Follow this structured timeline to ensure you're fully prepared for the conference
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {preparationTimeline.map((phase, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start space-x-6"
                >
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold">
                      {index + 1}
                    </div>
                  </div>
                  <div className="flex-1 card">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-primary-900">{phase.title}</h3>
                      <span className="bg-accent-400 text-primary-900 px-3 py-1 rounded-full text-sm font-medium">
                        {phase.phase}
                      </span>
                    </div>
                    <ul className="space-y-2">
                      {phase.tasks.map((task, taskIndex) => (
                        <li key={taskIndex} className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
                          <span className="text-neutral-600">{task}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Help Section */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="container-max section-padding text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Need Additional Help?
            </h2>
            <p className="text-xl text-blue-100 leading-relaxed mb-8">
              Our team is here to support you throughout your MUN journey. 
              Don't hesitate to reach out if you need guidance or have questions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="btn-accent inline-flex items-center justify-center space-x-2 text-lg px-8 py-4"
              >
                <span>Contact Support</span>
                <ExternalLink className="w-5 h-5" />
              </a>
              <a
                href="/faq"
                className="btn-secondary inline-flex items-center justify-center space-x-2 text-lg px-8 py-4 bg-white/10 border-white/30 text-white hover:bg-white hover:text-primary-900"
              >
                <BookOpen className="w-5 h-5" />
                <span>View FAQ</span>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Resources;