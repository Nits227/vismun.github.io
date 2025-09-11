import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Users, Award, ArrowRight, Clock, BookOpen, Star } from 'lucide-react';
import Layout from '../components/Layout/Layout';

const Home = () => {
  const eventHighlights = [
    {
      icon: Calendar,
      title: 'March 15-16, 2024',
      description: 'Two days of engaging activities'
    },
    {
      icon: MapPin,
      title: 'Main Campus Auditorium',
      description: 'Easy access with parking available'
    },
    {
      icon: Users,
      title: '500+ Participants',
      description: 'Students and teachers from 20+ schools'
    },
    {
      icon: Award,
      title: 'Certificates & Prizes',
      description: 'Recognition for outstanding participation'
    }
  ];

  const schedule = [
    {
      time: '9:00 AM',
      title: 'Registration & Welcome',
      description: 'Check-in and opening ceremony'
    },
    {
      time: '10:30 AM',
      title: 'Keynote Session',
      description: 'Inspiring talk by education leaders'
    },
    {
      time: '12:00 PM',
      title: 'Interactive Workshops',
      description: 'Hands-on learning experiences'
    },
    {
      time: '2:00 PM',
      title: 'Panel Discussions',
      description: 'Expert insights and Q&A sessions'
    },
    {
      time: '4:00 PM',
      title: 'Awards Ceremony',
      description: 'Recognition and closing remarks'
    }
  ];

  const stats = [
    { icon: Users, value: '500+', label: 'Registered Participants' },
    { icon: BookOpen, value: '20+', label: 'Schools Participating' },
    { icon: Star, value: '15+', label: 'Expert Speakers' },
    { icon: Award, value: '50+', label: 'Awards & Certificates' }
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
                  <span>March 15-16, 2024</span>
                </motion.div>
                
                <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                  Annual School
                  <span className="block text-accent-400">Innovation Summit</span>
                </h1>
                
                <p className="text-xl lg:text-2xl text-blue-100 leading-relaxed">
                  Join us for two days of inspiring workshops, expert panels, and networking 
                  opportunities designed to shape the future of education.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/register"
                  className="btn-accent inline-flex items-center justify-center space-x-2 text-lg px-8 py-4"
                >
                  <span>Register Now</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
                
                <Link
                  to="/event-details"
                  className="btn-secondary inline-flex items-center justify-center space-x-2 text-lg px-8 py-4 bg-white/10 border-white/30 text-white hover:bg-white hover:text-primary-900"
                >
                  <span>Learn More</span>
                </Link>
              </div>

              <div className="flex items-center space-x-6 text-blue-100">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-5 h-5 text-accent-400" />
                  <span>Main Campus Auditorium</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-accent-400" />
                  <span>2 Days</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="glass-effect rounded-2xl p-8">
                <h3 className="text-2xl font-bold mb-6 text-center">Event Overview</h3>
                <div className="space-y-4">
                  {eventHighlights.map((highlight, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      className="flex items-center space-x-4"
                    >
                      <div className="w-10 h-10 bg-accent-400 text-primary-900 rounded-lg flex items-center justify-center">
                        <highlight.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-semibold">{highlight.title}</h4>
                        <p className="text-blue-100 text-sm">{highlight.description}</p>
                      </div>
                    </motion.div>
                  ))}
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

      {/* Schedule Preview */}
      <section className="py-16 bg-neutral-50">
        <div className="container-max section-padding">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-primary-900 mb-4">
              Event Schedule
            </h2>
            <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
              A carefully curated program designed to maximize learning and engagement
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
              {schedule.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="card flex items-center space-x-6"
                >
                  <div className="w-20 h-20 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">
                    {item.time.split(' ')[0]}
                    <span className="text-xs ml-1">{item.time.split(' ')[1]}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-primary-900 mb-2">{item.title}</h3>
                    <p className="text-neutral-600">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
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
              Ready to Join the Innovation Summit?
            </h2>
            <p className="text-xl text-blue-100">
              Don't miss this opportunity to be part of an educational revolution. 
              Register now and secure your spot at this transformative event.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="btn-accent inline-flex items-center justify-center space-x-2 text-lg px-8 py-4"
              >
                <span>Register Today</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/event-details"
                className="btn-secondary inline-flex items-center justify-center space-x-2 text-lg px-8 py-4 bg-white/10 border-white/30 text-white hover:bg-white hover:text-primary-900"
              >
                <BookOpen className="w-5 h-5" />
                <span>View Details</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Home;