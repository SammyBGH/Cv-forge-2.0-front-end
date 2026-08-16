import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import '../styles/legal-pages.css';

export default function AboutPage() {
  const { user } = useAuth();
  
  useEffect(() => {
    document.title = 'CVForge — About';
  }, []);

  return (
    <div className="legal-page">
      <div className="legal-container">
        <Link to="/" className="legal-back">← Back to CVForge</Link>
        
        <h1>About CVForge</h1>
        
        <div className="legal-content">
          <section>
            <h2>What is CVForge?</h2>
            <p>
              CVForge is a professional CV building platform designed for students and early-career professionals. We provide the tools and structure you need to create polished, effective resumes that showcase your experience and skills.
            </p>
            <p>
              Our platform combines intuitive design with smart features to help you transform your raw experience into a compelling professional narrative.
            </p>
          </section>

          <section>
            <h2>The Problem We Solve</h2>
            <p>
              Many talented individuals struggle to present their experience effectively on paper. Traditional resume templates are rigid, and formatting can become a distraction from what matters most—your story.
            </p>
            <p>
              CVForge removes the friction from resume creation. Instead of wrestling with document formatting, you can focus on crafting content that truly represents your capabilities.
            </p>
          </section>

          <section>
            <h2>How It Works</h2>
            <p>
              Our workflow is designed to be straightforward and efficient:
            </p>
            <ul>
              <li><strong>Start with what you have:</strong> Bring your experience, skills, and achievements—even if they're in rough form. Our structured forms give your information a clear home.</li>
              <li><strong>Shape it while you see it:</strong> Every edit you make is reflected instantly in a live preview. You see exactly how your CV will look as you build it.</li>
              <li><strong>Export when ready:</strong> When your document feels complete, unlock PDF export with a single payment. Your CV is yours to use for applications.</li>
            </ul>
          </section>

          <section>
            <h2>AI-Assisted Features</h2>
            <p>
              CVForge uses AI-assisted technology to help improve and tailor professional content. Our AI features are designed to enhance your work, not replace your judgment.
            </p>
            <div className="ai-disclosure">
              <h3>AI Disclosure</h3>
              <p>
                CVForge uses AI-assisted technology to help improve and tailor professional content. AI-generated suggestions may contain inaccuracies, so users should review and verify their CV before submitting it to employers.
              </p>
            </div>
            <p>
              The AI serves as a thoughtful assistant—suggesting improvements, helping with phrasing, and ensuring your content is presented professionally. However, you remain in control. Every AI suggestion can be reviewed, edited, or rejected.
            </p>
          </section>

          <section>
            <h2>Who CVForge Is For</h2>
            <p>
              CVForge is designed for:
            </p>
            <ul>
              <li><strong>Students:</strong> Creating their first professional CV</li>
              <li><strong>Recent graduates:</strong> Transitioning from academic to professional environments</li>
              <li><strong>Early-career professionals:</strong> Refining their presentation as they grow in their roles</li>
              <li><strong>Career changers:</strong> Repositioning their experience for new opportunities</li>
            </ul>
          </section>

          <section>
            <h2>Our Approach</h2>
            <p>
              We believe that a great CV should be:
            </p>
            <ul>
              <li><strong>Clear:</strong> Easy to scan and understand at a glance</li>
              <li><strong>Honest:</strong> Accurately representing your capabilities</li>
              <li><strong>Professional:</strong> Polished and appropriate for your industry</li>
              <li><strong>Yours:</strong> Reflecting your unique story and voice</li>
            </ul>
          </section>

          <section>
            <h2>Our Mission</h2>
            <p>
              CVForge exists to help people present their professional selves with confidence. We believe that everyone deserves access to tools that help them compete effectively for opportunities.
            </p>
            <p>
              By removing the technical barriers to creating great CVs, we hope to level the playing field—allowing your experience and potential to speak for itself.
            </p>
          </section>

          <section>
            <h2>Get Started</h2>
            <p>
              Ready to build your CV? It's free to start.
            </p>
            <div className="legal-cta">
              {user ? (
                <Link to="/dashboard" className="btn-primary">
                  Go to Dashboard
                </Link>
              ) : (
                <Link to="/login" className="btn-primary">
                  Start Building Free
                </Link>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
