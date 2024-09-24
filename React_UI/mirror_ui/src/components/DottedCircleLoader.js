import React from 'react';

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#1e272e',
    color: '#ecf0f1',
    fontSize: '3rem',
  },
  loader: {
    display: 'inline-block',
    position: 'relative',
    width: '80px',
    height: '80px',
  },
  dot: {
    position: 'absolute',
    width: '16px',
    height: '16px',
    borderRadius: '50%',
    backgroundColor: '#ecf0f1',
    animation: 'dotGrow 1.2s infinite ease-in-out',
  },
};

const DottedCircleLoader = ({ loading }) => {
  if (loading) {
    return (
      <div style={styles.container}>
        Loading...
        <div style={styles.loader}>
          <div style={{ ...styles.dot, top: '0%', left: '50%', transform: 'translate(-50%, -50%)' }} />
          <div style={{ ...styles.dot, top: '50%', left: '0%', transform: 'translate(-50%, -50%)' }} />
          <div style={{ ...styles.dot, top: '50%', left: '100%', transform: 'translate(-50%, -50%)' }} />
          <div style={{ ...styles.dot, top: '100%', left: '50%', transform: 'translate(-50%, -50%)' }} />
        </div>
      </div>
    );
  }

  return null;
};

// Add the CSS animation for the growing dots
const styleSheet = document.styleSheets[0];
const keyframes = `
  @keyframes dotGrow {
    0%, 100% {
      transform: scale(0.8);
    }
    50% {
      transform: scale(1.2);
    }
  }
`;
styleSheet.insertRule(keyframes, styleSheet.cssRules.length);

export default DottedCircleLoader;
