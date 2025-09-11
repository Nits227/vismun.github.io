import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { User, Mail, Lock, Eye, EyeOff, UserPlus, School, GraduationCap } from 'lucide-react';
import Layout from '../components/Layout/Layout';
import { signUp } from '../lib/auth';
import { useAuth } from '../contexts/AuthContext';

const signupSchema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  email: z.string().email('Valid email is required'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
  schoolName: z.string().min(2, 'School name is required'),
  grade: z.string().optional(),
  role: z.enum(['student', 'teacher'], {
    required_error: 'Please select your role'
  }),
  agreedToTerms: z.boolean().refine(val => val === true, 'You must agree to the terms')
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type SignupFormData = z.infer<typeof signupSchema>;

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [signupError, setSignupError] = useState('');
  const navigate = useNavigate();
  const { refreshUser } = useAuth();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting }
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema)
  });

  const watchedRole = watch('role');

  const onSubmit = async (data: SignupFormData) => {
    setSignupError('');
    
    try {
      const result = await signUp({
        fullName: data.fullName,
        email: data.email,
        password: data.password,
        schoolName: data.schoolName,
        grade: data.grade,
        role: data.role
      });
      
      if (result.success) {
        refreshUser();
        navigate('/profile');
      } else {
        setSignupError(result.error || 'Registration failed');
      }
    } catch (error) {
      setSignupError('An unexpected error occurred');
    }
  };

  return (
    <Layout>
      <section className="py-16 bg-neutral-50 min-h-screen flex items-center">
        <div className="container-max section-padding w-full">
          <div className="max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="card"
            >
              {/* Header */}
              <div className="text-center mb-8">
                <Link to="/" className="inline-flex items-center space-x-2 mb-6">
                  <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                    <GraduationCap className="w-6 h-6 text-white" />
                  </div>
                  <span className="font-bold text-xl text-primary-600">SchoolEvent</span>
                </Link>
                
                <h1 className="text-2xl font-bold text-primary-900 mb-2">
                  Create Your Account
                </h1>
                <p className="text-neutral-600">
                  Join our community and get access to exclusive educational events
                </p>
              </div>

              {/* Signup Form */}
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {signupError && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-600 text-sm">{signupError}</p>
                  </div>
                )}

                {/* Personal Information */}
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
                </div>

                {/* Password Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Password *
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
                      <input
                        {...register('password')}
                        type={showPassword ? 'text' : 'password'}
                        className="input-field pl-10 pr-10"
                        placeholder="Create a password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                    {errors.password && (
                      <p className="text-red-600 text-sm mt-1">{errors.password.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Confirm Password *
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
                      <input
                        {...register('confirmPassword')}
                        type={showConfirmPassword ? 'text' : 'password'}
                        className="input-field pl-10 pr-10"
                        placeholder="Confirm your password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                      >
                        {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                    {errors.confirmPassword && (
                      <p className="text-red-600 text-sm mt-1">{errors.confirmPassword.message}</p>
                    )}
                  </div>
                </div>

                {/* School Information */}
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

                {/* Grade Field (only for students) */}
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

                {/* Terms and Conditions */}
                <div className="flex items-start space-x-3">
                  <input
                    {...register('agreedToTerms')}
                    type="checkbox"
                    className="w-5 h-5 text-primary-600 rounded focus:ring-primary-500 mt-0.5"
                  />
                  <div className="text-sm">
                    <p className="text-neutral-700">
                      I agree to the{' '}
                      <a href="#" className="text-primary-600 hover:underline">Terms of Service</a>
                      {' '}and{' '}
                      <a href="#" className="text-primary-600 hover:underline">Privacy Policy</a>
                    </p>
                    {errors.agreedToTerms && (
                      <p className="text-red-600 mt-1">{errors.agreedToTerms.message}</p>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full inline-flex items-center justify-center space-x-2"
                >
                  <UserPlus className="w-5 h-5" />
                  <span>
                    {isSubmitting ? 'Creating Account...' : 'Create Account'}
                  </span>
                </button>
              </form>

              {/* Footer */}
              <div className="mt-8 text-center text-sm text-neutral-600">
                <p>
                  Already have an account?{' '}
                  <Link to="/login" className="text-primary-600 hover:text-primary-700 font-medium">
                    Sign in here
                  </Link>
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default SignUp;