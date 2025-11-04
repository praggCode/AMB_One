import React from 'react';
import { Activity, Users, MapPin, Clock, Shield, Phone } from 'lucide-react';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="home-page">
      <div className="hero-section">
        <div className="icon-circle">
          <Activity className="icon-activity" strokeWidth={2.5} />
        </div>
        <h1 className="main-heading">
          Fast & Reliable
        </h1>
        <h1 className="main-heading-accent">
          Ambulance Service
        </h1>
        <p className="subheading">
          Book emergency medical transportation in seconds. Available 24/7 with trained professionals.
        </p>
        <div className="button-group">
          <button className="btn-primary">
            <Users className="btn-icon" />
            Book as Client
          </button>
          <button className="btn-secondary">
            <MapPin className="btn-icon" />
            Login as Driver
          </button>
        </div>
        <div className="emergency-strip">
          <Phone className="emergency-icon" />
          For immediate emergency: Call <span className="emergency-number">911</span>
        </div>
      </div>
      <div className="features-section">
        <div className="features-container">
          <h2 className="section-title">
            Why Choose MediRide?
          </h2>

          <div className="features-grid">
            {/* Card 1 - Instant Booking */}
            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <Clock className="feature-icon" />
              </div>
              <h3 className="feature-title">
                Instant Booking
              </h3>
              <p className="feature-description">
                Book an ambulance in under 60 seconds with our streamlined process
              </p>
            </div>

            {/* Card 2 - Live Tracking */}
            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <MapPin className="feature-icon" />
              </div>
              <h3 className="feature-title">
                Live Tracking
              </h3>
              <p className="feature-description">
                Track your ambulance in real-time with GPS integration
              </p>
            </div>

            {/* Card 3 - 24/7 Support */}
            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <Activity className="feature-icon" />
              </div>
              <h3 className="feature-title">
                24/7 Support
              </h3>
              <p className="feature-description">
                Round-the-clock medical assistance and customer support
              </p>
            </div>

            {/* Card 4 - Certified Staff */}
            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <Shield className="feature-icon" />
              </div>
              <h3 className="feature-title">
                Certified Staff
              </h3>
              <p className="feature-description">
                All drivers and paramedics are professionally trained and certified
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="stats-section">
        <div className="stats-container">
          <h2 className="section-title">
            Trusted by Thousands
          </h2>
          <p className="stats-description">
            We have successfully completed over 50,000 emergency rides, ensuring safe and timely medical transportation for our community.
          </p>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-number">50K+</div>
              <div className="stat-label">Successful Rides</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">{'<5 min'}</div>
              <div className="stat-label">Average Response Time</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">24/7</div>
              <div className="stat-label">Always Available</div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer-section">
        <div className="footer-container">
          <h2 className="footer-heading">
            Ready to Get Started?
          </h2>
          <p className="footer-description">
            Join thousands of satisfied users who trust MediRide for their medical transportation needs.
          </p>
          <button className="btn-primary footer-btn">
            Book an Ambulance Now
          </button>
          <div className="footer-bottom">
            <p className="footer-copyright">
              © 2025 MediRide. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
