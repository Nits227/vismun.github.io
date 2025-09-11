import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { User, Mail, School, GraduationCap, Save, Send, CheckCircle } from 'lucide-react';
import Layout from '../components/Layout/Layout';
import { addRegistration } from '../lib/auth';

const registrationSchema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  email: z.string().email('Valid email is required'),
  schoolName: z.string().min(2, 'School name is required'),
  grade: z.string().optional(),
  role: z.enum(['student', 'teacher'], {
    required_error: 'Please select your role'
  }),
  phone: z.string().min(10, 'Valid phone number is required'),
  emergencyContact: z.string().min(2, 'Emergency contact is required'),
  emergencyPhone: z.string().min(10, 'Emergency contact phone is required'),
  dietaryRestrictions: z.string().optional(),
  specialNeeds: z.string().optional(),
  agreedToTerms: z.boolean().refine(val => val === true, 'You must agree to the terms and conditions')
});

type RegistrationFormData = z.infer<typeof registrationSchema>;

const Register = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema)
  });

  const watchedRole = watch('role');

  const onSubmit = async (data: RegistrationFormData) => {
    setIsSubmitting(true);
    
    try {
      // Add registration to mock database
      addRegistration(data);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setIsSubmitted(true);
    } catch (error) {
      console.error('Registration failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <Layout>
        <section className="py-16 bg-neutral-50 min-h-screen flex items-center">
          <div className="container-max section-padding w-full">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-2xl mx-auto text-center"
            >
              <div className="card">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h1 className="text-3xl font-bold text-primary-900 mb-4">
                  Registration Successful!
                </h1>
                <p className="text-xl text-neutral-600 mb-6">
                  Thank you for registering for the Annual School Innovation Summit. 
                  You will receive a confirmation email shortly with all the event details.
                </p>
                <div className="bg-accent-50 border border-accent-200 rounded-lg p-6 mb-6">
                  <h3 className="font-semibold text-primary-900 mb-2">What's Next?</h3>
                  <ul className="text-left space-y-2 text-neutral-600">
                    <li>• Check your email for confirmation and event details</li>
                    <li>• Download the event program and campus map</li>
                    <li>• Mark your calendar for March 15-16, 2024</li>
                    <li>• Prepare for an amazing learning experience!</li>
                  </ul>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a href="/" className="btn-primary">
                    Back to Home
                  </a>
                  <a href="/event-details" className="btn-secondary">
                    View Event Details
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </Layout>
    );
  }

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
              Event Registration
            </h1>
            <p className="text-xl lg:text-2xl text-blue-100 leading-relaxed">
              Join us for the Annual School Innovation Summit. Registration is free 
              and includes all sessions, materials, and meals.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Registration Form */}
      <section className="py-16 bg-neutral-50">
        <div className="container-max section-padding">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="card"
            >
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-primary-900 mb-2">Registration Form</h2>
                <p className="text-neutral-600">
                  Please fill out all required fields to complete your registration
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                {/* Personal Information */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-primary-900 border-b border-neutral-200 pb-2">
                    Personal Information
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Full Name *
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
                        <input
                          {...register('fullName')}
                          className="input-field pl-10"
                          placeholder="Enter your full name"
                        />
                      </div>
                      {errors.fullName && (
                        <p className="text-red-600 text-sm mt-1">{errors.fullName.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Email Address *
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
                        <input
                          {...register('email')}
                          type="email"
                          className="input-field pl-10"
                          placeholder="your.email@school.edu"
                        />
                      </div>
                      {errors.email && (
                        <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Phone Number *
                      </label>
                      <input
                        {...register('phone')}
                        type="tel"
                        className="input-field"
                        placeholder="+1 (555) 123-4567"
                      />
                      {errors.phone && (
                        <p className="text-red-600 text-sm mt-1">{errors.phone.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Role *
                      </label>
                      <select {...register('role')} className="input-field">
                        <option value="">Select your role</option>
                        <option value="student">Student</option>
                        <option value="teacher">Teacher/Staff</option>
                      </select>
                      {errors.role && (
                        <p className="text-red-600 text-sm mt-1">{errors.role.message}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* School Information */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-primary-900 border-b border-neutral-200 pb-2">
                    School Information
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        School Name *
                      </label>
                      <div className="relative">
                        <School className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
                        <input
                          {...register('schoolName')}
                          className="input-field pl-10"
                          placeholder="Enter your school name"
                        />
                      </div>
                      {errors.schoolName && (
                        <p className="text-red-600 text-sm mt-1">{errors.schoolName.message}</p>
                      )}
                    </div>

                    {watchedRole === 'student' && (
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                          Grade/Class
                        </label>
                        <div className="relative">
                          <GraduationCap className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
                          <select {...register('grade')} className="input-field pl-10">
                            <option value="">Select your grade</option>
                            <option value="9">Grade 9</option>
                            <option value="10">Grade 10</option>
                            <option value="11">Grade 11</option>
                            <option value="12">Grade 12</option>
                          </select>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Emergency Contact */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-primary-900 border-b border-neutral-200 pb-2">
                    Emergency Contact
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Emergency Contact Name *
                      </label>
                      <input
                        {...register('emergencyContact')}
                        className="input-field"
                        placeholder="Parent/Guardian name"
                      />
                      {errors.emergencyContact && (
                        <p className="text-red-600 text-sm mt-1">{errors.emergencyContact.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Emergency Contact Phone *
                      </label>
                      <input
                        {...register('emergencyPhone')}
                        type="tel"
                        className="input-field"
                        placeholder="+1 (555) 123-4567"
                      />
                      {errors.emergencyPhone && (
                        <p className="text-red-600 text-sm mt-1">{errors.emergencyPhone.message}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Additional Information */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-primary-900 border-b border-neutral-200 pb-2">
                    Additional Information
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Dietary Restrictions
                      </label>
                      <textarea
                        {...register('dietaryRestrictions')}
                        className="input-field"
                        rows={3}
                        placeholder="Any food allergies or dietary requirements..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Special Needs/Accommodations
                      </label>
                      <textarea
                        {...register('specialNeeds')}
                        className="input-field"
                        rows={3}
                        placeholder="Any accessibility needs or special accommodations..."
                      />
                    </div>
                  </div>
                </div>

                {/* Terms and Conditions */}
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <input
                      {...register('agreedToTerms')}
                      type="checkbox"
                      className="w-5 h-5 text-primary-600 rounded focus:ring-primary-500 mt-0.5"
                    />
                    <div className="text-sm">
                      <p className="text-neutral-700">
                        I agree to the{' '}
                        <a href="#" className="text-primary-600 hover:underline">terms and conditions</a>
                        {' '}and{' '}
                        <a href="#" className="text-primary-600 hover:underline">privacy policy</a>.
                        I understand that this registration is free and includes all sessions, materials, and meals.
                      </p>
                      {errors.agreedToTerms && (
                        <p className="text-red-600 mt-1">{errors.agreedToTerms.message}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary flex-1 inline-flex items-center justify-center space-x-2"
                  >
                    <Send className="w-5 h-5" />
                    <span>{isSubmitting ? 'Submitting...' : 'Complete Registration'}</span>
                  </button>
                  
                  <button
                    type="button"
                    className="btn-secondary inline-flex items-center justify-center space-x-2"
                  >
                    <Save className="w-5 h-5" />
                    <span>Save Draft</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Register;