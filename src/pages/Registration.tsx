import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { School, Users, Mail, Phone, MapPin, Save, Send, ArrowRight, ArrowLeft } from 'lucide-react';
import Layout from '../components/Layout/Layout';
import { mockCommittees } from '../lib/supabase';

const schoolSchema = z.object({
  schoolName: z.string().min(2, 'School name is required'),
  address: z.string().min(5, 'Address is required'),
  coordinatorName: z.string().min(2, 'Coordinator name is required'),
  coordinatorEmail: z.string().email('Valid email is required'),
  coordinatorPhone: z.string().min(10, 'Valid phone number is required'),
  numberOfDelegates: z.number().min(1, 'At least 1 delegate required').max(50, 'Maximum 50 delegates'),
  committeePreferences: z.array(z.string()).min(3, 'Please select at least 3 committee preferences'),
  specialRequirements: z.string().optional(),
  agreedToTerms: z.boolean().refine(val => val === true, 'You must agree to the terms')
});

type SchoolFormData = z.infer<typeof schoolSchema>;

const Registration = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [savedDraft, setSavedDraft] = useState(false);
  
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting }
  } = useForm<SchoolFormData>({
    resolver: zodResolver(schoolSchema),
    defaultValues: {
      numberOfDelegates: 5,
      committeePreferences: []
    }
  });

  const watchedPreferences = watch('committeePreferences') || [];

  const onSubmit = async (data: SchoolFormData) => {
    console.log('Registration submitted:', data);
    // Here you would submit to your backend
    await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API call
    alert('Registration submitted successfully!');
  };

  const saveDraft = () => {
    setSavedDraft(true);
    setTimeout(() => setSavedDraft(false), 2000);
  };

  const toggleCommitteePreference = (committeeId: string) => {
    const current = watchedPreferences;
    const updated = current.includes(committeeId)
      ? current.filter(id => id !== committeeId)
      : [...current, committeeId];
    setValue('committeePreferences', updated);
  };

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 3));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

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
              School Registration
            </h1>
            <p className="text-xl lg:text-2xl text-blue-100 leading-relaxed">
              Register your school for SchoolMUN 2024 and secure your delegates' spots 
              in this premier educational experience.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Registration Form */}
      <section className="py-16 bg-neutral-50">
        <div className="container-max section-padding">
          <div className="max-w-4xl mx-auto">
            {/* Progress Indicator */}
            <div className="mb-8">
              <div className="flex items-center justify-center space-x-4">
                {[1, 2, 3].map((step) => (
                  <div key={step} className="flex items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                      currentStep >= step 
                        ? 'bg-primary-600 text-white' 
                        : 'bg-neutral-200 text-neutral-600'
                    }`}>
                      {step}
                    </div>
                    {step < 3 && (
                      <div className={`w-16 h-1 mx-2 ${
                        currentStep > step ? 'bg-primary-600' : 'bg-neutral-200'
                      }`} />
                    )}
                  </div>
                ))}
              </div>
              <div className="text-center mt-4">
                <span className="text-sm text-neutral-600">
                  Step {currentStep} of 3: {
                    currentStep === 1 ? 'School Information' :
                    currentStep === 2 ? 'Committee Preferences' :
                    'Review & Submit'
                  }
                </span>
              </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              {/* Step 1: School Information */}
              {currentStep === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="card"
                >
                  <div className="flex items-center space-x-3 mb-6">
                    <School className="w-6 h-6 text-primary-600" />
                    <h2 className="text-2xl font-bold text-primary-900">School Information</h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        School Name *
                      </label>
                      <input
                        {...register('schoolName')}
                        className="input-field"
                        placeholder="Enter your school name"
                      />
                      {errors.schoolName && (
                        <p className="text-red-600 text-sm mt-1">{errors.schoolName.message}</p>
                      )}
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        School Address *
                      </label>
                      <input
                        {...register('address')}
                        className="input-field"
                        placeholder="Enter complete school address"
                      />
                      {errors.address && (
                        <p className="text-red-600 text-sm mt-1">{errors.address.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Coordinator Name *
                      </label>
                      <input
                        {...register('coordinatorName')}
                        className="input-field"
                        placeholder="Full name of MUN coordinator"
                      />
                      {errors.coordinatorName && (
                        <p className="text-red-600 text-sm mt-1">{errors.coordinatorName.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Coordinator Email *
                      </label>
                      <input
                        {...register('coordinatorEmail')}
                        type="email"
                        className="input-field"
                        placeholder="coordinator@school.edu"
                      />
                      {errors.coordinatorEmail && (
                        <p className="text-red-600 text-sm mt-1">{errors.coordinatorEmail.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Coordinator Phone *
                      </label>
                      <input
                        {...register('coordinatorPhone')}
                        type="tel"
                        className="input-field"
                        placeholder="+1 (555) 123-4567"
                      />
                      {errors.coordinatorPhone && (
                        <p className="text-red-600 text-sm mt-1">{errors.coordinatorPhone.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Number of Delegates *
                      </label>
                      <input
                        {...register('numberOfDelegates', { valueAsNumber: true })}
                        type="number"
                        min="1"
                        max="50"
                        className="input-field"
                        placeholder="5"
                      />
                      {errors.numberOfDelegates && (
                        <p className="text-red-600 text-sm mt-1">{errors.numberOfDelegates.message}</p>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Committee Preferences */}
              {currentStep === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="card"
                >
                  <div className="flex items-center space-x-3 mb-6">
                    <Users className="w-6 h-6 text-primary-600" />
                    <h2 className="text-2xl font-bold text-primary-900">Committee Preferences</h2>
                  </div>

                  <p className="text-neutral-600 mb-6">
                    Select at least 3 committees in order of preference. We'll do our best to assign 
                    your delegates to your preferred committees.
                  </p>

                  <div className="space-y-4">
                    {mockCommittees.map((committee, index) => (
                      <div
                        key={committee.id}
                        className={`border rounded-lg p-4 cursor-pointer transition-all duration-200 ${
                          watchedPreferences.includes(committee.id)
                            ? 'border-primary-600 bg-primary-50'
                            : 'border-neutral-200 hover:border-primary-300'
                        }`}
                        onClick={() => toggleCommitteePreference(committee.id)}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3">
                              <input
                                type="checkbox"
                                checked={watchedPreferences.includes(committee.id)}
                                onChange={() => toggleCommitteePreference(committee.id)}
                                className="w-5 h-5 text-primary-600 rounded focus:ring-primary-500"
                              />
                              <h3 className="font-semibold text-primary-900">{committee.name}</h3>
                              {watchedPreferences.includes(committee.id) && (
                                <span className="bg-primary-600 text-white text-xs px-2 py-1 rounded">
                                  #{watchedPreferences.indexOf(committee.id) + 1}
                                </span>
                              )}
                            </div>
                            <p className="text-neutral-600 text-sm mt-2 ml-8">
                              {committee.description}
                            </p>
                            <div className="flex items-center space-x-4 mt-2 ml-8 text-xs text-neutral-500">
                              <span>{committee.min_delegates}-{committee.max_delegates} delegates</span>
                              <span>Grades: {committee.eligible_grades?.join(', ')}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {errors.committeePreferences && (
                    <p className="text-red-600 text-sm mt-4">{errors.committeePreferences.message}</p>
                  )}

                  <div className="mt-6 p-4 bg-accent-50 border border-accent-200 rounded-lg">
                    <p className="text-sm text-primary-900">
                      <strong>Selected:</strong> {watchedPreferences.length} committee{watchedPreferences.length !== 1 ? 's' : ''}
                      {watchedPreferences.length >= 3 && (
                        <span className="text-green-600 ml-2">✓ Minimum requirement met</span>
                      )}
                    </p>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Review & Submit */}
              {currentStep === 3 && (
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <div className="card">
                    <h2 className="text-2xl font-bold text-primary-900 mb-6">Review Your Registration</h2>
                    
                    <div className="space-y-6">
                      <div>
                        <h3 className="font-semibold text-primary-900 mb-3">School Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-neutral-600">School:</span>
                            <span className="ml-2 font-medium">{watch('schoolName')}</span>
                          </div>
                          <div>
                            <span className="text-neutral-600">Coordinator:</span>
                            <span className="ml-2 font-medium">{watch('coordinatorName')}</span>
                          </div>
                          <div>
                            <span className="text-neutral-600">Email:</span>
                            <span className="ml-2 font-medium">{watch('coordinatorEmail')}</span>
                          </div>
                          <div>
                            <span className="text-neutral-600">Delegates:</span>
                            <span className="ml-2 font-medium">{watch('numberOfDelegates')}</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="font-semibold text-primary-900 mb-3">Committee Preferences</h3>
                        <div className="space-y-2">
                          {watchedPreferences.map((prefId, index) => {
                            const committee = mockCommittees.find(c => c.id === prefId);
                            return (
                              <div key={prefId} className="flex items-center space-x-3">
                                <span className="w-6 h-6 bg-primary-600 text-white text-xs rounded-full flex items-center justify-center">
                                  {index + 1}
                                </span>
                                <span className="font-medium">{committee?.name}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="card">
                    <h3 className="font-semibold text-primary-900 mb-4">Additional Requirements</h3>
                    <textarea
                      {...register('specialRequirements')}
                      className="input-field"
                      rows={4}
                      placeholder="Any special requirements, dietary restrictions, or accessibility needs for your delegates..."
                    />
                  </div>

                  <div className="card">
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
                          {' '}and confirm that all information provided is accurate. I understand that 
                          registration fees are non-refundable after the deadline.
                        </p>
                        {errors.agreedToTerms && (
                          <p className="text-red-600 mt-1">{errors.agreedToTerms.message}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Navigation Buttons */}
              <div className="flex items-center justify-between pt-6">
                <div className="flex space-x-4">
                  {currentStep > 1 && (
                    <button
                      type="button"
                      onClick={prevStep}
                      className="btn-secondary inline-flex items-center space-x-2"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Previous</span>
                    </button>
                  )}
                  
                  <button
                    type="button"
                    onClick={saveDraft}
                    className="btn-secondary inline-flex items-center space-x-2"
                  >
                    <Save className="w-4 h-4" />
                    <span>{savedDraft ? 'Saved!' : 'Save Draft'}</span>
                  </button>
                </div>

                <div>
                  {currentStep < 3 ? (
                    <button
                      type="button"
                      onClick={nextStep}
                      className="btn-primary inline-flex items-center space-x-2"
                    >
                      <span>Next</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-primary inline-flex items-center space-x-2"
                    >
                      <Send className="w-4 h-4" />
                      <span>{isSubmitting ? 'Submitting...' : 'Submit Registration'}</span>
                    </button>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Registration;