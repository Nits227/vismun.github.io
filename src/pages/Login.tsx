import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Mail, Lock, Eye, EyeOff, LogIn, GraduationCap } from 'lucide-react';
import Layout from '../components/Layout/Layout';
import { signIn } from '../lib/auth';
import { useAuth } from '../contexts/AuthContext';

const loginSchema = z.object({
  email: z.string().email('Valid email is required'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormData = z.infer<typeof loginSchema>;

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();
  const { refreshUser } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema)
  });

  const onSubmit = async (data: LoginFormData) => {
    setLoginError('');
    
    try {
      const result = await signIn(data.email, data.password);
      
      if (result.success) {
        refreshUser();
        navigate(result.user?.role === 'admin' ? '/admin' : '/profile');
      } else {
        setLoginError(result.error || 'Login failed');
      }
    } catch (error) {
      setLoginError('An unexpected error occurred');
    }
  };

  return (
    <Layout>
      <section className="py-16 bg-neutral-50 min-h-screen flex items-center">
        <div className="container-max section-padding w-full">
          <div className="max-w-md mx-auto">
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
                  Welcome Back
                </h1>
                <p className="text-neutral-600">
                  Sign in to access your account and manage your event registration
                </p>
              </div>

              {/* Login Form */}
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {loginError && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-600 text-sm">{loginError}</p>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Email Address
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
                    <p className="text-red-600 text-sm mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
                    <input
                      {...register('password')}
                      type={showPassword ? 'text' : 'password'}
                      className="input-field pl-10 pr-10"
                      placeholder="Enter your password"
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
                    <p className="text-red-600 text-sm mt-1">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center">
                    <input type="checkbox" className="w-4 h-4 text-primary-600 rounded" />
                    <span className="ml-2 text-sm text-neutral-600">Remember me</span>
                  </label>
                  <a href="#" className="text-sm text-primary-600 hover:text-primary-700">
                    Forgot password?
                  </a>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full inline-flex items-center justify-center space-x-2"
                >
                  <LogIn className="w-5 h-5" />
                  <span>
                    {isSubmitting ? 'Signing In...' : 'Sign In'}
                  </span>
                </button>
              </form>

              {/* Demo Accounts */}
              <div className="mt-6 p-4 bg-accent-50 border border-accent-200 rounded-lg">
                <h3 className="font-semibold text-primary-900 mb-2">Demo Accounts</h3>
                <div className="text-sm space-y-1">
                  <p><strong>Admin:</strong> admin@school.edu (any password)</p>
                  <p><strong>User:</strong> Any email (any password)</p>
                </div>
              </div>

              {/* Footer */}
              <div className="mt-8 text-center text-sm text-neutral-600">
                <p>
                  Don't have an account?{' '}
                  <Link to="/signup" className="text-primary-600 hover:text-primary-700 font-medium">
                    Sign up here
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

export default Login;