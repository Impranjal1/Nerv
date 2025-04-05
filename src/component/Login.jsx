import React, { useState } from 'react';
import { ArrowRight, Mail, Lock, User, Github, GitBranch } from 'lucide-react';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  
  const toggleForm = () => {
    setIsLogin(!isLogin);
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-900 via-blue-950 to-slate-900">
      {/* Neural network particles background would be here */}
      
      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/10 via-transparent to-purple-600/10"></div>
      
      {/* Header */}
      <header className="relative z-10 container mx-auto px-6 py-6">
        <div className="flex items-center">
          <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
            <span className="text-white font-bold text-xl">E</span>
          </div>
          <span className="ml-3 text-white font-bold text-xl">EduAI</span>
        </div>
      </header>
      
      {/* Main content */}
      <main className="flex-grow flex items-center justify-center relative z-10 px-6 py-12">
        <div className="w-full max-w-md">
          {/* Decorative elements */}
          <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-blue-500/10 filter blur-3xl"></div>
          <div className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full bg-indigo-500/10 filter blur-3xl"></div>
          
          {/* Card */}
          <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-lg p-1 rounded-2xl shadow-2xl shadow-blue-500/10">
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-8">
            
              {/* Header */}
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-white">
                  {isLogin ? 'Welcome back' : 'Create account'}
                </h2>
                <p className="mt-2 text-white/60">
                  {isLogin ? 'Log in to access your personalized learning' : 'Join thousands of students learning with AI'}
                </p>
              </div>
              
              {/* Form */}
              <form className="space-y-5">
                {!isLogin && (
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-white/80 mb-1">Full Name</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-white/40" />
                      </div>
                      <input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="bg-slate-800/50 border border-white/10 text-white rounded-lg block w-full pl-10 pr-3 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                        placeholder="John Doe"
                        required
                      />
                    </div>
                  </div>
                )}
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-1">Email Address</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-white/40" />
                    </div>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-slate-800/50 border border-white/10 text-white rounded-lg block w-full pl-10 pr-3 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-white/80 mb-1">Password</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-white/40" />
                    </div>
                    <input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="bg-slate-800/50 border border-white/10 text-white rounded-lg block w-full pl-10 pr-3 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                      placeholder={isLogin ? "Enter your password" : "Create a strong password"}
                      required
                    />
                  </div>
                </div>
                
                {isLogin && (
                  <div className="flex justify-end">
                    <button type="button" className="text-sm text-blue-400 hover:text-blue-300">
                      Forgot password?
                    </button>
                  </div>
                )}
                
                <button
                  type="submit"
                  className="w-full px-4 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg font-medium shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 flex items-center justify-center transition-all"
                >
                  {isLogin ? 'Log In' : 'Create Account'}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
              </form>
              
              {/* Divider */}
              <div className="flex items-center my-6">
                <div className="flex-grow border-t border-white/10"></div>
                <span className="px-4 text-sm text-white/40">or continue with</span>
                <div className="flex-grow border-t border-white/10"></div>
              </div>
              
              {/* Social login buttons */}
              <div className="grid grid-cols-2 gap-4">
                <button className="flex items-center justify-center py-3 px-4 bg-white/5 border border-white/10 rounded-lg text-white hover:bg-white/10 transition-all">
                  <GitBranch className="h-5 w-5 mr-2" />
                  Google
                </button>
                <button className="flex items-center justify-center py-3 px-4 bg-white/5 border border-white/10 rounded-lg text-white hover:bg-white/10 transition-all">
                  <Github className="h-5 w-5 mr-2" />
                  GitHub
                </button>
              </div>
              
              {/* Toggle between login and signup */}
              <div className="mt-8 text-center">
                <p className="text-white/60">
                  {isLogin ? "Don't have an account?" : "Already have an account?"}
                  <button 
                    type="button" 
                    onClick={toggleForm} 
                    className="ml-2 text-blue-400 hover:text-blue-300"
                  >
                    {isLogin ? 'Sign up' : 'Log in'}
                  </button>
                </p>
              </div>
            </div>
          </div>
          
          {/* Additional info */}
          <p className="text-center text-white/40 text-sm mt-8">
            By signing up, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </main>
    </div>
  );
};

export default Login;