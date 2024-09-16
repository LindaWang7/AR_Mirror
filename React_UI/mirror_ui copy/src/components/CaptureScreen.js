import React, { useState, useEffect } from 'react';

const CaptureScreen = ({ onCapture }) => {
  const [countdown, setCountdown] = useState(3);
  const [showSmile, setShowSmile] = useState(false);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer); // Clean up the timer
    } else {
      // Show "Smile!" for exactly 1 second
      setShowSmile(true);
      const smileTimeout = setTimeout(() => {
        setShowSmile(false); // Hide "Smile!" after 1 second
        onCapture(); // Trigger the next step after "Smile!"
      }, 1000); // 1 second delay for "Smile!"
      return () => clearTimeout(smileTimeout);
    }
  }, [countdown, onCapture]);

  return (
    <div style={styles.container}>
      {countdown > 0 ? (
        <h1>{countdown}</h1>
      ) : showSmile ? (
        <h1>Smile!</h1>
      ) : null}
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#1e272e',
    color: '#ecf0f1',
    fontSize: '4rem',
  },
};

export default CaptureScreen;
