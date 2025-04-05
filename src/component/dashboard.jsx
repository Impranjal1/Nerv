import React, { useState, useEffect, useRef } from 'react';
import { 
  BookOpen, Settings, LogOut, Send, User, Calendar, Award, BarChart2, 
  Clock, ChevronRight, MessageSquare, BookMarked, Rocket, Brain, Zap,
  CheckCircle, Gift, Lightbulb, Star, Bookmark
} from 'lucide-react';

const Dashboard = () => {
  // State for chat messages
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! I'm your EduAI assistant. How can I help with your studies today?", sender: 'ai' }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  // State for active section
  const [activeSection, setActiveSection] = useState('dashboard');
  
  // Ref for chat container scrolling
  const chatContainerRef = useRef(null);
  
  // User profile state
  const [userProfile, setUserProfile] = useState({
    name: 'Alex Johnson',
    level: 17,
    xp: 1750,
    xpToNextLevel: 2000,
    streakDays: 14,
    completedCourses: 5,
    totalHours: 48,
    subjects: ['Mathematics', 'Physics', 'Computer Science'],
    achievements: [
      { id: 1, name: 'First Day', icon: <Star size={18} />, unlocked: true },
      { id: 2, name: '7-Day Streak', icon: <Zap size={18} />, unlocked: true },
      { id: 3, name: 'Quiz Master', icon: <Award size={18} />, unlocked: true },
      { id: 4, name: 'Problem Solver', icon: <Lightbulb size={18} />, unlocked: false },
      { id: 5, name: 'Subject Expert', icon: <BookMarked size={18} />, unlocked: false }
    ],
    upcomingTasks: [
      { id: 1, title: 'Calculus Quiz', due: 'Today', subject: 'Mathematics', priority: 'high' },
      { id: 2, title: 'Physics Lab Report', due: 'Tomorrow', subject: 'Physics', priority: 'medium' },
      { id: 3, title: 'Programming Assignment', due: 'Apr 9', subject: 'Computer Science', priority: 'medium' }
    ],
    recommendedTopics: [
      { id: 1, title: 'Integration Techniques', subject: 'Mathematics', completion: 32 },
      { id: 2, title: 'Quantum Mechanics Intro', subject: 'Physics', completion: 0 },
      { id: 3, title: 'Data Structures & Algorithms', subject: 'Computer Science', completion: 78 }
    ],
    studySchedule: [
      { id: 1, day: 'Monday', subjects: ['Mathematics', 'Physics'] },
      { id: 2, day: 'Tuesday', subjects: ['Computer Science'] },
      { id: 3, day: 'Wednesday', subjects: ['Mathematics', 'Computer Science'] },
      { id: 4, day: 'Thursday', subjects: ['Physics'] },
      { id: 5, day: 'Friday', subjects: ['Mathematics', 'Physics', 'Computer Science'] }
    ]
  });
  
  // Mock function to simulate AI response
  const simulateAIResponse = (userMessage) => {
    const aiResponses = [
      "That's a great question about " + userMessage.split(' ').slice(0, 3).join(' ') + "! Let me help explain that concept.",
      "I understand you're asking about " + userMessage.split(' ').slice(-3).join(' ') + ". Here's what you need to know.",
      "Based on your question, I think you're trying to understand this topic better. Let me break it down step by step.",
      "I can definitely help with that! Let's explore this concept together.",
      "That's an interesting question. The key to understanding this is to focus on the fundamental principles."
    ];
    
    const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)];
    
    setIsTyping(true);
    
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: prev.length + 2,
        text: randomResponse,
        sender: 'ai'
      }]);
      setIsTyping(false);
    }, 1500);
  };
  
  // Handle message submission
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (inputMessage.trim() === '') return;
    
    // Add user message to chat
    setMessages(prev => [...prev, {
      id: prev.length + 1,
      text: inputMessage,
      sender: 'user'
    }]);
    
    // Clear input field
    setInputMessage('');
    
    // Simulate AI response
    simulateAIResponse(inputMessage);
    
    // Add XP for asking a question (unique feature)
    addXP(15);
  };
  
  // Function to add XP
  const addXP = (amount) => {
    setUserProfile(prev => {
      const newXP = prev.xp + amount;
      
      // Check if user leveled up
      if (newXP >= prev.xpToNextLevel) {
        return {
          ...prev,
          level: prev.level + 1,
          xp: newXP - prev.xpToNextLevel,
          xpToNextLevel: Math.round(prev.xpToNextLevel * 1.2) // Increase XP required for next level
        };
      }
      
      return {
        ...prev,
        xp: newXP
      };
    });
  };
  
  // Scroll to bottom of chat whenever messages change
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);
  
  // Function to generate AI study suggestions (unique feature)
  const generateStudySuggestion = () => {
    const suggestions = [
      "Based on your recent activity, I recommend focusing on Integration Techniques in Mathematics.",
      "You've been making great progress in Computer Science. How about diving deeper into Data Structures today?",
      "I notice you haven't studied Physics in 3 days. Maybe revisit Quantum Mechanics concepts?",
      "Your quiz is coming up today! Let's review some Calculus problems together.",
      "You're on a 14-day streak! Perfect time to tackle a challenging concept like Complex Analysis."
    ];
    
    return suggestions[Math.floor(Math.random() * suggestions.length)];
  };
  
  // Calculate XP progress percentage
  const xpProgressPercentage = (userProfile.xp / userProfile.xpToNextLevel) * 100;
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-blue-950 to-slate-900 text-white flex">
      {/* Sidebar */}
      <div className="w-20 lg:w-64 bg-slate-900 border-r border-white/10 flex flex-col">
        {/* Logo */}
        <div className="p-4 flex items-center justify-center lg:justify-start">
          <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
            <span className="text-white font-bold text-xl">E</span>
          </div>
          <span className="ml-3 text-white font-bold text-xl hidden lg:block">EduAI</span>
        </div>
        
        {/* User info */}
        <div className="p-4 border-b border-white/10 flex items-center justify-center lg:justify-start">
          <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center">
            <User size={20} />
          </div>
          <div className="ml-3 hidden lg:block">
            <p className="text-white font-medium">{userProfile.name}</p>
            <p className="text-xs text-white/60">Level {userProfile.level}</p>
          </div>
        </div>
        
        {/* Navigation */}
        <nav className="flex-grow py-6">
          <ul className="space-y-2">
            <li>
              <button 
                onClick={() => setActiveSection('dashboard')}
                className={`w-full flex items-center justify-center lg:justify-start px-4 py-3 ${activeSection === 'dashboard' ? 'bg-blue-900/40 border-r-4 border-blue-500' : 'hover:bg-white/5'}`}
              >
                <BarChart2 size={20} className="flex-shrink-0" />
                <span className="ml-3 hidden lg:block">Dashboard</span>
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActiveSection('subjects')}
                className={`w-full flex items-center justify-center lg:justify-start px-4 py-3 ${activeSection === 'subjects' ? 'bg-blue-900/40 border-r-4 border-blue-500' : 'hover:bg-white/5'}`}
              >
                <BookOpen size={20} className="flex-shrink-0" />
                <span className="ml-3 hidden lg:block">Subjects</span>
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActiveSection('progress')}
                className={`w-full flex items-center justify-center lg:justify-start px-4 py-3 ${activeSection === 'progress' ? 'bg-blue-900/40 border-r-4 border-blue-500' : 'hover:bg-white/5'}`}
              >
                <Rocket size={20} className="flex-shrink-0" />
                <span className="ml-3 hidden lg:block">Progress</span>
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActiveSection('chat')}
                className={`w-full flex items-center justify-center lg:justify-start px-4 py-3 ${activeSection === 'chat' ? 'bg-blue-900/40 border-r-4 border-blue-500' : 'hover:bg-white/5'}`}
              >
                <MessageSquare size={20} className="flex-shrink-0" />
                <span className="ml-3 hidden lg:block">AI Tutor</span>
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActiveSection('schedule')}
                className={`w-full flex items-center justify-center lg:justify-start px-4 py-3 ${activeSection === 'schedule' ? 'bg-blue-900/40 border-r-4 border-blue-500' : 'hover:bg-white/5'}`}
              >
                <Calendar size={20} className="flex-shrink-0" />
                <span className="ml-3 hidden lg:block">Schedule</span>
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActiveSection('achievements')}
                className={`w-full flex items-center justify-center lg:justify-start px-4 py-3 ${activeSection === 'achievements' ? 'bg-blue-900/40 border-r-4 border-blue-500' : 'hover:bg-white/5'}`}
              >
                <Award size={20} className="flex-shrink-0" />
                <span className="ml-3 hidden lg:block">Achievements</span>
              </button>
            </li>
          </ul>
        </nav>
        
        {/* Bottom links */}
        <div className="p-4 border-t border-white/10">
          <ul className="space-y-2">
            <li>
              <button className="w-full flex items-center justify-center lg:justify-start px-4 py-2 hover:bg-white/5 rounded-lg">
                <Settings size={20} className="flex-shrink-0" />
                <span className="ml-3 hidden lg:block">Settings</span>
              </button>
            </li>
            <li>
              <button className="w-full flex items-center justify-center lg:justify-start px-4 py-2 hover:bg-white/5 rounded-lg">
                <LogOut size={20} className="flex-shrink-0" />
                <span className="ml-3 hidden lg:block">Log Out</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
      
      {/* Main content */}
      <div className="flex-grow overflow-hidden flex flex-col">
        {/* Header */}
        <header className="bg-slate-800/50 border-b border-white/10 p-4 flex justify-between items-center">
          <div>
            <h1 className="text-xl font-semibold">
              {activeSection === 'dashboard' && 'Dashboard'}
              {activeSection === 'subjects' && 'My Subjects'}
              {activeSection === 'progress' && 'Learning Progress'}
              {activeSection === 'chat' && 'AI Tutor Chat'}
              {activeSection === 'schedule' && 'Study Schedule'}
              {activeSection === 'achievements' && 'Achievements'}
            </h1>
            <p className="text-sm text-white/60">
              {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
            </p>
          </div>
          
          {/* XP progress */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center">
              <div className="flex items-center mr-3">
                <Zap size={18} className="text-yellow-400 mr-1" />
                <span className="text-white/80">{userProfile.streakDays} day streak</span>
              </div>
              <div className="w-48 bg-slate-700/50 rounded-full h-4 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-blue-500 to-indigo-600" 
                  style={{ width: `${xpProgressPercentage}%` }}
                ></div>
              </div>
              <div className="ml-3 text-sm text-white/80">
                <span className="font-medium">{userProfile.xp}/{userProfile.xpToNextLevel} XP</span>
              </div>
            </div>
            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-500 text-white font-bold">
              {userProfile.level}
            </div>
          </div>
        </header>
        
        {/* Dashboard content */}
        <div className="flex-grow overflow-y-auto p-6">
          {activeSection === 'dashboard' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Welcome card with AI suggestion */}
              <div className="lg:col-span-3 bg-gradient-to-r from-blue-900/30 to-indigo-900/30 rounded-xl p-6 border border-blue-500/30">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-2xl font-bold">Welcome back, {userProfile.name}!</h2>
                    <p className="mt-2 text-white/70">Here's your personalized AI study suggestion:</p>
                    <p className="mt-3 text-lg font-medium">{generateStudySuggestion()}</p>
                    <button className="mt-4 px-5 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center">
                      Start Studying
                      <ChevronRight size={20} className="ml-1" />
                    </button>
                  </div>
                  <div className="hidden lg:block">
                    <div className="h-20 w-20 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                      <Brain size={42} className="text-white" />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Quick stats */}
              <div className="bg-slate-800/50 rounded-xl p-6 border border-white/10">
                <h3 className="text-lg font-medium mb-4 flex items-center">
                  <Clock size={18} className="mr-2 text-blue-400" />
                  Study Stats
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-700/50 rounded-lg p-4">
                    <p className="text-sm text-white/60">Courses Completed</p>
                    <p className="text-2xl font-bold">{userProfile.completedCourses}</p>
                  </div>
                  <div className="bg-slate-700/50 rounded-lg p-4">
                    <p className="text-sm text-white/60">Total Hours</p>
                    <p className="text-2xl font-bold">{userProfile.totalHours}</p>
                  </div>
                  <div className="bg-slate-700/50 rounded-lg p-4 col-span-2">
                    <p className="text-sm text-white/60">Daily Goal</p>
                    <div className="mt-2 w-full bg-slate-600/50 rounded-full h-3">
                      <div className="bg-green-500 h-3 rounded-full" style={{ width: '75%' }}></div>
                    </div>
                    <p className="mt-1 text-xs text-white/60">1.5/2 hours today</p>
                  </div>
                </div>
              </div>
              
              {/* Upcoming tasks */}
              <div className="bg-slate-800/50 rounded-xl p-6 border border-white/10">
                <h3 className="text-lg font-medium mb-4 flex items-center">
                  <Calendar size={18} className="mr-2 text-blue-400" />
                  Upcoming Tasks
                </h3>
                <ul className="space-y-4">
                  {userProfile.upcomingTasks.map(task => (
                    <li key={task.id} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className={`w-2 h-2 rounded-full mr-3 ${
                          task.priority === 'high' ? 'bg-red-500' : 
                          task.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                        }`}></div>
                        <div>
                          <p className="font-medium">{task.title}</p>
                          <p className="text-xs text-white/60">{task.subject}</p>
                        </div>
                      </div>
                      <span className="text-sm text-white/60">{task.due}</span>
                    </li>
                  ))}
                </ul>
                <button className="mt-4 text-sm text-blue-400 flex items-center">
                  View all tasks
                  <ChevronRight size={16} className="ml-1" />
                </button>
              </div>
              
              {/* Recommended topics */}
              <div className="bg-slate-800/50 rounded-xl p-6 border border-white/10">
                <h3 className="text-lg font-medium mb-4 flex items-center">
                  <Lightbulb size={18} className="mr-2 text-blue-400" />
                  Recommended for You
                </h3>
                <ul className="space-y-4">
                  {userProfile.recommendedTopics.map(topic => (
                    <li key={topic.id} className="bg-slate-700/30 rounded-lg p-3">
                      <div className="flex justify-between items-center mb-2">
                        <p className="font-medium">{topic.title}</p>
                        <span className="text-xs bg-blue-900/50 rounded-full px-2 py-1">
                          {topic.subject}
                        </span>
                      </div>
                      <div className="w-full bg-slate-600/50 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full" 
                          style={{ width: `${topic.completion}%` }}
                        ></div>
                      </div>
                      <p className="mt-1 text-xs text-white/60">{topic.completion}% complete</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
          
          {activeSection === 'chat' && (
            <div className="h-full flex flex-col">
              {/* Chat container */}
              <div 
                ref={chatContainerRef}
                className="flex-grow bg-slate-800/30 rounded-xl p-6 overflow-y-auto mb-4 border border-white/10"
              >
                {messages.map(message => (
                  <div 
                    key={message.id} 
                    className={`mb-6 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div 
                      className={`max-w-3/4 rounded-2xl p-4 ${
                        message.sender === 'user' 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-slate-700/50 border border-white/10'
                      }`}
                    >
                      {message.text}
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start mb-6">
                    <div className="bg-slate-700/50 rounded-2xl p-4 border border-white/10">
                      <div className="flex space-x-2">
                        <div className="w-2 h-2 rounded-full bg-blue-400 animate-bounce"></div>
                        <div className="w-2 h-2 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-2 h-2 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Input form */}
              <form onSubmit={handleSendMessage} className="flex items-center space-x-4">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  className="flex-grow bg-slate-800/50 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Ask me anything about your subjects..."
                />
                <button 
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 rounded-lg p-3"
                  disabled={!inputMessage.trim()}
                >
                  <Send size={20} />
                </button>
              </form>
              
              {/* Quick prompts */}
              <div className="mt-4 flex flex-wrap gap-2">
                <button 
                  onClick={() => setInputMessage("Can you explain derivatives in calculus?")}
                  className="bg-slate-700/30 hover:bg-slate-700/50 rounded-lg px-3 py-1 text-sm border border-white/10"
                >
                  Explain derivatives
                </button>
                <button 
                  onClick={() => setInputMessage("Help me solve this physics problem")}
                  className="bg-slate-700/30 hover:bg-slate-700/50 rounded-lg px-3 py-1 text-sm border border-white/10"
                >
                  Physics problem help
                </button>
                <button 
                  onClick={() => setInputMessage("Create a study plan for my upcoming quiz")}
                  className="bg-slate-700/30 hover:bg-slate-700/50 rounded-lg px-3 py-1 text-sm border border-white/10"
                >
                  Create study plan
                </button>
              </div>
            </div>
          )}
          
          {activeSection === 'progress' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* XP & Level progress */}
              <div className="bg-slate-800/50 rounded-xl p-6 border border-white/10">
                <h3 className="text-lg font-medium mb-4">XP & Level Progress</h3>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="h-16 w-16 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-2xl font-bold">
                    {userProfile.level}
                  </div>
                  <div className="flex-grow">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-white/60">Level {userProfile.level}</span>
                      <span className="text-sm text-white/60">Level {userProfile.level + 1}</span>
                    </div>
                    <div className="w-full bg-slate-700/50 rounded-full h-4 overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-blue-500 to-indigo-600" 
                        style={{ width: `${xpProgressPercentage}%` }}
                      ></div>
                    </div>
                    <p className="mt-1 text-center text-white/80">
                      {userProfile.xp} / {userProfile.xpToNextLevel} XP
                    </p>
                  </div>
                </div>
                
                {/* Daily XP Tracker (unique feature) */}
                <div className="mt-8">
                  <h4 className="text-md font-medium mb-3">Daily XP</h4>
                  <div className="grid grid-cols-7 gap-2">
                    {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
                      <div key={day + i} className="text-center">
                        <div className="text-xs text-white/60 mb-1">{day}</div>
                        <div className={`h-16 rounded-lg ${i < 5 ? 'bg-blue-500/30' : 'bg-slate-700/30'} relative`}>
                          <div 
                            className="absolute bottom-0 left-0 right-0 bg-blue-500 rounded-b-lg"
                            style={{ 
                              height: `${i < 5 ? (70 - i * 10) : 0}%`,
                              opacity: i < 5 ? 1 : 0.3
                            }}
                          ></div>
                          <div className="absolute inset-0 flex items-center justify-center text-xs font-medium">
                            {i < 5 ? ((70 - i * 10) * 10) : 0}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Skill tree - unique feature */}
              <div className="bg-slate-800/50 rounded-xl p-6 border border-white/10">
                <h3 className="text-lg font-medium mb-4">Skill Tree</h3>
                <div className="relative h-64">
                  {/* This would be a more complex component in a real app */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative">
                      {/* Base node */}
                      <div className="absolute top-40 left-32 h-12 w-12 rounded-full bg-blue-600 border-4 border-blue-300 z-10 flex items-center justify-center">
                        <BookOpen size={20} />
                      </div>
                      
                      {/* Connected nodes */}
                      <div className="absolute top-10 left-32 h-10 w-10 rounded-full bg-blue-600/80 border-2 border-blue-300/80 flex items-center justify-center">
                        <Brain size={16} />
                      </div>
                      <div className="absolute top-25 left-70 h-10 w-10 rounded-full bg-blue-600/80 border-2 border-blue-300/80 flex items-center justify-center">
                        <Rocket size={16} />
                      </div>
                      <div className="absolute top-60 left-70 h-10 w-10 rounded-full bg-slate-600/80 border-2 border-white/20 flex items-center justify-center">
                        <Lightbulb size={16} />
                      </div>
                      
                      {/* Lines connecting nodes */}
                      <svg className="absolute inset-0 w-full h-full" style={{zIndex: 0}}>
                        <line x1="140" y1="170" x2="140" y2="100" stroke="#3b82f6" strokeWidth="2" />
                        <line x1="140" y1="170" x2="180" y2="120" stroke="#3b82f6" strokeWidth="2" />
                        <line x1="140" y1="170" x2="180" y2="210" stroke="#6b7280" strokeWidth="2" strokeDasharray="4" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="mt-4 text-center">
                  <p className="text-white/60">Unlock new skills by earning XP and completing challenges</p>
                  <button className="mt-3 px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700">
                    View Full Skill Tree
                  </button>
                </div>
              </div>
              
              {/* Recent achievements */}
              <div className="lg:col-span-2 bg-slate-800/50 rounded-xl p-6 border border-white/10">
                <h3 className="text-lg font-medium mb-4 flex items-center">
                  <Award size={18} className="mr-2 text-blue-400" />
                  Recent Achievements
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {userProfile.achievements.map(achievement => (
                    <div 
                      key={achievement.id} 
                      className={`p-4 rounded-lg text-center border ${
                        achievement.unlocked 
                          ? 'bg-blue-900/30 border-blue-500/50' 
                          : 'bg-slate-700/30 border-white/5 opacity-50'
                      }`}
                    >
                      <div className="mb-2 flex justify-center">
                        {achievement.unlocked ? (
                          <div className="h-12 w-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                            {achievement.icon}
                          </div>
                        ) : (
                          <div className="h-12 w-12 rounded-full bg-slate-600/20 flex items-center justify-center">
                            <Lock size={18} />
                          </div>
                        )}
                      </div>
                      <p className="font-medium text-sm">{achievement.name}</p>
                      <p className="text-xs text-white/60">
                        {achievement.unlocked ? 'Unlocked' : 'Locked'}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          {activeSection === 'subjects' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userProfile.subjects.map((subject, index) => (
                <div key={index} className="bg-slate-800/50 rounded-xl overflow-hidden border border-white/10">
                  <div className="h-32 bg-gradient-to-r from-blue-600 to-indigo-700 p-6 flex items-center">
                    <div className="w-full">
                      <h3 className="text-xl font-bold">{subject}</h3>
                      <div className="mt-2 flex justify-between items-center">
                        <div className="bg-white/20 rounded-full px-3 py-1 text-sm">
                          <span className="font-medium">
                            {index === 0 ? '87%' : index === 1 ? '64%' : '79%'} Progress
                          </span>
                        </div>
                        <div className="text-white/80 text-sm">
                          <span className="font-medium">
                            {index === 0 ? '14' : index === 1 ? '9' : '12'} topics
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h4 className="text-md font-medium mb-3">Recent Topics</h4>
                    <ul className="space-y-3">
                      {[1, 2, 3].map(i => (
                        <li key={i} className="flex items-center">
                          <div className="mr-3 h-8 w-8 rounded-full bg-slate-700 flex items-center justify-center">
                            <BookMarked size={16} />
                          </div>
                          <div>
                            <p className="font-medium">
                              {subject === 'Mathematics' && 
                                (i === 1 ? 'Calculus' : i === 2 ? 'Linear Algebra' : 'Statistics')}
                              {subject === 'Physics' && 
                                (i === 1 ? 'Mechanics' : i === 2 ? 'Thermodynamics' : 'Quantum Physics')}
                              {subject === 'Computer Science' && 
                                (i === 1 ? 'Algorithms' : i === 2 ? 'Data Structures' : 'Machine Learning')}
                            </p>
                            <div className="w-full bg-slate-700/50 rounded-full h-1 mt-1">
                              <div 
                                className="bg-blue-500 h-1 rounded-full" 
                                style={{ width: `${(Math.random() * 50) + 50}%` }}
                              ></div>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                    <button className="mt-4 w-full py-2 bg-blue-600 hover:bg-blue-700 rounded-lg flex items-center justify-center">
                      <Bookmark size={16} className="mr-2" />
                      Continue Learning
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {activeSection === 'schedule' && (
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
              {/* Calendar overview */}
              <div className="lg:col-span-3 bg-slate-800/50 rounded-xl p-6 border border-white/10">
                <h3 className="text-lg font-medium mb-4">Weekly Schedule</h3>
                <div className="grid grid-cols-7 gap-2">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
                    <div key={day} className="text-center">
                      <div className="mb-2 text-sm font-medium">{day}</div>
                      <div className={`py-1 px-2 rounded-lg ${
                        index === new Date().getDay() - 1 ? 'bg-blue-600' : 
                        index < 5 ? 'bg-slate-700/70' : 'bg-slate-700/20'
                      }`}>
                        <div className="text-xs">{index + 1}</div>
                      </div>
                      
                      {/* Study blocks */}
                      <div className="mt-2 space-y-1">
                        {userProfile.studySchedule.find(s => s.day === day)?.subjects.map((subject, i) => (
                          <div 
                            key={i} 
                            className={`text-xs py-1 px-2 rounded-lg ${
                              subject === 'Mathematics' ? 'bg-blue-700/50' : 
                              subject === 'Physics' ? 'bg-purple-700/50' : 'bg-green-700/50'
                            }`}
                          >
                            {subject.substring(0, 3)}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Daily detail */}
                <div className="mt-8">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="font-medium">Today's Schedule</h4>
                    <button className="text-sm text-blue-400">View all</button>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center bg-slate-700/50 rounded-lg p-3">
                      <div className="h-10 w-10 rounded-full bg-blue-600/30 flex items-center justify-center mr-4">
                        <Clock size={18} />
                      </div>
                      <div className="flex-grow">
                        <p className="font-medium">Calculus Study Session</p>
                        <p className="text-xs text-white/60">2:00 PM - 3:30 PM</p>
                      </div>
                      <div className="bg-blue-700/30 px-2 py-1 rounded text-xs">
                        Mathematics
                      </div>
                    </div>
                    <div className="flex items-center bg-slate-700/50 rounded-lg p-3">
                      <div className="h-10 w-10 rounded-full bg-purple-600/30 flex items-center justify-center mr-4">
                        <Clock size={18} />
                      </div>
                      <div className="flex-grow">
                        <p className="font-medium">Physics Lab Preparation</p>
                        <p className="text-xs text-white/60">4:00 PM - 5:00 PM</p>
                      </div>
                      <div className="bg-purple-700/30 px-2 py-1 rounded text-xs">
                        Physics
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Study time tracker */}
              <div className="lg:col-span-2 bg-slate-800/50 rounded-xl p-6 border border-white/10">
                <h3 className="text-lg font-medium mb-4">Study Time Distribution</h3>
                <div className="h-56 flex items-center justify-center">
                  {/* This would be a chart in a real app */}
                  <div className="relative h-40 w-40">
                    <div className="absolute inset-0 rounded-full border-8 border-blue-500 opacity-20"></div>
                    <div className="absolute inset-0 rounded-full border-8 border-transparent border-t-blue-500 border-r-blue-500" style={{transform: 'rotate(45deg)'}}></div>
                    <div className="absolute inset-0 rounded-full border-8 border-transparent border-t-purple-500" style={{transform: 'rotate(190deg)'}}></div>
                    <div className="absolute inset-0 rounded-full border-8 border-transparent border-t-green-500 border-r-green-500" style={{transform: 'rotate(280deg)'}}></div>
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="h-3 w-3 rounded-full bg-blue-500 mr-2"></div>
                      <span className="text-sm">Mathematics</span>
                    </div>
                    <span className="text-sm font-medium">45%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="h-3 w-3 rounded-full bg-purple-500 mr-2"></div>
                      <span className="text-sm">Physics</span>
                    </div>
                    <span className="text-sm font-medium">30%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="h-3 w-3 rounded-full bg-green-500 mr-2"></div>
                      <span className="text-sm">Computer Science</span>
                    </div>
                    <span className="text-sm font-medium">25%</span>
                  </div>
                </div>
                <div className="mt-6">
                  <h4 className="text-sm font-medium mb-2">Weekly Target</h4>
                  <div className="w-full bg-slate-700/50 rounded-full h-3">
                    <div className="bg-blue-500 h-3 rounded-full" style={{ width: '65%' }}></div>
                  </div>
                  <div className="flex justify-between mt-1 text-xs text-white/60">
                    <span>6.5 hours</span>
                    <span>10 hours</span>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeSection === 'achievements' && (
            <div className="grid grid-cols-1 gap-6">
              {/* Achievement progress */}
              <div className="bg-slate-800/50 rounded-xl p-6 border border-white/10">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-medium">Achievement Progress</h3>
                  <div className="bg-blue-900/40 rounded-lg px-3 py-1 text-sm">
                    <span className="font-medium">3/10 Unlocked</span>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {userProfile.achievements.map(achievement => (
                    <div 
                      key={achievement.id} 
                      className={`p-6 rounded-xl text-center border ${
                        achievement.unlocked 
                          ? 'bg-blue-900/30 border-lue-500/50' 
                          : 'bg-slate-700/30 border-white/5'
                      }`}
                    >
                      <div className="mb-4 flex justify-center">
                        <div className={`h-16 w-16 rounded-full ${
                          achievement.unlocked 
                            ? 'bg-blue-500/20' 
                            : 'bg-slate-600/20'
                        } flex items-center justify-center`}>
                          {achievement.unlocked ? achievement.icon : <Lock size={24} />}
                        </div>
                      </div>
                      <h4 className="text-lg font-medium">{achievement.name}</h4>
                      <p className="mt-2 text-sm text-white/60">
                        {achievement.unlocked 
                          ? 'Achievement unlocked!' 
                          : 'Complete challenges to unlock'}
                      </p>
                      {achievement.unlocked && (
                        <div className="mt-3 flex items-center justify-center">
                          <CheckCircle size={16} className="text-green-500 mr-2" />
                          <span className="text-sm text-green-500">Earned 50 XP</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Badges collection */}
              <div className="bg-slate-800/50 rounded-xl p-6 border border-white/10">
                <h3 className="text-lg font-medium mb-4">Badges Collection</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {[1, 2, 3, 4, 5, 6].map((badge) => (
                    <div key={badge} className="flex flex-col items-center">
                      <div className={`h-16 w-16 rounded-full ${
                        badge <= 2 ? 'bg-gradient-to-br from-amber-500 to-yellow-600' : 'bg-slate-700/50'
                      } flex items-center justify-center`}>
                        {badge === 1 && <Star size={24} className="text-white" />}
                        {badge === 2 && <Zap size={24} className="text-white" />}
                        {badge > 2 && <Gift size={24} className="text-white/30" />}
                      </div>
                      <p className="mt-2 text-sm font-medium">
                        {badge === 1 && 'Top Student'}
                        {badge === 2 && 'Quick Learner'}
                        {badge > 2 && 'Locked Badge'}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;