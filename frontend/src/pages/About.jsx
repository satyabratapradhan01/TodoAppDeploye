import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function About() {
  const { user } = useAuth();

  return (
    <div className="about-page">
      {/* ABOUT HERO */}
      <section className="about-hero">
        <div className="container">
          <div className="about-hero-content text-center">
            <span className="section-eyebrow">About TaskFlow</span>
            <h1 className="about-title">
              Empowering Minds Through <span className="text-gradient">Seamless Task Management</span>
            </h1>
            <p className="about-subtitle">
              TaskFlow was created with a clear objective: eliminate clutter, streamline everyday task tracking, and deliver an ultra-responsive MERN-based web experience.
            </p>
          </div>
        </div>
      </section>

      {/* MISSION & VISION */}
      <section className="mission-section">
        <div className="container">
          <div className="mission-grid">
            <div className="mission-card">
              <div className="mission-icon">🎯</div>
              <h2>Our Mission</h2>
              <p>
                To equip professionals and teams with an intuitive tool that makes organizing, prioritizing, and accomplishing tasks fast, enjoyable, and reliable.
              </p>
            </div>

            <div className="mission-card">
              <div className="mission-icon">🚀</div>
              <h2>Our Vision</h2>
              <p>
                To redefine productivity software by combining elegant glassmorphic design, zero-friction user navigation, and robust security standards.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CORE VALUES */}
      <section className="values-section">
        <div className="container">
          <div className="section-header text-center">
            <span className="section-eyebrow">Principles That Drive Us</span>
            <h2 className="section-title">Core Operating Values</h2>
          </div>

          <div className="values-grid">
            <div className="value-card">
              <div className="value-number">01</div>
              <h3>Clarity & Simplicity</h3>
              <p>Zero clutter. Every feature serves a clear purpose, ensuring you spend less time configuring and more time doing.</p>
            </div>

            <div className="value-card">
              <div className="value-number">02</div>
              <h3>Security First</h3>
              <p>Enterprise-grade security using HttpOnly cookies, password hashing with bcrypt, and token authentication.</p>
            </div>

            <div className="value-card">
              <div className="value-number">03</div>
              <h3>Speed & Responsiveness</h3>
              <p>Built with React and Vite for blazing fast page transitions and instant UI feedback on every click.</p>
            </div>

            <div className="value-card">
              <div className="value-number">04</div>
              <h3>User-Centric Aesthetics</h3>
              <p>Designed with tailored color palettes, smooth hover micro-animations, and fluid responsive layouts.</p>
            </div>
          </div>
        </div>
      </section>

      {/* TECH STACK SHOWCASE */}
      <section className="tech-section">
        <div className="container">
          <div className="section-header text-center">
            <span className="section-eyebrow">Under The Hood</span>
            <h2 className="section-title">Built with Modern MERN Technologies</h2>
            <p className="section-subtitle">
              TaskFlow relies on industry-standard open-source technologies for maximum reliability and scalability.
            </p>
          </div>

          <div className="tech-grid">
            <div className="tech-card">
              <div className="tech-badge-icon" style={{ background: 'rgba(99, 102, 241, 0.1)', color: '#6366f1' }}>⚛️</div>
              <h3>React 18</h3>
              <p>Modular component architecture powered by Hooks and React Router v6 for effortless navigation.</p>
            </div>

            <div className="tech-card">
              <div className="tech-badge-icon" style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }}>🍃</div>
              <h3>MongoDB</h3>
              <p>Flexible NoSQL database schema designed for reliable task persistence and flexible user profiles.</p>
            </div>

            <div className="tech-card">
              <div className="tech-badge-icon" style={{ background: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b' }}>⚡</div>
              <h3>Express & Node.js</h3>
              <p>Asynchronous REST API server delivering high-throughput CRUD endpoints with minimal overhead.</p>
            </div>

            <div className="tech-card">
              <div className="tech-badge-icon" style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444' }}>🔑</div>
              <h3>JWT Auth</h3>
              <p>Secure authentication stored in HttpOnly cookies to protect tokens from client-side script inspection.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT CTA */}
      <section className="about-cta-section">
        <div className="container">
          <div className="cta-card">
            <h2>Experience TaskFlow Today</h2>
            <p>Start organizing your tasks with speed, security, and elegance.</p>
            <div className="cta-buttons">
              {user ? (
                <Link to="/dashboard" className="btn btn-primary btn-lg">
                  Go to Dashboard →
                </Link>
              ) : (
                <>
                  <Link to="/register" className="btn btn-primary btn-lg">
                    Create Free Account
                  </Link>
                  <Link to="/login" className="btn btn-outline btn-lg">
                    Login Now
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
