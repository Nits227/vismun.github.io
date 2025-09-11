import React from 'react';
import { motion } from 'framer-motion';
import { Users, Calendar, TrendingUp, Award, Download, Eye, Edit, Trash2 } from 'lucide-react';
import Layout from '../../components/Layout/Layout';
import { getRegistrations, exportRegistrations } from '../../lib/auth';

const AdminDashboard = () => {
  const registrations = getRegistrations();
  
  const stats = [
    {
      icon: Users,
      label: 'Total Registrations',
      value: registrations.length.toString(),
      change: '+12 this week',
      color: 'bg-blue-100 text-blue-600'
    },
    {
      icon: Calendar,
      label: 'Days Until Event',
      value: '28',
      change: 'March 15-16, 2024',
      color: 'bg-accent-100 text-primary-900'
    },
    {
      icon: TrendingUp,
      label: 'Registration Rate',
      value: '85%',
      change: 'Above target',
      color: 'bg-green-100 text-green-600'
    },
    {
      icon: Award,
      label: 'Capacity',
      value: `${registrations.length}/500`,
      change: 'Spots remaining',
      color: 'bg-purple-100 text-purple-600'
    }
  ];

  const recentRegistrations = registrations.slice(-5).reverse();

  return (
    <Layout>
      <section className="py-8 bg-neutral-50 min-h-screen">
        <div className="container-max section-padding">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-bold text-primary-900 mb-2">Admin Dashboard</h1>
            <p className="text-neutral-600">
              Manage event registrations and monitor participation statistics
            </p>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="card"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${stat.color}`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                  <TrendingUp className="w-4 h-4 text-green-500" />
                </div>
                <div className="space-y-1">
                  <p className="text-2xl font-bold text-primary-900">{stat.value}</p>
                  <p className="text-sm font-medium text-neutral-700">{stat.label}</p>
                  <p className="text-xs text-neutral-500">{stat.change}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Recent Registrations */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="card"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-primary-900">Recent Registrations</h2>
                  <button
                    onClick={exportRegistrations}
                    className="btn-secondary inline-flex items-center space-x-2"
                  >
                    <Download className="w-4 h-4" />
                    <span>Export All</span>
                  </button>
                </div>

                {recentRegistrations.length === 0 ? (
                  <div className="text-center py-8">
                    <Users className="w-12 h-12 text-neutral-300 mx-auto mb-4" />
                    <p className="text-neutral-500">No registrations yet</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-neutral-200">
                          <th className="text-left py-3 px-4 font-medium text-neutral-700">Name</th>
                          <th className="text-left py-3 px-4 font-medium text-neutral-700">School</th>
                          <th className="text-left py-3 px-4 font-medium text-neutral-700">Role</th>
                          <th className="text-left py-3 px-4 font-medium text-neutral-700">Status</th>
                          <th className="text-left py-3 px-4 font-medium text-neutral-700">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {recentRegistrations.map((registration, index) => (
                          <tr key={registration.id} className="border-b border-neutral-100">
                            <td className="py-3 px-4">
                              <div>
                                <p className="font-medium text-primary-900">{registration.fullName}</p>
                                <p className="text-sm text-neutral-500">{registration.email}</p>
                              </div>
                            </td>
                            <td className="py-3 px-4 text-neutral-600">{registration.schoolName}</td>
                            <td className="py-3 px-4">
                              <span className="capitalize text-neutral-600">{registration.role}</span>
                              {registration.grade && (
                                <span className="text-sm text-neutral-500 ml-2">Grade {registration.grade}</span>
                              )}
                            </td>
                            <td className="py-3 px-4">
                              <span className={`px-2 py-1 rounded text-xs font-medium ${
                                registration.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                                registration.status === 'pending' ? 'bg-accent-100 text-primary-900' :
                                'bg-red-100 text-red-700'
                              }`}>
                                {registration.status}
                              </span>
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex space-x-2">
                                <button className="p-1 text-neutral-400 hover:text-primary-600">
                                  <Eye className="w-4 h-4" />
                                </button>
                                <button className="p-1 text-neutral-400 hover:text-primary-600">
                                  <Edit className="w-4 h-4" />
                                </button>
                                <button className="p-1 text-neutral-400 hover:text-red-600">
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </motion.div>
            </div>

            {/* Quick Actions */}
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="card"
              >
                <h2 className="text-lg font-bold text-primary-900 mb-4">Quick Actions</h2>
                <div className="space-y-3">
                  <button className="btn-primary w-full text-sm">Create Announcement</button>
                  <button className="btn-secondary w-full text-sm">Send Email Blast</button>
                  <button className="btn-secondary w-full text-sm">Generate Reports</button>
                  <button className="btn-secondary w-full text-sm">Manage Event Settings</button>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="card"
              >
                <h2 className="text-lg font-bold text-primary-900 mb-4">Registration Status</h2>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-neutral-600">Confirmed</span>
                    <span className="font-semibold text-green-600">
                      {registrations.filter(r => r.status === 'confirmed').length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-neutral-600">Pending</span>
                    <span className="font-semibold text-accent-600">
                      {registrations.filter(r => r.status === 'pending').length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-neutral-600">Cancelled</span>
                    <span className="font-semibold text-red-600">
                      {registrations.filter(r => r.status === 'cancelled').length}
                    </span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="card"
              >
                <h2 className="text-lg font-bold text-primary-900 mb-4">Event Progress</h2>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-neutral-600">Registration Progress</span>
                      <span className="font-medium text-primary-900">
                        {Math.round((registrations.length / 500) * 100)}%
                      </span>
                    </div>
                    <div className="w-full bg-neutral-200 rounded-full h-2">
                      <div 
                        className="bg-primary-600 h-2 rounded-full" 
                        style={{ width: `${Math.min((registrations.length / 500) * 100, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="text-xs text-neutral-500">
                    {500 - registrations.length} spots remaining
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AdminDashboard;