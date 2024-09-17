import React, { useEffect, useState } from 'react';
import HeartWithNumber from './components/HeartWithNumber';
import CommentSection from './components/CommentSection';
import ImageDisplay from './components/ImageDisplay';
import CaptureScreen from './components/CaptureScreen';
import NoPersonFound from './components/NoPersonFound'; // Import the new component
import './App.css';

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

function App() {
  const [apiData, setApiData] = useState(null);
  const [showCaptureScreen, setShowCaptureScreen] = useState(false); // Initially don't show capture screen
  const [loading, setLoading] = useState(false); // Add loading state

  // Fetching the data from the JSON file after rendering
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/Pictures/New_folder/json/image_response.json');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setApiData(data);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    fetchData();
  }, []);

  // Call Python backend
  const callPythonScript = async () => {
    try {
      setLoading(true); // Set loading to true before calling the Python script

      // Call the Python backend
      const response = await fetch('http://127.0.0.1:5000/run-script');
      const result = await response.json();
      
      // Simulate a delay of 7 seconds after the response
      setTimeout(() => {
        setLoading(false); // Stop loading after 7 seconds
        setApiData(result); // Update the UI with the new data
        console.log("Finished running Python backend");
      }, 7000);
    } catch (error) {
      console.error("Failed to call Python script:", error);
      setLoading(false); // Stop loading if there's an error
    }
  };

  // Handle the capture action triggered by the right arrow key
  const handleCapture = () => {
    console.log("Right arrow key pressed - starting capture");
    setShowCaptureScreen(true); // Show the capture screen when the right arrow key is pressed
  };

  // This function gets called after the "3, 2, 1, Smile!" countdown ends
  const onCaptureComplete = () => {
    setShowCaptureScreen(false); // Hide the capture screen and show the main content
    callPythonScript(); // Call the Python script after the capture
  };

  // Use useEffect to listen for keyboard events
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.keyCode === 39) { // Right arrow key code is 39
        handleCapture();
      }
    };

    // Attach the event listener
    window.addEventListener('keydown', handleKeyDown);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Render the loading screen when loading is true
  if (loading) {
    return (
      <div style={styles.container}>
        Loading...
      </div>
    );
  }

  return (
    <div className="app">
      {showCaptureScreen ? (
        <CaptureScreen onCapture={onCaptureComplete} />
      ) : (
        <>
          {/* Conditionally render NoPersonFound if no person is detected */}
          {apiData === "no person found" ? (
            <NoPersonFound />
          ) : (
            <>
              {/* Display the heart with likes */}
              {apiData && <HeartWithNumber likes={apiData.likes} />}

              {/* Display the image from the JSON file */}
              {apiData && <ImageDisplay imageUrl={apiData.image} />}

              {/* Display the comment section */}
              {apiData && <CommentSection commentsData={apiData} />}
            </>
          )}

          {/* No capture button now, as it's triggered by the right arrow key */}
        </>
      )}
    </div>
  );
}

export default App;
