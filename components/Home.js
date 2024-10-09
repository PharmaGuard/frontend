import React from 'react';
import globalStyles from '../styles/globals';

const Home = () => {
  return (
    <div style={styles.container}>
      <section style={styles.hero}>
        <h1 style={styles.heroTitle}>Welcome to PharmaGuard</h1>
        <p style={styles.heroSubtitle}>Secure and Efficient Pharmaceutical Management</p>
        <button style={styles.ctaButton}>Get Started</button>
      </section>
      <section style={styles.features}>
        <h2 style={styles.sectionTitle}>Our Features</h2>
        <div style={styles.featureList}>
          <FeatureCard
            icon="🔒"
            title="Secure Tracking"
            description="End-to-end encryption for all drug shipments"
          />
          <FeatureCard
            icon="📊"
            title="Real-time Analytics"
            description="Monitor your supply chain with live updates"
          />
          <FeatureCard
            icon="💊"
            title="Drug Management"
            description="Efficiently manage your pharmaceutical inventory"
          />
          <FeatureCard
            icon="📱"
            title="Mobile Access"
            description="Access PharmaGuard on any device, anywhere"
          />
        </div>
      </section>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <div style={styles.featureCard}>
    <span style={styles.featureIcon}>{icon}</span>
    <h3 style={styles.featureTitle}>{title}</h3>
    <p style={styles.featureDescription}>{description}</p>
  </div>
);

const styles = {
  ...globalStyles,
  hero: {
    textAlign: 'center',
    padding: '4rem 0',
    backgroundColor: '#3498db',
    color: 'white',
    borderRadius: '8px',
    marginBottom: '3rem',
  },
  heroTitle: {
    ...globalStyles.title,
    color: 'white',
  },
  heroSubtitle: {
    ...globalStyles.subtitle,
    color: 'white',
  },
  ctaButton: {
    ...globalStyles.button,
    backgroundColor: 'white',
    color: '#3498db',
  },
  features: {
    padding: '2rem 0',
  },
  sectionTitle: {
    ...globalStyles.title,
  },
  featureList: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '2rem',
  },
  featureCard: {
    ...globalStyles.card,
    flex: '1 1 250px',
    maxWidth: '300px',
    textAlign: 'center',
  },
  featureIcon: {
    fontSize: '2.5rem',
    marginBottom: '1rem',
    display: 'block',
  },
  featureTitle: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    marginBottom: '0.5rem',
    color: '#2c3e50',
  },
  featureDescription: {
    fontSize: '0.9rem',
    color: '#7f8c8d',
  },
};

export default Home;