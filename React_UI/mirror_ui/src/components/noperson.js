import React from 'react';

const NoPersonFound = () => {
  return (
    <div style={styles.container}>
      <h1>No person found</h1>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#1e272e', // Matching dark background
    color: '#ecf0f1', // Matching text color
    fontSize: '4rem', // Matching large font size
  },
};

export default NoPersonFound;
