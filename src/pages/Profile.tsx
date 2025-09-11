import React from 'react';
import { motion } from 'framer-motion';
import { User, Mail, School, GraduationCap, Calendar, Award } from 'lucide-react';
import Layout from '../components/Layout/Layout';
import { useAuth } from '../contexts/AuthContext';

const Profile = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <Layout>
        <div className="py-16 bg-neutral-50 min-h-screen flex items-center justify-center">
          <p className="text-neutral-600">Please log in to view your profile.</p>
        </div>
      </Layout>
    );
  }

  const profileStats = [
    { icon: Calendar, label: 'Events Registered', value: '1' },
    { icon: Award, label: 'Certificates Earned', value: '0' },
    { icon: User, label: 'Profile Completion', value: '85%' },
  ];

  return (
    <Layout>
      <section className="py-16 bg-neutral-50 min-h-screen">
        <div className="container-max section-padding">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-3xl font-bold text-primary-900 mb-2">My Profile</h1>
              <p className="text-neutral-600">Manage your account information and event registrations</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Profile Card */}
              <div className="lg:col-span-2">
                <div className="card">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
                      <User className="w-8 h-8 text-primary-600" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-primary-900">{user.fullName}</h2>
                      <p className="text-neutral-600 capitalize">{user.role}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <Mail className="w-5 h-5 text-neutral-400" />
                        <div>
                          <p className="text-sm text-neutral-500">Email</p>
                          <p className="font-medium text-primary-900">{user.email}</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <School className="w-5 h-5 text-neutral-400" />
                        <div>
                          <p className="text-sm text-neutral-500">School</p>
                          <p className="font-medium text-primary-900">{user.schoolName}</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {user.grade && (
                        <div className="flex items-center space-x-3">
                          <GraduationCap className="w-5 h-5 text-neutral-400" />
                          <div>
                            <p className="text-sm text-neutral-500">Grade</p>
                            <p className="font-medium text-primary-900">Grade {user.grade}</p>
                          </div>
                        </div>
                      )}

                      <div className="flex items-center space-x-3">
                        <Calendar className="w-5 h-5 text-neutral-400" />
                        <div>
                          <p className="text-sm text-neutral-500">Member Since</p>
                          <p className="font-medium text-primary-900">
                            {new Date(user.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-neutral-200">
                    <button className="btn-primary">Edit Profile</button>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="card mt-8">
                  <h3 className="text-xl font-bold text-primary-900 mb-6">Recent Activity</h3>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                      <div>
                        <p className="font-medium text-primary-900">Registered for Innovation Summit</p>
                        <p className="text-sm text-neutral-500">2 days ago</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                      <div>
                        <p className="font-medium text-primary-900">Account created</p>
                        <p className="text-sm text-neutral-500">1 week ago</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-8">
                {/* Stats */}
                <div className="card">
                  <h3 className="text-lg font-bold text-primary-900 mb-4">Quick Stats</h3>
                  <div className="space-y-4">
                    {profileStats.map((stat, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <stat.icon className="w-5 h-5 text-primary-600" />
                          <span className="text-sm text-neutral-600">{stat.label}</span>
                        </div>
                        <span className="font-semibold text-primary-900">{stat.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Upcoming Events */}
                <div className="card">
                  <h3 className="text-lg font-bold text-primary-900 mb-4">Upcoming Events</h3>
                  <div className="bg-accent-50 border border-accent-200 rounded-lg p-4">
                    <h4 className="font-semibold text-primary-900 mb-2">Innovation Summit 2024</h4>
                    <p className="text-sm text-neutral-600 mb-2">March 15-16, 2024</p>
                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-medium">
                      Registered
                    </span>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="card">
                  <h3 className="text-lg font-bold text-primary-900 mb-4">Quick Actions</h3>
                  <div className="space-y-2">
                    <button className="btn-secondary w-full text-sm">Download Certificate</button>
                    <button className="btn-secondary w-full text-sm">View Event Details</button>
                    <button className="btn-secondary w-full text-sm">Contact Support</button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Profile;