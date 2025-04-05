import React, { useEffect, useRef } from 'react';
import { ArrowRight, BarChart2, Layers, Shield, Award, CheckCircle } from 'lucide-react';
import { Link } from "react-router-dom";


const Hero = () => {
  const canvasRef = useRef(null);
  
  // Neural network animation
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const particles = [];
    const connections = [];
    const particleCount = 50;
    const connectionDistance = 100;
    const particleSize = 2;
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
      }
      
      update() {
        this.x += this.vx;
        this.y += this.vy;
        
        if (this.x < 0 || this.x > canvas.width) this.vx = -this.vx;
        if (this.y < 0 || this.y > canvas.height) this.vy = -this.vy;
      }
      
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, particleSize, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
        ctx.fill();
      }
    }
    
    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });
      
      // Draw connections
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
      ctx.lineWidth = 0.5;
      
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < connectionDistance) {
            const opacity = 1 - (distance / connectionDistance);
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.2})`;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      
      requestAnimationFrame(animate);
    };
    
    const resizeHandler = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', resizeHandler);
    animate();
    
    return () => {
      window.removeEventListener('resize', resizeHandler);
    };
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-slate-900 via-blue-950 to-slate-900">
      {/* Neural network background */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-70"></canvas>
      
      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/10 via-transparent to-purple-600/10 z-0"></div>
      
      {/* Content container */}
      <div className="relative z-10 container mx-auto px-6 pt-12 pb-24">
        <nav className="flex justify-between items-center py-6">
          <div className="flex items-center">
            <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
              <span className="text-white font-bold text-xl">E</span>
            </div>
            <span className="ml-3 text-white font-bold text-xl">EduAI</span>
          </div>
          
          <div className="hidden md:flex space-x-8">
            <a href="#" className="text-white/80 hover:text-white">About</a>
            <a href="#" className="text-white/80 hover:text-white">Features</a>
            <a href="#" className="text-white/80 hover:text-white">Contacts</a>
            <a href="#" className="text-white/80 hover:text-white">Resources</a>
          </div>
          
          <div className="flex items-center space-x-4">
          <Link to="/login">
  <button className="hidden md:block px-4 py-2 text-white/90 hover:text-white">
    Login
  </button>
</Link>

          <Link to="/Dashboard">
  <button className="px-5 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all">
    Get Started
  </button>
</Link>
          </div>
        </nav>
        
        {/* Hero content */}
        <div className="grid md:grid-cols-2 gap-12 mt-12 md:mt-24 items-center">
          <div>
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6">
              <span className="w-2 h-2 rounded-full bg-blue-400 mr-2"></span>
              <span className="text-blue-300 text-sm">AI-Powered Education Platform</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Master Any <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">Subject</span> With Intelligent Tutoring
            </h1>
            
            <p className="mt-6 text-lg text-white/70 leading-relaxed">
              Our advanced AI platform adapts to your learning style, providing personalized 
              guidance, instant feedback, and comprehensive explanations across all STEM subjects.
            </p>
            
            <div className="mt-10 flex flex-wrap gap-4">
              <button className="px-8 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg text-white font-medium shadow-xl shadow-blue-500/20 hover:shadow-blue-500/40 transition-all flex items-center">
                Start Learning Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
              
              <button className="px-8 py-3 bg-white/5 border border-white/10 rounded-lg text-white font-medium hover:bg-white/10 transition-all">
                View Demo
              </button>
            </div>
            
            <div className="mt-12 grid grid-cols-2 gap-6">
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-blue-400 mr-3" />
                <span className="text-white/80">Personalized Learning</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-blue-400 mr-3" />
                <span className="text-white/80">Interactive Practice</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-blue-400 mr-3" />
                <span className="text-white/80">Progress Tracking</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-blue-400 mr-3" />
                <span className="text-white/80">Expert Content</span>
              </div>
            </div>
            
            {/* <div className="mt-12 flex items-center space-x-6">
              <div className="flex -space-x-2">
                <img src="/api/placeholder/32/32" alt="User" className="w-8 h-8 rounded-full border-2 border-slate-900" />
                <img src="/api/placeholder/32/32" alt="User" className="w-8 h-8 rounded-full border-2 border-slate-900" />
                <img src="/api/placeholder/32/32" alt="User" className="w-8 h-8 rounded-full border-2 border-slate-900" />
                <div className="w-8 h-8 rounded-full bg-blue-500 border-2 border-slate-900 flex items-center justify-center">
                  <span className="text-xs text-white font-medium">+</span>
                </div>
              </div>
              <div>
                <p className="text-white font-medium">Join 50,000+ students</p>
                <div className="flex items-center mt-1">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg key={star} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 24 24">
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-white/60 text-sm ml-2">4.9 (2.5k+ reviews)</p>
                </div>
              </div>
            </div> */}
          </div>
          
          {/* Topic-related image replacing the side interface */}
          <div className="relative">
            {/* Decorative circles */}
            <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-blue-500/10 filter blur-3xl"></div>
            <div className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full bg-indigo-500/10 filter blur-3xl"></div>
            
            {/* AI Education Illustration */}
            <div className="relative">
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-1 rounded-2xl shadow-2xl shadow-blue-500/10">
                <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl overflow-hidden p-6">
                  
                  {/* SVG Illustration of AI Education */}
                  <svg className="w-full h-full" viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
                    {/* Brain with digital connections */}
                    <circle cx="400" cy="300" r="180" fill="url(#brainGradient)" />
                    
                    {/* Neural network connections */}
                    <g opacity="0.6">
                      <path d="M320 200 L400 150 L480 200" stroke="#4f46e5" strokeWidth="2" />
                      <path d="M300 300 L400 250 L500 300" stroke="#4f46e5" strokeWidth="2" />
                      <path d="M320 400 L400 350 L480 400" stroke="#4f46e5" strokeWidth="2" />
                      
                      <path d="M400 150 L400 250 L400 350" stroke="#4f46e5" strokeWidth="2" />
                      
                      <circle cx="400" cy="150" r="10" fill="#3b82f6" />
                      <circle cx="400" cy="250" r="10" fill="#3b82f6" />
                      <circle cx="400" cy="350" r="10" fill="#3b82f6" />
                      
                      <circle cx="320" cy="200" r="8" fill="#3b82f6" />
                      <circle cx="480" cy="200" r="8" fill="#3b82f6" />
                      <circle cx="300" cy="300" r="8" fill="#3b82f6" />
                      <circle cx="500" cy="300" r="8" fill="#3b82f6" />
                      <circle cx="320" cy="400" r="8" fill="#3b82f6" />
                      <circle cx="480" cy="400" r="8" fill="#3b82f6" />
                    </g>
                    
                    {/* Knowledge symbols floating around */}
                    <g opacity="0.8">
                      {/* Math symbols */}
                      <text x="220" y="180" fill="#a5b4fc" fontSize="24">∫</text>
                      <text x="560" y="180" fill="#a5b4fc" fontSize="24">π</text>
                      <text x="600" y="280" fill="#a5b4fc" fontSize="24">∑</text>
                      <text x="190" y="380" fill="#a5b4fc" fontSize="24">√</text>
                      
                      {/* Science symbols */}
                      <text x="240" y="280" fill="#93c5fd" fontSize="20">H₂O</text>
                      <text x="560" y="380" fill="#93c5fd" fontSize="20">E=mc²</text>
                      
                      {/* Code symbols */}
                      <text x="280" y="140" fill="#60a5fa" fontSize="18">{`{code}`}</text>
                      <text x="500" y="140" fill="#60a5fa" fontSize="18">{`<AI>`}</text>
                      <text x="230" y="440" fill="#60a5fa" fontSize="18">{`</>`}</text>
                      <text x="520" y="440" fill="#60a5fa" fontSize="18">{`{}`}</text>
                    </g>
                    
                    {/* Glowing nodes */}
                    <circle cx="400" cy="300" r="40" fill="url(#centerGlow)" />
                    
                    {/* Small particles */}
                    <g opacity="0.6">
                      {[...Array(20)].map((_, i) => (
                        <circle 
                          key={i} 
                          cx={300 + Math.random() * 200} 
                          cy={200 + Math.random() * 200} 
                          r={1 + Math.random() * 3}
                          fill="#a5b4fc"
                        />
                      ))}
                    </g>
                    
                    {/* Book icon */}
                    <g transform="translate(230, 320) scale(0.8)">
                      <rect x="0" y="0" width="80" height="100" rx="5" fill="#1e40af" />
                      <rect x="5" y="5" width="70" height="90" rx="3" fill="#2563eb" />
                      <rect x="15" y="20" width="50" height="5" rx="2" fill="#bfdbfe" />
                      <rect x="15" y="35" width="50" height="5" rx="2" fill="#bfdbfe" />
                      <rect x="15" y="50" width="30" height="5" rx="2" fill="#bfdbfe" />
                    </g>
                    
                    {/* Graduation cap */}
                    <g transform="translate(500, 320) scale(0.8)">
                      <polygon points="0,20 80,20 40,0" fill="#1e40af" />
                      <rect x="30" y="20" width="20" height="30" fill="#2563eb" />
                      <rect x="20" y="50" width="40" height="5" rx="2" fill="#1e40af" />
                    </g>
                    
                    {/* Gradients */}
                    <defs>
                      <radialGradient id="brainGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                        <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
                        <stop offset="80%" stopColor="#1e40af" stopOpacity="0.1" />
                        <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0" />
                      </radialGradient>
                      
                      <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                        <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.8" />
                        <stop offset="80%" stopColor="#3b82f6" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#2563eb" stopOpacity="0" />
                      </radialGradient>
                    </defs>
                  </svg>
                  
                  {/* Caption */}
                  <div className="text-center mt-4">
                    <p className="text-blue-300 font-medium">AI-Powered Learning for the Digital Age</p>
                    <p className="text-white/70 text-sm mt-1">Personalized education through intelligent tutoring systems</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Trust indicators */}
        {/* <div className="mt-24 pt-12 border-t border-white/10">
          <p className="text-center text-white/50 mb-8">Trusted by leading educational institutions</p>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 items-center justify-items-center opacity-70">
            <div className="text-white/80 font-bold text-xl">Stanford</div>
            <div className="text-white/80 font-bold text-xl">MIT</div>
            <div className="text-white/80 font-bold text-xl">Harvard</div>
            <div className="text-white/80 font-bold text-xl">Princeton</div>
            <div className="text-white/80 font-bold text-xl md:col-span-4 lg:col-span-1">Oxford</div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Hero;