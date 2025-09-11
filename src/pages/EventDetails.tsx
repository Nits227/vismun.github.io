import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Clock, Users, Download, CheckCircle, Star, Award } from 'lucide-react';
import Layout from '../components/Layout/Layout';

const EventDetails = () => {
  const agenda = [
    {
      day: 'Day 1 - March 15, 2024',
      sessions: [
        { time: '8:30 AM', title: 'Registration & Welcome Coffee', location: 'Main Lobby' },
        { time: '9:00 AM', title: 'Opening Ceremony', location: 'Main Auditorium' },
        { time: '9:30 AM', title: 'Keynote: Future of Education', location: 'Main Auditorium' },
        { time: '10:30 AM', title: 'Coffee Break', location: 'Exhibition Hall' },
        { time: '11:00 AM', title: 'Workshop Session 1', location: 'Various Rooms' },
        { time: '12:30 PM', title: 'Lunch & Networking', location: 'Cafeteria' },
        { time: '2:00 PM', title: 'Panel Discussion: Innovation in Learning', location: 'Main Auditorium' },
        { time: '3:30 PM', title: 'Workshop Session 2', location: 'Various Rooms' },
        { time: '5:00 PM', title: 'Day 1 Wrap-up', location: 'Main Auditorium' }
      ]
    },
    {
      day: 'Day 2 - March 16, 2024',
      sessions: [
        { time: '9:00 AM', title: 'Welcome & Day 2 Overview', location: 'Main Auditorium' },
        { time: '9:30 AM', title: 'Student Showcase Presentations', location: 'Main Auditorium' },
        { time: '11:00 AM', title: 'Coffee Break', location: 'Exhibition Hall' },
        { time: '11:30 AM', title: 'Interactive Workshops', location: 'Various Rooms' },
        { time: '1:00 PM', title: 'Lunch & Awards Preparation', location: 'Cafeteria' },
        { time: '2:30 PM', title: 'Final Panel: Implementing Change', location: 'Main Auditorium' },
        { time: '4:00 PM', title: 'Awards Ceremony', location: 'Main Auditorium' },
        { time: '5:00 PM', title: 'Closing Remarks & Networking', location: 'Main Auditorium' }
      ]
    }
  ];

  const speakers = [
    {
      name: 'Dr. Sarah Johnson',
      title: 'Education Innovation Expert',
      bio: 'Leading researcher in educational technology and student engagement.',
      image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      name: 'Prof. Michael Chen',
      title: 'Digital Learning Specialist',
      bio: 'Pioneer in online education platforms and virtual classroom design.',
      image: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      name: 'Ms. Emily Rodriguez',
      title: 'Student Success Coordinator',
      bio: 'Expert in student engagement and academic achievement strategies.',
      image: 'https://images.pexels.com/photos/3184293/pexels-photo-3184293.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ];

  const faqs = [
    {
      question: 'Who can attend this event?',
      answer: 'The event is open to students, teachers, administrators, and education professionals from all participating schools.'
    },
    {
      question: 'Is there a registration fee?',
      answer: 'No, this event is completely free for all registered participants. Lunch and refreshments are included.'
    },
    {
      question: 'What should I bring?',
      answer: 'Please bring a notebook, pen, and your enthusiasm to learn! All materials will be provided for workshops.'
    },
    {
      question: 'Will certificates be provided?',
      answer: 'Yes, all participants will receive a certificate of attendance, and special awards will be given for outstanding participation.'
    },
    {
      question: 'Is parking available?',
      answer: 'Yes, free parking is available on campus. Additional shuttle service will be provided from nearby parking areas.'
    }
  ];

  const rules = [
    'All participants must register in advance',
    'Professional attire is recommended',
    'Mobile phones should be on silent during sessions',
    'Photography is allowed during designated times only',
    'Participants must wear their name badges at all times',
    'Food and drinks are not allowed in workshop rooms',
    'Please be punctual for all sessions',
    'Respect all speakers and fellow participants'
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
              Event Details & Information
            </h1>
            <p className="text-xl lg:text-2xl text-blue-100 leading-relaxed">
              Everything you need to know about the Annual School Innovation Summit
            </p>
          </motion.div>
        </div>
      </section>

      {/* Event Overview */}
      <section className="py-16 bg-white">
        <div className="container-max section-padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-primary-900">
                About the Summit
              </h2>
              <div className="space-y-4 text-neutral-600 leading-relaxed">
                <p>
                  The Annual School Innovation Summit is a premier educational event that brings 
                  together students, teachers, and education leaders to explore the latest trends 
                  and innovations in learning and teaching.
                </p>
                <p>
                  Over two intensive days, participants will engage in keynote presentations, 
                  interactive workshops, panel discussions, and networking opportunities designed 
                  to inspire and equip educators with cutting-edge tools and strategies.
                </p>
                <p>
                  This year's theme focuses on "Transforming Education Through Innovation," 
                  highlighting how technology, creativity, and collaboration can revolutionize 
                  the learning experience for students of all ages.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-neutral-50 rounded-2xl p-8"
            >
              <h3 className="text-2xl font-bold text-primary-900 mb-6">Quick Facts</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Calendar className="w-6 h-6 text-primary-600" />
                  <div>
                    <div className="font-semibold text-primary-900">March 15-16, 2024</div>
                    <div className="text-neutral-600">Friday to Saturday</div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <MapPin className="w-6 h-6 text-primary-600" />
                  <div>
                    <div className="font-semibold text-primary-900">Main Campus Auditorium</div>
                    <div className="text-neutral-600">123 Education Street</div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Clock className="w-6 h-6 text-primary-600" />
                  <div>
                    <div className="font-semibold text-primary-900">2 Full Days</div>
                    <div className="text-neutral-600">9:00 AM - 5:00 PM daily</div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Users className="w-6 h-6 text-primary-600" />
                  <div>
                    <div className="font-semibold text-primary-900">500+ Participants</div>
                    <div className="text-neutral-600">From 20+ schools</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Detailed Agenda */}
      <section className="py-16 bg-neutral-50">
        <div className="container-max section-padding">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-primary-900 mb-4">
              Detailed Agenda
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              A comprehensive schedule of all sessions, workshops, and activities
            </p>
          </motion.div>

          <div className="space-y-8">
            {agenda.map((day, dayIndex) => (
              <motion.div
                key={dayIndex}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: dayIndex * 0.2 }}
                className="card"
              >
                <div className="border-b border-neutral-200 pb-4 mb-6">
                  <h3 className="text-2xl font-bold text-primary-900">{day.day}</h3>
                </div>
                <div className="space-y-4">
                  {day.sessions.map((session, sessionIndex) => (
                    <div key={sessionIndex} className="flex items-start space-x-4 py-2">
                      <div className="w-20 text-sm font-medium text-primary-600 flex-shrink-0">
                        {session.time}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-primary-900">{session.title}</h4>
                        <p className="text-sm text-neutral-600">{session.location}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Speakers */}
      <section className="py-16 bg-white">
        <div className="container-max section-padding">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-primary-900 mb-4">
              Featured Speakers
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              Learn from industry experts and thought leaders in education
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {speakers.map((speaker, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="card text-center"
              >
                <img
                  src={speaker.image}
                  alt={speaker.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-bold text-primary-900 mb-2">{speaker.name}</h3>
                <p className="text-accent-600 font-medium mb-3">{speaker.title}</p>
                <p className="text-neutral-600 text-sm">{speaker.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Rules & Guidelines */}
      <section className="py-16 bg-neutral-50">
        <div className="container-max section-padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="card"
            >
              <h2 className="text-2xl font-bold text-primary-900 mb-6">Event Rules & Guidelines</h2>
              <div className="space-y-3">
                {rules.map((rule, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-neutral-600">{rule}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              className="card"
            >
              <h2 className="text-2xl font-bold text-primary-900 mb-6">Downloadable Resources</h2>
              <div className="space-y-4">
                <a
                  href="#"
                  className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg hover:bg-neutral-100 transition-colors duration-200"
                >
                  <div className="flex items-center space-x-3">
                    <Download className="w-5 h-5 text-primary-600" />
                    <div>
                      <h4 className="font-medium text-primary-900">Event Program</h4>
                      <p className="text-sm text-neutral-600">Complete schedule and details</p>
                    </div>
                  </div>
                  <span className="text-sm text-neutral-500">PDF, 2.1 MB</span>
                </a>
                
                <a
                  href="#"
                  className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg hover:bg-neutral-100 transition-colors duration-200"
                >
                  <div className="flex items-center space-x-3">
                    <Download className="w-5 h-5 text-primary-600" />
                    <div>
                      <h4 className="font-medium text-primary-900">Campus Map</h4>
                      <p className="text-sm text-neutral-600">Venue locations and parking</p>
                    </div>
                  </div>
                  <span className="text-sm text-neutral-500">PDF, 1.5 MB</span>
                </a>
                
                <a
                  href="#"
                  className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg hover:bg-neutral-100 transition-colors duration-200"
                >
                  <div className="flex items-center space-x-3">
                    <Download className="w-5 h-5 text-primary-600" />
                    <div>
                      <h4 className="font-medium text-primary-900">Workshop Materials</h4>
                      <p className="text-sm text-neutral-600">Pre-reading and resources</p>
                    </div>
                  </div>
                  <span className="text-sm text-neutral-500">ZIP, 5.2 MB</span>
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container-max section-padding">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-primary-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              Find answers to common questions about the event
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="card"
              >
                <h3 className="text-lg font-semibold text-primary-900 mb-3">{faq.question}</h3>
                <p className="text-neutral-600 leading-relaxed">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default EventDetails;