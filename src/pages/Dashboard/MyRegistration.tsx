import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Edit, 
  Save, 
  X, 
  School, 
  Mail, 
  Phone, 
  MapPin, 
  Users, 
  Calendar,
  CheckCircle,
  Clock,
  AlertCircle,
  Download
} from 'lucide-react';
import Layout from '../../components/Layout/Layout';
import { mockCommittees } from '../../lib/supabase';

const MyRegistration = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    schoolName: 'Lincoln High School',
    address: '123 Education Street, Learning City, LC 12345',
    coordinatorName: 'Sarah Johnson',
    coordinatorEmail: 'sarah.johnson@lincolnhs.edu',
    coordinatorPhone: '+1 (555) 123-4567',
    numberOfDelegates: 12,
    specialRequirements: 'Two delegates require vegetarian meals. One delegate needs wheelchair accessibility.'
  });

  const registrationData = {
    id: 'REG-2024-001',
    status: 'submitted',
    submittedAt: '2024-02-15T10:30:00Z',
    lastUpdated: '2024-02-20T14:15:00Z',
    paymentStatus: 'pending',
    totalFee: 900, // $75 per delegate
    committeePreferences: ['1', '2', '3'] // IDs from mockCommittees
  };

  const handleSave = () => {
    // Here you would save the data to your backend
    console.log('Saving registration data:', editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    // Reset to original data
    setIsEditing(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-neutral-100 text-neutral-700';
      case 'submitted': return 'bg-blue-100 text-blue-700';
      case 'confirmed': return 'bg-green-100 text-green-700';
      case 'cancelled': return 'bg-red-100 text-red-700';
      default: return 'bg-neutral-100 text-neutral-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'submitted': return <Clock className="w-4 h-4" />;
      case 'confirmed': return <CheckCircle className="w-4 h-4" />;
      case 'cancelled': return <X className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
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
              <h1 className="text-3xl font-bold text-primary-900 mb-2">My Registration</h1>
              <p className="text-neutral-600">
                View and manage your school's registration for SchoolMUN 2024
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className={`px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-2 ${getStatusColor(registrationData.status)}`}>
                {getStatusIcon(registrationData.status)}
                <span className="capitalize">{registrationData.status}</span>
              </div>
              
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="btn-primary inline-flex items-center space-x-2"
                >
                  <Edit className="w-4 h-4" />
                  <span>Edit Registration</span>
                </button>
              ) : (
                <div className="flex space-x-2">
                  <button
                    onClick={handleSave}
                    className="btn-primary inline-flex items-center space-x-2"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Changes</span>
                  </button>
                  <button
                    onClick={handleCancel}
                    className="btn-secondary inline-flex items-center space-x-2"
                  >
                    <X className="w-4 h-4" />
                    <span>Cancel</span>
                  </button>
                </div>
              )}
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Registration Details */}
            <div className="lg:col-span-2 space-y-8">
              {/* School Information */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="card"
              >
                <div className="flex items-center space-x-3 mb-6">
                  <School className="w-6 h-6 text-primary-600" />
                  <h2 className="text-xl font-bold text-primary-900">School Information</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      School Name
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editData.schoolName}
                        onChange={(e) => setEditData({...editData, schoolName: e.target.value})}
                        className="input-field"
                      />
                    ) : (
                      <p className="text-primary-900 font-medium">{editData.schoolName}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Number of Delegates
                    </label>
                    {isEditing ? (
                      <input
                        type="number"
                        value={editData.numberOfDelegates}
                        onChange={(e) => setEditData({...editData, numberOfDelegates: parseInt(e.target.value)})}
                        className="input-field"
                        min="1"
                        max="50"
                      />
                    ) : (
                      <p className="text-primary-900 font-medium">{editData.numberOfDelegates} delegates</p>
                    )}
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      School Address
                    </label>
                    {isEditing ? (
                      <textarea
                        value={editData.address}
                        onChange={(e) => setEditData({...editData, address: e.target.value})}
                        className="input-field"
                        rows={2}
                      />
                    ) : (
                      <p className="text-neutral-600">{editData.address}</p>
                    )}
                  </div>
                </div>
              </motion.div>

              {/* Coordinator Information */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="card"
              >
                <div className="flex items-center space-x-3 mb-6">
                  <Users className="w-6 h-6 text-primary-600" />
                  <h2 className="text-xl font-bold text-primary-900">Coordinator Information</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Coordinator Name
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editData.coordinatorName}
                        onChange={(e) => setEditData({...editData, coordinatorName: e.target.value})}
                        className="input-field"
                      />
                    ) : (
                      <p className="text-primary-900 font-medium">{editData.coordinatorName}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Email Address
                    </label>
                    {isEditing ? (
                      <input
                        type="email"
                        value={editData.coordinatorEmail}
                        onChange={(e) => setEditData({...editData, coordinatorEmail: e.target.value})}
                        className="input-field"
                      />
                    ) : (
                      <p className="text-neutral-600">{editData.coordinatorEmail}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Phone Number
                    </label>
                    {isEditing ? (
                      <input
                        type="tel"
                        value={editData.coordinatorPhone}
                        onChange={(e) => setEditData({...editData, coordinatorPhone: e.target.value})}
                        className="input-field"
                      />
                    ) : (
                      <p className="text-neutral-600">{editData.coordinatorPhone}</p>
                    )}
                  </div>
                </div>
              </motion.div>

              {/* Committee Preferences */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="card"
              >
                <h2 className="text-xl font-bold text-primary-900 mb-6">Committee Preferences</h2>
                
                <div className="space-y-4">
                  {registrationData.committeePreferences.map((prefId, index) => {
                    const committee = mockCommittees.find(c => c.id === prefId);
                    return (
                      <div key={prefId} className="flex items-center space-x-4 p-4 bg-neutral-50 rounded-lg">
                        <div className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-primary-900">{committee?.name}</h3>
                          <p className="text-sm text-neutral-600">{committee?.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>

              {/* Special Requirements */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="card"
              >
                <h2 className="text-xl font-bold text-primary-900 mb-6">Special Requirements</h2>
                
                {isEditing ? (
                  <textarea
                    value={editData.specialRequirements}
                    onChange={(e) => setEditData({...editData, specialRequirements: e.target.value})}
                    className="input-field"
                    rows={4}
                    placeholder="Any special requirements, dietary restrictions, or accessibility needs..."
                  />
                ) : (
                  <p className="text-neutral-600 leading-relaxed">
                    {editData.specialRequirements || 'No special requirements specified.'}
                  </p>
                )}
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Registration Summary */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="card"
              >
                <h2 className="text-lg font-bold text-primary-900 mb-4">Registration Summary</h2>
                
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Registration ID</span>
                    <span className="font-medium text-primary-900">{registrationData.id}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Submitted</span>
                    <span className="font-medium text-primary-900">
                      {new Date(registrationData.submittedAt).toLocaleDateString()}
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Last Updated</span>
                    <span className="font-medium text-primary-900">
                      {new Date(registrationData.lastUpdated).toLocaleDateString()}
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Delegates</span>
                    <span className="font-medium text-primary-900">{editData.numberOfDelegates}</span>
                  </div>
                  
                  <div className="border-t border-neutral-200 pt-4">
                    <div className="flex justify-between">
                      <span className="text-neutral-600">Registration Fee</span>
                      <span className="font-bold text-primary-900">${registrationData.totalFee}</span>
                    </div>
                    <p className="text-xs text-neutral-500 mt-1">$75 per delegate</p>
                  </div>
                </div>
              </motion.div>

              {/* Payment Status */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="card"
              >
                <h2 className="text-lg font-bold text-primary-900 mb-4">Payment Status</h2>
                
                <div className="space-y-4">
                  <div className={`px-3 py-2 rounded-lg text-sm font-medium flex items-center space-x-2 ${
                    registrationData.paymentStatus === 'paid' ? 'bg-green-100 text-green-700' :
                    registrationData.paymentStatus === 'pending' ? 'bg-accent-100 text-primary-900' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {registrationData.paymentStatus === 'paid' ? <CheckCircle className="w-4 h-4" /> :
                     registrationData.paymentStatus === 'pending' ? <Clock className="w-4 h-4" /> :
                     <AlertCircle className="w-4 h-4" />}
                    <span className="capitalize">{registrationData.paymentStatus}</span>
                  </div>
                  
                  {registrationData.paymentStatus === 'pending' && (
                    <div className="bg-accent-50 border border-accent-200 rounded-lg p-4">
                      <p className="text-sm text-primary-900 mb-3">
                        Payment instructions will be sent via email once your registration is confirmed.
                      </p>
                      <p className="text-xs text-neutral-600">
                        Early bird pricing ends March 15th - save 25%!
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>

              {/* Actions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="card"
              >
                <h2 className="text-lg font-bold text-primary-900 mb-4">Actions</h2>
                
                <div className="space-y-3">
                  <button className="btn-secondary w-full inline-flex items-center justify-center space-x-2">
                    <Download className="w-4 h-4" />
                    <span>Download Registration</span>
                  </button>
                  
                  <button className="btn-secondary w-full inline-flex items-center justify-center space-x-2">
                    <Mail className="w-4 h-4" />
                    <span>Email Copy</span>
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MyRegistration;