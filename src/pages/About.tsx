import React from 'react';
import { motion } from 'framer-motion';
import { Target, Users, Globe, Award, Calendar, MapPin, Clock, CheckCircle } from 'lucide-react';
import Layout from '../components/Layout/Layout';

const About = () => {
  const objectives = [
    {
      icon: Target,
      title: 'Develop Critical Thinking',
      description: 'Enhance analytical and problem-solving skills through complex global issues'
    },
    {
      icon: Users,
      title: 'Build Leadership',
      description: 'Foster leadership qualities and confidence in public speaking'
    },
    {
      icon: Globe,
      title: 'Global Awareness',
      description: 'Increase understanding of international relations and diplomacy'
    },
    {
      icon: Award,
      title: 'Academic Excellence',
      description: 'Promote research skills and academic achievement'
    }
  ];

  const schedule = [
    {
      day: 'Day 1 - Friday',
      date: 'June 1, 2024',
      events: [
        { time: '8:00 AM', event: 'Registration & Check-in' },
        { time: '9:00 AM', event: 'Opening Ceremony' },
        { time: '10:30 AM', event: 'Committee Sessions Begin' },
        { time: '12:30 PM', event: 'Lunch Break' },
        { time: '2:00 PM', event: 'Afternoon Sessions' },
        { time: '5:00 PM', event: 'Day 1 Wrap-up' }
      ]
    },
    {
      day: 'Day 2 - Saturday',
      date: 'June 2, 2024',
      events: [
        { time: '9:00 AM', event: 'Committee Sessions Resume' },
        { time: '12:30 PM', event: 'Lunch & Networking' },
        { time: '2:00 PM', event: 'Crisis Simulations' },
        { time: '4:00 PM', event: 'Voting Procedures' },
        { time: '6:00 PM', event: 'Cultural Evening' }
      ]
    },
    {
      day: 'Day 3 - Sunday',
      date: 'June 3, 2024',
      events: [
        { time: '9:00 AM', event: 'Final Committee Sessions' },
        { time: '11:00 AM', event: 'Resolution Presentations' },
        { time: '12:30 PM', event: 'Lunch Break' },
        { time: '2:00 PM', event: 'Awards Ceremony' },
        { time: '3:30 PM', event: 'Closing Remarks' },
        { time: '4:00 PM', event: 'Conference Ends' }
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
              About SchoolMUN 2024
            </h1>
            <p className="text-xl lg:text-2xl text-blue-100 leading-relaxed">
              A premier Model United Nations conference designed to inspire and educate 
              the next generation of global leaders through diplomatic simulation and debate.
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
                What is SchoolMUN?
              </h2>
              <div className="space-y-4 text-neutral-600 leading-relaxed">
                <p>
                  SchoolMUN 2024 is an intensive three-day Model United Nations conference 
                  that brings together high school students from across the region to engage 
                  in diplomatic simulation, debate pressing global issues, and develop 
                  essential 21st-century skills.
                </p>
                <p>
                  Our conference features 12 diverse committees covering topics from 
                  international security to environmental sustainability, providing 
                  delegates with authentic UN experiences while fostering critical 
                  thinking, public speaking, and negotiation skills.
                </p>
                <p>
                  With over 500 expected participants representing 50+ schools, 
                  SchoolMUN 2024 promises to be our largest and most impactful 
                  conference to date.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-neutral-50 rounded-2xl p-8"
            >
              <h3 className="text-2xl font-bold text-primary-900 mb-6">Conference Details</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Calendar className="w-6 h-6 text-primary-600" />
                  <div>
                    <div className="font-semibold text-primary-900">June 1-3, 2024</div>
                    <div className="text-neutral-600">Friday to Sunday</div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <MapPin className="w-6 h-6 text-primary-600" />
                  <div>
                    <div className="font-semibold text-primary-900">Metropolitan Convention Center</div>
                    <div className="text-neutral-600">Downtown Learning District</div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Clock className="w-6 h-6 text-primary-600" />
                  <div>
                    <div className="font-semibold text-primary-900">3 Full Days</div>
                    <div className="text-neutral-600">Intensive committee sessions</div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Users className="w-6 h-6 text-primary-600" />
                  <div>
                    <div className="font-semibold text-primary-900">500+ Delegates</div>
                    <div className="text-neutral-600">From 50+ regional schools</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Objectives */}
      <section className="py-16 bg-neutral-50">
        <div className="container-max section-padding">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-primary-900 mb-4">
              Conference Objectives
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              Our mission is to provide students with transformative educational experiences 
              that prepare them for global citizenship and leadership.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {objectives.map((objective, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="card text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
                  <objective.icon className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-bold text-primary-900 mb-3">
                  {objective.title}
                </h3>
                <p className="text-neutral-600">
                  {objective.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Conference Theme */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="container-max section-padding text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              2024 Theme: "Building Bridges in a Divided World"
            </h2>
            <p className="text-xl text-blue-100 leading-relaxed mb-8">
              In an era of increasing global challenges and polarization, this year's theme 
              emphasizes the critical importance of diplomacy, understanding, and cooperation 
              in addressing the world's most pressing issues. Delegates will explore how 
              nations can work together despite differences to create sustainable solutions 
              for our shared future.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              <div className="bg-white/10 rounded-lg p-6">
                <CheckCircle className="w-8 h-8 text-accent-400 mb-3" />
                <h3 className="font-bold mb-2">Diplomatic Solutions</h3>
                <p className="text-blue-100 text-sm">
                  Focus on negotiation and compromise to resolve conflicts
                </p>
              </div>
              <div className="bg-white/10 rounded-lg p-6">
                <CheckCircle className="w-8 h-8 text-accent-400 mb-3" />
                <h3 className="font-bold mb-2">Cultural Understanding</h3>
                <p className="text-blue-100 text-sm">
                  Promote cross-cultural dialogue and mutual respect
                </p>
              </div>
              <div className="bg-white/10 rounded-lg p-6">
                <CheckCircle className="w-8 h-8 text-accent-400 mb-3" />
                <h3 className="font-bold mb-2">Sustainable Cooperation</h3>
                <p className="text-blue-100 text-sm">
                  Build lasting partnerships for global challenges
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Schedule */}
      <section className="py-16 bg-white">
        <div className="container-max section-padding">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-primary-900 mb-4">
              Conference Schedule
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              A comprehensive three-day program designed to maximize learning and engagement
            </p>
          </motion.div>

          <div className="space-y-8">
            {schedule.map((day, dayIndex) => (
              <motion.div
                key={dayIndex}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: dayIndex * 0.2 }}
                className="card"
              >
                <div className="border-b border-neutral-200 pb-4 mb-6">
                  <h3 className="text-2xl font-bold text-primary-900">{day.day}</h3>
                  <p className="text-neutral-600">{day.date}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {day.events.map((event, eventIndex) => (
                    <div key={eventIndex} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
                      <div>
                        <div className="font-semibold text-primary-600">{event.time}</div>
                        <div className="text-neutral-600 text-sm">{event.event}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;