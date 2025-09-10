import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Mail, Lock, Eye, EyeOff, LogIn, UserPlus } from 'lucide-react';
import Layout from '../components/Layout/Layout';
import { useAuth } from '../contexts/AuthContext';

const loginSchema = z.object({
  email: z.string().email('Valid email is required'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const signupSchema = loginSchema.extend({
  confirmPassword: z.string(),
  fullName: z.string().min(2, 'Full name is required'),
  schoolName: z.string().min(2, 'School name is required'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type LoginFormData = z.infer<typeof loginSchema>;
type SignupFormData = z.infer<typeof signupSchema>;

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const { signIn, signUp } = useAuth();

  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema)
  });

  const signupForm = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema)
  });

  const onLoginSubmit = async (data: LoginFormData) => {
    const { error } = await signIn(data.email, data.password);
    if (error) {
      alert('Login failed: ' + error.message);
    } else {
      navigate('/dashboard');
    }
  };

  const onSignupSubmit = async (data: SignupFormData) => {
    const { error } = await signUp(data.email, data.password, {
      full_name: data.fullName,
      school_name: data.schoolName,
    });
    if (error) {
      alert('Signup failed: ' + error.message);
    } else {
      alert('Account created successfully! Please check your email to verify your account.');
      setIsLogin(true);
    }
  };

  return (
    <Layout showAnnouncement={false}>
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
                    <span className="text-white font-bold">MUN</span>
                  </div>
                  <span className="font-bold text-xl text-primary-600">SchoolMUN</span>
                </Link>
                
                <h1 className="text-2xl font-bold text-primary-900 mb-2">
                  {isLogin ? 'Welcome Back' : 'Create Account'}
                </h1>
                <p className="text-neutral-600">
                  {isLogin 
                    ? 'Sign in to access your school dashboard' 
                    : 'Register your school for SchoolMUN 2024'
                  }
                </p>
              </div>

              {/* Toggle Buttons */}
              <div className="flex bg-neutral-100 rounded-lg p-1 mb-8">
                <button
                  onClick={() => setIsLogin(true)}
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
                    isLogin 
                      ? 'bg-white text-primary-600 shadow-sm' 
                      : 'text-neutral-600 hover:text-primary-600'
                  }`}
                >
                  Sign In
                </button>
                <button
                  onClick={() => setIsLogin(false)}
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
                    !isLogin 
                      ? 'bg-white text-primary-600 shadow-sm' 
                      : 'text-neutral-600 hover:text-primary-600'
                  }`}
                >
                  Sign Up
                </button>
              </div>

              {/* Login Form */}
              {isLogin ? (
                <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
                      <input
                        {...loginForm.register('email')}
                        type="email"
                        className="input-field pl-10"
                        placeholder="coordinator@school.edu"
                      />
                    </div>
                    {loginForm.formState.errors.email && (
                      <p className="text-red-600 text-sm mt-1">
                        {loginForm.formState.errors.email.message}
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
                        {...loginForm.register('password')}
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
                    {loginForm.formState.errors.password && (
                      <p className="text-red-600 text-sm mt-1">
                        {loginForm.formState.errors.password.message}
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
                    disabled={loginForm.formState.isSubmitting}
                    className="btn-primary w-full inline-flex items-center justify-center space-x-2"
                  >
                    <LogIn className="w-5 h-5" />
                    <span>
                      {loginForm.formState.isSubmitting ? 'Signing In...' : 'Sign In'}
                    </span>
                  </button>
                </form>
              ) : (
                /* Signup Form */
                <form onSubmit={signupForm.handleSubmit(onSignupSubmit)} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Full Name
                    </label>
                    <input
                      {...signupForm.register('fullName')}
                      className="input-field"
                      placeholder="Your full name"
                    />
                    {signupForm.formState.errors.fullName && (
                      <p className="text-red-600 text-sm mt-1">
                        {signupForm.formState.errors.fullName.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      School Name
                    </label>
                    <input
                      {...signupForm.register('schoolName')}
                      className="input-field"
                      placeholder="Your school name"
                    />
                    {signupForm.formState.errors.schoolName && (
                      <p className="text-red-600 text-sm mt-1">
                        {signupForm.formState.errors.schoolName.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
                      <input
                        {...signupForm.register('email')}
                        type="email"
                        className="input-field pl-10"
                        placeholder="coordinator@school.edu"
                      />
                    </div>
                    {signupForm.formState.errors.email && (
                      <p className="text-red-600 text-sm mt-1">
                        {signupForm.formState.errors.email.message}
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
                        {...signupForm.register('password')}
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
                    {signupForm.formState.errors.password && (
                      <p className="text-red-600 text-sm mt-1">
                        {signupForm.formState.errors.password.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
                      <input
                        {...signupForm.register('confirmPassword')}
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
                    {signupForm.formState.errors.confirmPassword && (
                      <p className="text-red-600 text-sm mt-1">
                        {signupForm.formState.errors.confirmPassword.message}
                      </p>
                    )}
                  </div>

                  <div className="flex items-start space-x-3">
                    <input type="checkbox" className="w-4 h-4 text-primary-600 rounded mt-0.5" required />
                    <span className="text-sm text-neutral-600">
                      I agree to the{' '}
                      <a href="#" className="text-primary-600 hover:underline">Terms of Service</a>
                      {' '}and{' '}
                      <a href="#" className="text-primary-600 hover:underline">Privacy Policy</a>
                    </span>
                  </div>

                  <button
                    type="submit"
                    disabled={signupForm.formState.isSubmitting}
                    className="btn-primary w-full inline-flex items-center justify-center space-x-2"
                  >
                    <UserPlus className="w-5 h-5" />
                    <span>
                      {signupForm.formState.isSubmitting ? 'Creating Account...' : 'Create Account'}
                    </span>
                  </button>
                </form>
              )}

              {/* Footer */}
              <div className="mt-8 text-center text-sm text-neutral-600">
                <p>
                  Need help?{' '}
                  <Link to="/contact" className="text-primary-600 hover:text-primary-700">
                    Contact Support
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