const globalStyles = {
  body: {
    fontFamily: 'Roboto, Arial, sans-serif',
    backgroundColor: '#f0f4f8',
    color: '#2c3e50',
    margin: 0,
    padding: 0,
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '2rem 1rem',
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    color: '#2c3e50',
    textAlign: 'center',
    marginBottom: '2rem',
  },
  subtitle: {
    fontSize: '1.5rem',
    color: '#34495e',
    textAlign: 'center',
    marginBottom: '1.5rem',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '1.5rem',
    marginBottom: '1.5rem',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  button: {
    padding: '0.8rem 1.5rem',
    fontSize: '1rem',
    fontWeight: '500',
    color: 'white',
    backgroundColor: '#3498db',
    border: 'none',
    borderRadius: '25px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
  },
  buttonHover: {
    backgroundColor: '#2980b9',
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
  },
};

export default globalStyles;