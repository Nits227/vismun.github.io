import React from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Mail, Phone, MapPin, Clock, Send, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import Layout from '../components/Layout/Layout';

const contactSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email is required'),
  school: z.string().optional(),
  subject: z.string().min(5, 'Subject is required'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;

const Contact = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema)
  });

  const onSubmit = async (data: ContactFormData) => {
    console.log('Contact form submitted:', data);
    // Here you would submit to your backend
    await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API call
    alert('Message sent successfully! We\'ll get back to you soon.');
    reset();
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      details: 'info@schoolmun.org',
      description: 'Send us an email anytime'
    },
    {
      icon: Phone,
      title: 'Phone',
      details: '+1 (555) 123-4567',
      description: 'Call us during business hours'
    },
    {
      icon: MapPin,
      title: 'Address',
      details: '123 Education Avenue\nLearning City, LC 12345',
      description: 'Visit our main office'
    },
    {
      icon: Clock,
      title: 'Office Hours',
      details: 'Mon-Fri: 9:00 AM - 5:00 PM\nSat: 10:00 AM - 2:00 PM',
      description: 'When we\'re available'
    }
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' }
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
              Contact Us
            </h1>
            <p className="text-xl lg:text-2xl text-blue-100 leading-relaxed">
              Have questions about SchoolMUN 2024? We're here to help! 
              Reach out to us and we'll get back to you as soon as possible.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form and Info */}
      <section className="py-16 bg-neutral-50">
        <div className="container-max section-padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="card"
            >
              <h2 className="text-2xl font-bold text-primary-900 mb-6">Send us a Message</h2>
              
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      {...register('name')}
                      className="input-field"
                      placeholder="Your full name"
                    />
                    {errors.name && (
                      <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      {...register('email')}
                      type="email"
                      className="input-field"
                      placeholder="your.email@example.com"
                    />
                    {errors.email && (
                      <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    School/Organization (Optional)
                  </label>
                  <input
                    {...register('school')}
                    className="input-field"
                    placeholder="Your school or organization name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Subject *
                  </label>
                  <input
                    {...register('subject')}
                    className="input-field"
                    placeholder="What is your inquiry about?"
                  />
                  {errors.subject && (
                    <p className="text-red-600 text-sm mt-1">{errors.subject.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    {...register('message')}
                    rows={6}
                    className="input-field"
                    placeholder="Please provide details about your inquiry..."
                  />
                  {errors.message && (
                    <p className="text-red-600 text-sm mt-1">{errors.message.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full inline-flex items-center justify-center space-x-2"
                >
                  <Send className="w-5 h-5" />
                  <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                </button>
              </form>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-2xl font-bold text-primary-900 mb-6">Get in Touch</h2>
                <p className="text-neutral-600 leading-relaxed mb-8">
                  We're committed to providing excellent support for all participants. 
                  Whether you have questions about registration, committees, or logistics, 
                  our team is ready to assist you.
                </p>
              </div>

              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start space-x-4"
                  >
                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <info.icon className="w-6 h-6 text-primary-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-primary-900 mb-1">{info.title}</h3>
                      <p className="text-neutral-600 whitespace-pre-line">{info.details}</p>
                      <p className="text-neutral-500 text-sm mt-1">{info.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Social Media */}
              <div className="pt-8 border-t border-neutral-200">
                <h3 className="font-semibold text-primary-900 mb-4">Follow Us</h3>
                <div className="flex space-x-4">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center text-primary-600 hover:bg-primary-600 hover:text-white transition-all duration-200"
                      aria-label={social.label}
                    >
                      <social.icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-white">
        <div className="container-max section-padding">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-primary-900 mb-4">
              Find Us
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              Located in the heart of the Learning District, our office is easily accessible 
              by public transportation and has ample parking available.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-neutral-200 rounded-2xl h-96 flex items-center justify-center"
          >
            <div className="text-center">
              <MapPin className="w-16 h-16 text-neutral-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-neutral-600 mb-2">Interactive Map</h3>
              <p className="text-neutral-500">
                Map integration would be implemented here<br />
                123 Education Avenue, Learning City, LC 12345
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick Response Section */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="container-max section-padding text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Quick Response Guarantee
            </h2>
            <p className="text-xl text-blue-100 leading-relaxed mb-8">
              We understand that time is important when planning for MUN conferences. 
              That's why we guarantee a response to all inquiries within 24 hours during business days.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/10 rounded-lg p-6">
                <div className="text-3xl font-bold text-accent-400 mb-2">24hrs</div>
                <div className="text-sm text-blue-100">Response Time</div>
              </div>
              <div className="bg-white/10 rounded-lg p-6">
                <div className="text-3xl font-bold text-accent-400 mb-2">100%</div>
                <div className="text-sm text-blue-100">Satisfaction Rate</div>
              </div>
              <div className="bg-white/10 rounded-lg p-6">
                <div className="text-3xl font-bold text-accent-400 mb-2">24/7</div>
                <div className="text-sm text-blue-100">Email Support</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;