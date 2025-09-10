import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Save, 
  X, 
  User, 
  Mail, 
  GraduationCap,
  Users,
  Search,
  Filter
} from 'lucide-react';
import Layout from '../../components/Layout/Layout';
import { mockCommittees } from '../../lib/supabase';

interface Delegate {
  id: string;
  name: string;
  grade: string;
  email: string;
  isMinor: boolean;
  parentName?: string;
  parentContact?: string;
  committeeId?: string;
  countryId?: string;
  notes?: string;
}

const Delegates = () => {
  const [delegates, setDelegates] = useState<Delegate[]>([
    {
      id: '1',
      name: 'Emma Thompson',
      grade: '11',
      email: 'emma.thompson@student.lincolnhs.edu',
      isMinor: true,
      parentName: 'Robert Thompson',
      parentContact: '+1 (555) 234-5678',
      committeeId: '1',
      notes: 'Experienced delegate, participated in 3 previous MUNs'
    },
    {
      id: '2',
      name: 'Michael Chen',
      grade: '12',
      email: 'michael.chen@student.lincolnhs.edu',
      isMinor: false,
      committeeId: '2',
      notes: 'First-time delegate, very enthusiastic'
    },
    {
      id: '3',
      name: 'Sarah Williams',
      grade: '10',
      email: 'sarah.williams@student.lincolnhs.edu',
      isMinor: true,
      parentName: 'Jennifer Williams',
      parentContact: '+1 (555) 345-6789',
      committeeId: '1'
    }
  ]);

  const [isAddingDelegate, setIsAddingDelegate] = useState(false);
  const [editingDelegate, setEditingDelegate] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterGrade, setFilterGrade] = useState('');

  const [newDelegate, setNewDelegate] = useState<Partial<Delegate>>({
    name: '',
    grade: '',
    email: '',
    isMinor: true,
    parentName: '',
    parentContact: '',
    notes: ''
  });

  const filteredDelegates = delegates.filter(delegate => {
    const matchesSearch = delegate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         delegate.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGrade = !filterGrade || delegate.grade === filterGrade;
    return matchesSearch && matchesGrade;
  });

  const handleAddDelegate = () => {
    if (newDelegate.name && newDelegate.email && newDelegate.grade) {
      const delegate: Delegate = {
        id: Date.now().toString(),
        name: newDelegate.name,
        grade: newDelegate.grade,
        email: newDelegate.email,
        isMinor: newDelegate.isMinor || false,
        parentName: newDelegate.parentName,
        parentContact: newDelegate.parentContact,
        notes: newDelegate.notes
      };
      
      setDelegates([...delegates, delegate]);
      setNewDelegate({
        name: '',
        grade: '',
        email: '',
        isMinor: true,
        parentName: '',
        parentContact: '',
        notes: ''
      });
      setIsAddingDelegate(false);
    }
  };

  const handleEditDelegate = (id: string, updatedDelegate: Partial<Delegate>) => {
    setDelegates(delegates.map(delegate => 
      delegate.id === id ? { ...delegate, ...updatedDelegate } : delegate
    ));
    setEditingDelegate(null);
  };

  const handleDeleteDelegate = (id: string) => {
    if (confirm('Are you sure you want to remove this delegate?')) {
      setDelegates(delegates.filter(delegate => delegate.id !== id));
    }
  };

  const getCommitteeName = (committeeId?: string) => {
    if (!committeeId) return 'Not assigned';
    const committee = mockCommittees.find(c => c.id === committeeId);
    return committee?.name || 'Unknown Committee';
  };

  return (
    <Layout showAnnouncement={false}>
      <div className="py-8 bg-neutral-50 min-h-screen">
        <div className="container-max section-padding">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between mb-8"
          >
            <div>
              <h1 className="text-3xl font-bold text-primary-900 mb-2">Manage Delegates</h1>
              <p className="text-neutral-600">
                Add, edit, and manage your school's delegates for SchoolMUN 2024
              </p>
            </div>
            
            <button
              onClick={() => setIsAddingDelegate(true)}
              className="btn-primary inline-flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Add Delegate</span>
            </button>
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="card text-center"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-primary-900">{delegates.length}</div>
              <div className="text-sm text-neutral-600">Total Delegates</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="card text-center"
            >
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <GraduationCap className="w-6 h-6 text-green-600" />
              </div>
              <div className="text-2xl font-bold text-primary-900">
                {delegates.filter(d => d.committeeId).length}
              </div>
              <div className="text-sm text-neutral-600">Assigned</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="card text-center"
            >
              <div className="w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <User className="w-6 h-6 text-primary-900" />
              </div>
              <div className="text-2xl font-bold text-primary-900">
                {delegates.filter(d => d.isMinor).length}
              </div>
              <div className="text-sm text-neutral-600">Minors</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="card text-center"
            >
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Mail className="w-6 h-6 text-purple-600" />
              </div>
              <div className="text-2xl font-bold text-primary-900">
                {delegates.filter(d => d.email).length}
              </div>
              <div className="text-sm text-neutral-600">With Email</div>
            </motion.div>
          </div>

          {/* Search and Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card mb-8"
          >
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search delegates..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="input-field pl-10"
                />
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Filter className="w-5 h-5 text-neutral-600" />
                  <select
                    value={filterGrade}
                    onChange={(e) => setFilterGrade(e.target.value)}
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
                  {filteredDelegates.length} delegate{filteredDelegates.length !== 1 ? 's' : ''} found
                </div>
              </div>
            </div>
          </motion.div>

          {/* Add Delegate Modal */}
          <AnimatePresence>
            {isAddingDelegate && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-primary-900">Add New Delegate</h2>
                    <button
                      onClick={() => setIsAddingDelegate(false)}
                      className="text-neutral-400 hover:text-neutral-600"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>

                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          value={newDelegate.name || ''}
                          onChange={(e) => setNewDelegate({...newDelegate, name: e.target.value})}
                          className="input-field"
                          placeholder="Student's full name"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                          Grade *
                        </label>
                        <select
                          value={newDelegate.grade || ''}
                          onChange={(e) => setNewDelegate({...newDelegate, grade: e.target.value})}
                          className="input-field"
                        >
                          <option value="">Select grade</option>
                          <option value="9">Grade 9</option>
                          <option value="10">Grade 10</option>
                          <option value="11">Grade 11</option>
                          <option value="12">Grade 12</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        value={newDelegate.email || ''}
                        onChange={(e) => setNewDelegate({...newDelegate, email: e.target.value})}
                        className="input-field"
                        placeholder="student@school.edu"
                      />
                    </div>

                    <div>
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={newDelegate.isMinor || false}
                          onChange={(e) => setNewDelegate({...newDelegate, isMinor: e.target.checked})}
                          className="w-4 h-4 text-primary-600 rounded"
                        />
                        <span className="text-sm font-medium text-neutral-700">Student is a minor (under 18)</span>
                      </label>
                    </div>

                    {newDelegate.isMinor && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-neutral-50 rounded-lg">
                        <div>
                          <label className="block text-sm font-medium text-neutral-700 mb-2">
                            Parent/Guardian Name
                          </label>
                          <input
                            type="text"
                            value={newDelegate.parentName || ''}
                            onChange={(e) => setNewDelegate({...newDelegate, parentName: e.target.value})}
                            className="input-field"
                            placeholder="Parent's full name"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-neutral-700 mb-2">
                            Parent Contact
                          </label>
                          <input
                            type="tel"
                            value={newDelegate.parentContact || ''}
                            onChange={(e) => setNewDelegate({...newDelegate, parentContact: e.target.value})}
                            className="input-field"
                            placeholder="+1 (555) 123-4567"
                          />
                        </div>
                      </div>
                    )}

                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Notes (Optional)
                      </label>
                      <textarea
                        value={newDelegate.notes || ''}
                        onChange={(e) => setNewDelegate({...newDelegate, notes: e.target.value})}
                        className="input-field"
                        rows={3}
                        placeholder="Any additional notes about this delegate..."
                      />
                    </div>

                    <div className="flex space-x-4 pt-4">
                      <button
                        onClick={handleAddDelegate}
                        className="btn-primary flex-1 inline-flex items-center justify-center space-x-2"
                      >
                        <Save className="w-4 h-4" />
                        <span>Add Delegate</span>
                      </button>
                      <button
                        onClick={() => setIsAddingDelegate(false)}
                        className="btn-secondary flex-1"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Delegates List */}
          <div className="space-y-4">
            {filteredDelegates.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="card text-center py-12"
              >
                <Users className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-neutral-600 mb-2">No delegates found</h3>
                <p className="text-neutral-500 mb-6">
                  {searchTerm || filterGrade ? 'Try adjusting your search or filters' : 'Add your first delegate to get started'}
                </p>
                {!searchTerm && !filterGrade && (
                  <button
                    onClick={() => setIsAddingDelegate(true)}
                    className="btn-primary inline-flex items-center space-x-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add First Delegate</span>
                  </button>
                )}
              </motion.div>
            ) : (
              filteredDelegates.map((delegate, index) => (
                <motion.div
                  key={delegate.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="card"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-4 mb-3">
                        <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                          <User className="w-6 h-6 text-primary-600" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-primary-900">{delegate.name}</h3>
                          <div className="flex items-center space-x-4 text-sm text-neutral-600">
                            <span>Grade {delegate.grade}</span>
                            {delegate.isMinor && (
                              <span className="bg-accent-100 text-primary-900 px-2 py-1 rounded text-xs">
                                Minor
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-neutral-500">Email:</span>
                          <span className="ml-2 text-neutral-700">{delegate.email}</span>
                        </div>
                        <div>
                          <span className="text-neutral-500">Committee:</span>
                          <span className="ml-2 text-neutral-700">{getCommitteeName(delegate.committeeId)}</span>
                        </div>
                        {delegate.isMinor && delegate.parentName && (
                          <>
                            <div>
                              <span className="text-neutral-500">Parent:</span>
                              <span className="ml-2 text-neutral-700">{delegate.parentName}</span>
                            </div>
                            <div>
                              <span className="text-neutral-500">Parent Contact:</span>
                              <span className="ml-2 text-neutral-700">{delegate.parentContact}</span>
                            </div>
                          </>
                        )}
                      </div>

                      {delegate.notes && (
                        <div className="mt-3 p-3 bg-neutral-50 rounded-lg">
                          <span className="text-xs text-neutral-500 font-medium">Notes:</span>
                          <p className="text-sm text-neutral-700 mt-1">{delegate.notes}</p>
                        </div>
                      )}
                    </div>

                    <div className="flex space-x-2 ml-4">
                      <button
                        onClick={() => setEditingDelegate(delegate.id)}
                        className="p-2 text-neutral-400 hover:text-primary-600 transition-colors duration-200"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteDelegate(delegate.id)}
                        className="p-2 text-neutral-400 hover:text-red-600 transition-colors duration-200"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Delegates;