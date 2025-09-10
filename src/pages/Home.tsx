import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Users, Award, ArrowRight, Clock, Globe, BookOpen } from 'lucide-react';
import Layout from '../components/Layout/Layout';

const Home = () => {
  const keyDates = [
    { date: 'March 15, 2024', event: 'Early Bird Registration Ends', urgent: true },
    { date: 'April 30, 2024', event: 'Final Registration Deadline', urgent: false },
    { date: 'May 15, 2024', event: 'Committee Assignments Released', urgent: false },
    { date: 'June 1-3, 2024', event: 'Conference Dates', urgent: false },
  ];

  const stats = [
    { icon: Users, value: '500+', label: 'Expected Delegates' },
    { icon: Globe, value: '12', label: 'Committees' },
    { icon: Award, value: '50+', label: 'Schools Participating' },
    { icon: BookOpen, value: '3', label: 'Days of Debate' },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative container-max section-padding py-20 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="inline-flex items-center space-x-2 bg-accent-400 text-primary-900 px-4 py-2 rounded-full text-sm font-medium"
                >
                  <Calendar className="w-4 h-4" />
                  <span>June 1-3, 2024</span>
                </motion.div>
                
                <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                  SchoolMUN
                  <span className="block text-accent-400">2024</span>
                </h1>
                
                <p className="text-xl lg:text-2xl text-blue-100 leading-relaxed">
                  Empowering tomorrow's leaders through diplomacy, debate, and global understanding.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/registration"
                  className="btn-accent inline-flex items-center justify-center space-x-2 text-lg px-8 py-4"
                >
                  <span>Register Your School</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
                
                <Link
                  to="/about"
                  className="btn-secondary inline-flex items-center justify-center space-x-2 text-lg px-8 py-4 bg-white/10 border-white/30 text-white hover:bg-white hover:text-primary-900"
                >
                  <span>Learn More</span>
                </Link>
              </div>

              <div className="flex items-center space-x-6 text-blue-100">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-5 h-5 text-accent-400" />
                  <span>Metropolitan Convention Center</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-accent-400" />
                  <span>3 Days</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <h3 className="text-2xl font-bold mb-6 text-center">Conference Overview</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-white/20">
                    <span className="text-blue-100">Duration</span>
                    <span className="font-semibold">3 Days</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-white/20">
                    <span className="text-blue-100">Committees</span>
                    <span className="font-semibold">12 Active</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-white/20">
                    <span className="text-blue-100">Expected Delegates</span>
                    <span className="font-semibold">500+</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-blue-100">Registration Fee</span>
                    <span className="font-semibold text-accent-400">$75/delegate</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container-max section-padding">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
                  <stat.icon className="w-8 h-8 text-primary-600" />
                </div>
                <div className="text-3xl font-bold text-primary-900 mb-2">{stat.value}</div>
                <div className="text-neutral-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Dates Section */}
      <section className="py-16 bg-neutral-50">
        <div className="container-max section-padding">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-primary-900 mb-4">
              Important Dates & Deadlines
            </h2>
            <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
              Stay on track with these key milestones for SchoolMUN 2024
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {keyDates.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`card ${item.urgent ? 'border-accent-400 bg-accent-50' : ''}`}
              >
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    item.urgent ? 'bg-accent-400 text-primary-900' : 'bg-primary-100 text-primary-600'
                  }`}>
                    <Calendar className="w-6 h-6" />
                  </div>
                  <div>
                    <div className={`font-semibold ${item.urgent ? 'text-primary-900' : 'text-primary-600'}`}>
                      {item.date}
                    </div>
                    <div className="text-neutral-600">{item.event}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="container-max section-padding text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto space-y-8"
          >
            <h2 className="text-3xl lg:text-4xl font-bold">
              Ready to Join SchoolMUN 2024?
            </h2>
            <p className="text-xl text-blue-100">
              Don't miss out on this incredible opportunity to develop leadership skills, 
              engage in meaningful debate, and connect with students from around the region.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/registration"
                className="btn-accent inline-flex items-center justify-center space-x-2 text-lg px-8 py-4"
              >
                <span>Start Registration</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/committees"
                className="btn-secondary inline-flex items-center justify-center space-x-2 text-lg px-8 py-4 bg-white/10 border-white/30 text-white hover:bg-white hover:text-primary-900"
              >
                <span>View Committees</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Home;