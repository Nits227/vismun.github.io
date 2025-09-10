import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Users, 
  FileText, 
  Calendar, 
  Award, 
  Bell, 
  TrendingUp, 
  Clock,
  CheckCircle,
  AlertCircle,
  ExternalLink
} from 'lucide-react';
import Layout from '../../components/Layout/Layout';
import { useAuth } from '../../contexts/AuthContext';
import { mockAnnouncements } from '../../lib/supabase';

const Dashboard = () => {
  const { user } = useAuth();

  const stats = [
    {
      icon: Users,
      label: 'Registered Delegates',
      value: '12',
      change: '+2 this week',
      color: 'bg-blue-100 text-blue-600'
    },
    {
      icon: FileText,
      label: 'Registration Status',
      value: 'Submitted',
      change: 'Awaiting confirmation',
      color: 'bg-green-100 text-green-600'
    },
    {
      icon: Calendar,
      label: 'Days Until Conference',
      value: '45',
      change: 'June 1-3, 2024',
      color: 'bg-accent-100 text-primary-900'
    },
    {
      icon: Award,
      label: 'Committee Assignments',
      value: 'Pending',
      change: 'Released May 15th',
      color: 'bg-purple-100 text-purple-600'
    }
  ];

  const quickActions = [
    {
      title: 'Manage Delegates',
      description: 'Add, edit, or remove delegate information',
      href: '/dashboard/delegates',
      icon: Users,
      color: 'bg-blue-50 border-blue-200 hover:bg-blue-100'
    },
    {
      title: 'View Registration',
      description: 'Review your school registration details',
      href: '/dashboard/registration',
      icon: FileText,
      color: 'bg-green-50 border-green-200 hover:bg-green-100'
    },
    {
      title: 'Download Documents',
      description: 'Access confirmation letters and certificates',
      href: '/dashboard/documents',
      icon: Award,
      color: 'bg-purple-50 border-purple-200 hover:bg-purple-100'
    }
  ];

  const upcomingDeadlines = [
    {
      date: 'March 15, 2024',
      title: 'Early Bird Registration Ends',
      status: 'urgent',
      daysLeft: 5
    },
    {
      date: 'April 30, 2024',
      title: 'Final Registration Deadline',
      status: 'important',
      daysLeft: 51
    },
    {
      date: 'May 15, 2024',
      title: 'Committee Assignments Released',
      status: 'info',
      daysLeft: 66
    }
  ];

  return (
    <Layout showAnnouncement={false}>
      <div className="py-8 bg-neutral-50 min-h-screen">
        <div className="container-max section-padding">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-bold text-primary-900 mb-2">
              Welcome back, {user?.email?.split('@')[0] || 'Coordinator'}!
            </h1>
            <p className="text-neutral-600">
              Here's an overview of your school's SchoolMUN 2024 registration and progress.
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
            {/* Quick Actions */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="card"
              >
                <h2 className="text-xl font-bold text-primary-900 mb-6">Quick Actions</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {quickActions.map((action, index) => (
                    <Link
                      key={index}
                      to={action.href}
                      className={`p-4 rounded-lg border-2 transition-all duration-200 ${action.color}`}
                    >
                      <div className="flex items-start space-x-3">
                        <action.icon className="w-6 h-6 text-primary-600 mt-1" />
                        <div>
                          <h3 className="font-semibold text-primary-900 mb-1">{action.title}</h3>
                          <p className="text-sm text-neutral-600">{action.description}</p>
                        </div>
                        <ExternalLink className="w-4 h-4 text-neutral-400" />
                      </div>
                    </Link>
                  ))}
                </div>
              </motion.div>

              {/* Recent Activity */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="card mt-8"
              >
                <h2 className="text-xl font-bold text-primary-900 mb-6">Recent Activity</h2>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <div>
                      <p className="text-sm font-medium text-primary-900">Registration submitted successfully</p>
                      <p className="text-xs text-neutral-500">2 days ago</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <div>
                      <p className="text-sm font-medium text-primary-900">Added 3 new delegates</p>
                      <p className="text-xs text-neutral-500">1 week ago</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-accent-400 rounded-full mt-2"></div>
                    <div>
                      <p className="text-sm font-medium text-primary-900">Updated committee preferences</p>
                      <p className="text-xs text-neutral-500">2 weeks ago</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Announcements */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="card"
              >
                <div className="flex items-center space-x-2 mb-4">
                  <Bell className="w-5 h-5 text-primary-600" />
                  <h2 className="text-lg font-bold text-primary-900">Announcements</h2>
                </div>
                <div className="space-y-4">
                  {mockAnnouncements.slice(0, 2).map((announcement) => (
                    <div key={announcement.id} className="border-l-4 border-l-accent-400 pl-4">
                      <h3 className="font-semibold text-primary-900 text-sm mb-1">
                        {announcement.title}
                      </h3>
                      <p className="text-xs text-neutral-600 mb-2">
                        {announcement.content.substring(0, 100)}...
                      </p>
                      <p className="text-xs text-neutral-500">
                        {new Date(announcement.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                </div>
                <Link
                  to="/announcements"
                  className="text-sm text-primary-600 hover:text-primary-700 font-medium mt-4 inline-block"
                >
                  View all announcements →
                </Link>
              </motion.div>

              {/* Upcoming Deadlines */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="card"
              >
                <div className="flex items-center space-x-2 mb-4">
                  <Clock className="w-5 h-5 text-primary-600" />
                  <h2 className="text-lg font-bold text-primary-900">Upcoming Deadlines</h2>
                </div>
                <div className="space-y-3">
                  {upcomingDeadlines.map((deadline, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className={`w-3 h-3 rounded-full mt-1 ${
                        deadline.status === 'urgent' ? 'bg-red-500' :
                        deadline.status === 'important' ? 'bg-accent-400' :
                        'bg-blue-500'
                      }`}></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-primary-900">{deadline.title}</p>
                        <p className="text-xs text-neutral-600">{deadline.date}</p>
                        <p className="text-xs text-neutral-500">{deadline.daysLeft} days left</p>
                      </div>
                      {deadline.status === 'urgent' && (
                        <AlertCircle className="w-4 h-4 text-red-500" />
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Registration Progress */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="card"
              >
                <h2 className="text-lg font-bold text-primary-900 mb-4">Registration Progress</h2>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-sm text-neutral-700">School information submitted</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-sm text-neutral-700">Committee preferences selected</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-sm text-neutral-700">Delegates added</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-5 h-5 border-2 border-neutral-300 rounded-full"></div>
                    <span className="text-sm text-neutral-500">Payment pending</span>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-neutral-200">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-neutral-600">Progress</span>
                    <span className="font-medium text-primary-900">75%</span>
                  </div>
                  <div className="w-full bg-neutral-200 rounded-full h-2">
                    <div className="bg-primary-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;