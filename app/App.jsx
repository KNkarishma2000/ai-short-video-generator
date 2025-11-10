"use client";

import { useEffect, useState } from "react";
import "./App.css";
import Header from './header/page'
import Image from "next/image";
function App() {
  const [stars, setStars] = useState([]);

  useEffect(() => {
    const newStars = Array.from({ length: 150 }, () => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 3}s`,
    }));
    setStars(newStars);
  }, []);
  return (
    <div className="app">
      <div className="gradient-orb-1"></div>
      <div className="gradient-orb-2"></div>
      <div className="gradient-orb-3"></div>

      <div className="stars">
        {stars.map((star, i) => (
          <div
            key={i}
            className="star"
            style={{
              top: star.top,
              left: star.left,
              animationDelay: star.delay
            }}
          />
        ))}
      </div>

    <Header />

      <section className="hero">
        <div className="hero-content">
          <div className="badge">🚀 New: AI-Powered Automation</div>
          <h1>Turn Your Ideas Into Stunning Short Videos</h1>
          <p>
            Create engaging, customized short videos in seconds. Simply choose your style, topic, and duration — our AI handles the rest.
          </p>
          <div className="hero-buttons">
            <button className="btn-primary btn-large">
              <span>Start Free Trial</span>
            </button>
            {/* <a href="#demo" className="play-demo">
              <div className="play-icon">▶</div>
              <span>Watch Demo</span>
            </a> */}
          </div>
          <div className="stats-bar">
            <div className="stat-item">
              <div className="number">10M+</div>
              <div className="label">Active Users</div>
            </div>
            <div className="stat-item">
              <div className="number">99.9%</div>
              <div className="label">Uptime</div>
            </div>
            <div className="stat-item">
              <div className="number">4.9/5</div>
              <div className="label">Rating</div>
            </div>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-3d-card">
            <div className="card-content">
              <div className="card-icon">✨</div>
              <h3>AI Innovation</h3>
            </div>
          </div>
        </div>
      </section>

      <section className="features-section" id="features">
        <div className="section-header">
          <div className="section-badge">Why Choose Us</div>
          <h2>Instant Generation</h2>
          <p>Input your idea and get a professional-quality short video in seconds — no editing required.</p>
        </div>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon-wrapper">⚡</div>
            <h3>Multiple Styles</h3>
            <p>Choose from cartoon, realistic, watercolor, and more. Customize every detail to match your creative vision.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon-wrapper">🔒</div>
            <h3>Smart Story Builder</h3>
            <p>Our AI automatically writes, animates, and synchronizes scenes to perfectly match your topic and tone.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon-wrapper">🎨</div>
            <h3>Voice  Integration</h3>
            <p>Add lifelike voiceovers all generated automatically.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon-wrapper">🤖</div>
            <h3>Optimized for Platforms</h3>
            <p>Export ready-to-post videos for YouTube Shorts, Instagram Reels, TikTok, and more.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon-wrapper">📊</div>
            <h3>Download the Video</h3>
            <p>You can download the short video to use on any platform</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon-wrapper">🌐</div>
            <h3>Global Scale</h3>
            <p>Deploy to edge locations worldwide. Low latency and high performance for users everywhere.</p>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <h2>Ready to Get Started?</h2>
        <p>Join thousands of teams already building the future with our platform</p>
        <button className="btn-primary btn-large">
          <span>Start Your Free Trial</span>
        </button>
      </section>

      <footer className="footer">
        <div className="footer-brand">
            <div className='flex gap-3 items-center'>
                  <Image src={'/logo.png'} alt="logo" width={50} height={50} />
                  <h2 className='font-bold text-white text-xl'>Ai Short Video</h2>
                  </div>
          <p>
            Building the future of AI-powered applications. Empowering creators and developers worldwide.
          </p>
          <div className="social-links">
            <a href="#twitter" className="social-icon">𝕏</a>
            <a href="#github" className="social-icon">⚡</a>
            <a href="#linkedin" className="social-icon">in</a>
            <a href="#discord" className="social-icon">💬</a>
          </div>
        </div>
        <div className="footer-column">
          <h4>Product</h4>
          <ul>
            <li><a href="#features">Features</a></li>
            <li><a href="#pricing">Pricing</a></li>
            <li><a href="#updates">Updates</a></li>
            <li><a href="#roadmap">Roadmap</a></li>
          </ul>
        </div>
        <div className="footer-column">
          <h4>Company</h4>
          <ul>
            <li><a href="#about">About Us</a></li>
            <li><a href="#careers">Careers</a></li>
            <li><a href="#blog">Blog</a></li>
            <li><a href="#press">Press Kit</a></li>
          </ul>
        </div>
        <div className="footer-column">
          <h4>Resources</h4>
          <ul>
            <li><a href="#docs">Documentation</a></li>
            <li><a href="#guides">Guides</a></li>
            <li><a href="#support">Support</a></li>
            <li><a href="#api">API Reference</a></li>
          </ul>
        </div>
      </footer>

      <div className="footer-bottom">
        <p>&copy; 2025 NEXAI. All rights reserved. Built with passion.</p>
      </div>
    </div>
  )
}

export default App
