import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Home() {
  const { user } = useAuth();

  return (
    <div className="landing-page">
      {/* HERO SECTION */}
      <section className="hero-section">
        <div className="container hero-container">
          <div className="hero-content">
            <div className="hero-badge">
              <span className="badge-pulse"></span>
              ✨ Next-Gen Productivity Suite
            </div>
            
            <h1 className="hero-title">
              Organize, Track & Elevate Your <span className="text-gradient">Daily Workflow</span>
            </h1>
            
            <p className="hero-subtitle">
              TaskFlow empowers individuals and teams to manage tasks effortlessly with real-time tracking, priority filters, and enterprise-grade security.
            </p>

            <div className="hero-actions">
              {user ? (
                <Link to="/dashboard" className="btn btn-primary btn-lg">
                  Go to Dashboard →
                </Link>
              ) : (
                <>
                  <Link to="/register" className="btn btn-primary btn-lg">
                    Get Started Free →
                  </Link>
                  <Link to="/login" className="btn btn-outline btn-lg">
                    Sign In
                  </Link>
                </>
              )}
            </div>

            <div className="hero-trust">
              <div className="trust-avatars">
                <span className="trust-avatar" style={{ backgroundColor: '#6366f1' }}>JD</span>
                <span className="trust-avatar" style={{ backgroundColor: '#10b981' }}>AS</span>
                <span className="trust-avatar" style={{ backgroundColor: '#f59e0b' }}>MK</span>
                <span className="trust-avatar" style={{ backgroundColor: '#ec4899' }}>SL</span>
              </div>
              <p className="trust-text">Trusted by over <strong>10,000+</strong> productive professionals worldwide.</p>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-card-preview">
              <div className="preview-header">
                <div className="preview-dots">
                  <span className="dot dot-red"></span>
                  <span className="dot dot-yellow"></span>
                  <span className="dot dot-green"></span>
                </div>
                <span className="preview-title">TaskFlow Board</span>
              </div>
              
              <div className="preview-body">
                <div className="preview-task-item completed">
                  <div className="preview-task-check">✓</div>
                  <div className="preview-task-info">
                    <strong>Launch MERN Application</strong>
                    <span className="preview-task-tag status-completed">Completed</span>
                  </div>
                </div>

                <div className="preview-task-item in-progress">
                  <div className="preview-task-check">⌛</div>
                  <div className="preview-task-info">
                    <strong>Design Interactive Landing Page</strong>
                    <span className="preview-task-tag status-in-progress">In Progress</span>
                  </div>
                </div>

                <div className="preview-task-item pending">
                  <div className="preview-task-check">○</div>
                  <div className="preview-task-info">
                    <strong>Optimize Cloud Database Queries</strong>
                    <span className="preview-task-tag status-pending">Pending</span>
                  </div>
                </div>

                <div className="preview-progress">
                  <div className="progress-labels">
                    <span>Overall Completion</span>
                    <strong>67%</strong>
                  </div>
                  <div className="progress-bar-bg">
                    <div className="progress-bar-fill" style={{ width: '67%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="floating-badge badge-top">
              <span className="badge-icon">⚡</span>
              <div>
                <strong>Ultra Fast</strong>
                <span>Sub-10ms latency</span>
              </div>
            </div>

            <div className="floating-badge badge-bottom">
              <span className="badge-icon">🛡️</span>
              <div>
                <strong>Secure JWT</strong>
                <span>HttpOnly Auth</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-container">
            <div className="stat-box">
              <span className="stat-number">10k+</span>
              <span className="stat-desc">Active Productive Users</span>
            </div>
            <div className="stat-box">
              <span className="stat-number">50k+</span>
              <span className="stat-desc">Tasks Completed</span>
            </div>
            <div className="stat-box">
              <span className="stat-number">99.9%</span>
              <span className="stat-desc">Uptime Guarantee</span>
            </div>
            <div className="stat-box">
              <span className="stat-number">100%</span>
              <span className="stat-desc">Free & Open Source</span>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="features-section" id="features">
        <div className="container">
          <div className="section-header text-center">
            <span className="section-eyebrow">Powerful Capabilities</span>
            <h2 className="section-title">Everything You Need to Stay Productive</h2>
            <p className="section-subtitle">
              Engineered with modern web standards, TaskFlow gives you full control over your daily assignments.
            </p>
          </div>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon-wrapper">🔐</div>
              <h3>Secure Authentication</h3>
              <p>Protected by HTTP-Only JWT cookies preventing XSS and keeping your account details completely safe.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon-wrapper">⚡</div>
              <h3>Real-Time CRUD Operations</h3>
              <p>Create, update status, edit details, and delete tasks instantly with immediate state synchronization.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon-wrapper">🎯</div>
              <h3>Smart Status Filtering</h3>
              <p>Seamlessly switch views between Pending, In Progress, and Completed tasks with responsive filters.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon-wrapper">📊</div>
              <h3>Visual Analytics</h3>
              <p>Gain insights into your productivity with live metric breakdown cards and progress indicators.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon-wrapper">📱</div>
              <h3>Responsive Design</h3>
              <p>Experience a tailored interface crafted for smartphones, tablets, laptops, and ultra-wide displays.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon-wrapper">🚀</div>
              <h3>MERN Stack Architecture</h3>
              <p>Leverages MongoDB, Express.js, React, and Node.js for ultra-reliable backend stability and speed.</p>
            </div>
          </div>
        </div>
      </section>

      {/* WORKFLOW / HOW IT WORKS */}
      <section className="workflow-section">
        <div className="container">
          <div className="section-header text-center">
            <span className="section-eyebrow">Seamless Workflow</span>
            <h2 className="section-title">How TaskFlow Works in 3 Simple Steps</h2>
          </div>

          <div className="steps-grid">
            <div className="step-card">
              <div className="step-number">01</div>
              <h3>Create Your Account</h3>
              <p>Register in seconds with your name, email, and password to unlock your personal workspace.</p>
            </div>

            <div className="step-card">
              <div className="step-number">02</div>
              <h3>Add & Categorize Tasks</h3>
              <p>Input task details, set initial statuses, and organize work effortlessly.</p>
            </div>

            <div className="step-card">
              <div className="step-number">03</div>
              <h3>Track & Accomplish</h3>
              <p>Mark items complete, analyze your stats, and boost your daily output with confidence.</p>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="testimonials-section">
        <div className="container">
          <div className="section-header text-center">
            <span className="section-eyebrow">User Satisfaction</span>
            <h2 className="section-title">Loved by Creators & Developers</h2>
          </div>

          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="stars">★★★★★</div>
              <p className="testimonial-quote">
                "TaskFlow transformed how I organize my sprint backlog. The interface is crisp, fast, and remarkably intuitive!"
              </p>
              <div className="testimonial-author">
                <div className="author-avatar" style={{ backgroundColor: '#6366f1' }}>AR</div>
                <div>
                  <strong>Alex Rivera</strong>
                  <span>Senior Full Stack Engineer</span>
                </div>
              </div>
            </div>

            <div className="testimonial-card">
              <div className="stars">★★★★★</div>
              <p className="testimonial-quote">
                "The instant status toggles and filter bar make keeping track of team deliverables completely effortless."
              </p>
              <div className="testimonial-author">
                <div className="author-avatar" style={{ backgroundColor: '#10b981' }}>SP</div>
                <div>
                  <strong>Sarah Patel</strong>
                  <span>Product Manager</span>
                </div>
              </div>
            </div>

            <div className="testimonial-card">
              <div className="stars">★★★★★</div>
              <p className="testimonial-quote">
                "Clean design, solid MERN architecture, and total security with HTTP-only cookies. Exactly what I needed."
              </p>
              <div className="testimonial-author">
                <div className="author-avatar" style={{ backgroundColor: '#f59e0b' }}>DL</div>
                <div>
                  <strong>David Chen</strong>
                  <span>Tech Lead</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-card">
            <h2>Ready to Elevate Your Productivity?</h2>
            <p>Join thousands of users organizing their daily targets with TaskFlow today.</p>
            <div className="cta-buttons">
              {user ? (
                <Link to="/dashboard" className="btn btn-primary btn-lg">
                  Launch Your Dashboard →
                </Link>
              ) : (
                <Link to="/register" className="btn btn-primary btn-lg">
                  Get Started For Free →
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="container footer-content">
          <div className="footer-brand-col">
            <div className="navbar-brand">
              <span className="navbar-icon">✓</span>
              TaskFlow
            </div>
            <p className="footer-desc">
              Modern full-stack task management web application powered by the MERN stack.
            </p>
          </div>

          <div className="footer-links-col">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><a href="#features">Features</a></li>
              {user ? (
                <li><Link to="/dashboard">Dashboard</Link></li>
              ) : (
                <>
                  <li><Link to="/login">Sign In</Link></li>
                  <li><Link to="/register">Register</Link></li>
                </>
              )}
            </ul>
          </div>

          <div className="footer-links-col">
            <h4>Tech Stack</h4>
            <ul>
              <li>React & Vite</li>
              <li>Node.js & Express</li>
              <li>MongoDB Atlas</li>
              <li>JWT Authentication</li>
            </ul>
          </div>
        </div>
        <div className="container footer-bottom">
          <p>© {new Date().getFullYear()} TaskFlow. Built with passion for seamless web applications.</p>
        </div>
      </footer>
    </div>
  );
}

export default Home;
