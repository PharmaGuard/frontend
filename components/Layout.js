import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import globalStyles from '../styles/globals';

const Layout = ({ children }) => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = ['Home', 'Dashboard', 'Orders'];

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div style={styles.headerContent}>
          <h1 style={styles.logo}>PharmaGuard</h1>
          <nav style={styles.nav}>
            <div style={styles.desktopMenu}>
              {navItems.map((item) => (
                <Link
                  key={item}
                  href={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                  style={{
                    ...styles.navButton,
                    ...(router.pathname === (item === 'Home' ? '/' : `/${item.toLowerCase()}`) ? styles.activeNavButton : {}),
                  }}
                >
                  {item}
                </Link>
              ))}
            </div>
            <div style={styles.mobileMenu}>
              <button style={styles.hamburger} onClick={() => setIsMenuOpen(!isMenuOpen)}>
                ☰
              </button>
              {isMenuOpen && (
                <div style={styles.mobileMenuItems}>
                  {navItems.map((item) => (
                    <Link
                      key={item}
                      href={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                      style={{
                        ...styles.mobileNavButton,
                        ...(router.pathname === (item === 'Home' ? '/' : `/${item.toLowerCase()}`) ? styles.activeMobileNavButton : {}),
                      }}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </nav>
          <div style={styles.walletSection}>
            <span style={styles.walletAddress}>0x1234...5678</span>
            <button style={styles.copyButton}>Copy</button>
            <button style={styles.connectButton}>Connect Wallet</button>
          </div>
        </div>
      </header>

      <main style={styles.main}>
        {children}
      </main>

      <footer style={styles.footer}>
        <div style={styles.footerContent}>
          <div style={styles.footerSection}>
            <h3>About PharmaGuard</h3>
            <p>Secure and efficient pharmaceutical management using blockchain technology.</p>
          </div>
          <div style={styles.footerSection}>
            <h3>Contact Us</h3>
            <p>Email: info@pharmaguard.com</p>
            <p>Phone: +1 (123) 456-7890</p>
          </div>
          <div style={styles.footerSection}>
            <h3>Follow Us</h3>
            <p>Twitter | Facebook | LinkedIn</p>
          </div>
        </div>
        <div style={styles.copyright}>
          © 2023 PharmaGuard. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

const styles = {
  ...globalStyles,
  container: {
    ...globalStyles.container,
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  header: {
    background: 'linear-gradient(135deg, #1a2a6c 0%, #2a4858 50%, #4facfe 100%)',
    color: 'white',
    padding: '1rem 0',
    boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
    borderRadius: '0 0 10px 10px',
  },
  headerContent: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 1rem',
  },
  logo: {
    fontSize: '2rem',
    fontWeight: 'bold',
    margin: 0,
    background: 'linear-gradient(45deg, #00f2fe, #4facfe)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    textShadow: '0 0 10px rgba(79,172,254,0.5)',
  },
  nav: {
    display: 'flex',
    justifyContent: 'center',
    flex: 1,
  },
  desktopMenu: {
    display: 'flex',
    gap: '1rem',
    '@media (max-width: 768px)': {
      display: 'none',
    },
  },
  navButton: {
    color: '#ffffff',
    textDecoration: 'none',
    fontSize: '1rem',
    fontWeight: '700',
    padding: '0.5rem 1rem',
    borderRadius: '20px',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    transition: 'all 0.3s ease',
    ':hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
    },
  },
  activeNavButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    boxShadow: '0 0 10px rgba(255, 255, 255, 0.3)',
  },
  mobileMenu: {
    display: 'none',
    '@media (max-width: 768px)': {
      display: 'block',
    },
  },
  hamburger: {
    background: 'none',
    border: 'none',
    color: 'white',
    fontSize: '1.5rem',
    cursor: 'pointer',
  },
  mobileMenuItems: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    background: 'linear-gradient(135deg, #1a2a6c 0%, #2a4858 50%, #4facfe 100%)',
    padding: '1rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    borderRadius: '0 0 10px 10px',
  },
  mobileNavButton: {
    color: 'white',
    textDecoration: 'none',
    fontSize: '1.2rem',
    fontWeight: '700',
    padding: '0.5rem 1rem',
    borderRadius: '20px',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    transition: 'all 0.3s ease',
    ':hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
    },
  },
  activeMobileNavButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    boxShadow: '0 0 10px rgba(255, 255, 255, 0.3)',
  },
  walletSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    '@media (max-width: 768px)': {
      flexDirection: 'column',
      alignItems: 'flex-end',
    },
  },
  walletAddress: {
    fontSize: '0.9rem',
    color: '#ecf0f1',
    fontFamily: 'Consolas, monospace',
    background: 'rgba(255,255,255,0.1)',
    padding: '0.3rem 0.5rem',
    borderRadius: '4px',
  },
  copyButton: {
    ...globalStyles.button,
    padding: '0.3rem 0.5rem',
    fontSize: '0.8rem',
    color: '#2c3e50',
    backgroundColor: '#ecf0f1',
    borderRadius: '20px',
    transition: 'all 0.3s ease',
    ':hover': {
      backgroundColor: '#bdc3c7',
      transform: 'translateY(-2px)',
    },
  },
  connectButton: {
    ...globalStyles.button,
    background: 'linear-gradient(45deg, #11998e, #38ef7d)',
    borderRadius: '25px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s ease',
    ':hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 6px 8px rgba(0, 0, 0, 0.15)',
      background: 'linear-gradient(45deg, #0e8a7e, #32d56d)',
    },
  },
  main: {
    flex: 1,
    maxWidth: '1200px',
    margin: '2rem auto',
    padding: '0 1rem',
  },
  footer: {
    backgroundColor: '#34495e',
    color: 'white',
    padding: '2rem 0',
  },
  footerContent: {
    display: 'flex',
    justifyContent: 'space-between',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 1rem',
  },
  footerSection: {
    flex: 1,
  },
  copyright: {
    textAlign: 'center',
    marginTop: '2rem',
    fontSize: '0.9rem',
    color: '#bdc3c7',
  },
};


export default Layout;