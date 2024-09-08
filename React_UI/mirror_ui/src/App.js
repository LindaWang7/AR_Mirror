import React, { useEffect, useState } from 'react';
import HeartWithNumber from './components/HeartWithNumber';
import CommentSection from './components/CommentSection';
import ImageDisplay from './components/ImageDisplay';
import CaptureScreen from './components/CaptureScreen';
import './App.css';

function App() {
  const [apiData, setApiData] = useState(null);
  const [showCaptureScreen, setShowCaptureScreen] = useState(true); // Start with capture screen
  const [timeUntilNextCapture, setTimeUntilNextCapture] = useState(20); // Timer for next capture

  useEffect(() => {
    // Fetch data from JSON file
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

  useEffect(() => {
    if (!showCaptureScreen) {
      // Countdown for the next capture
      const interval = setInterval(() => {
        setTimeUntilNextCapture((prev) => (prev > 0 ? prev - 1 : 20));
      }, 1000);

      return () => clearInterval(interval); // Clear interval on unmount
    }
  }, [showCaptureScreen]);

  useEffect(() => {
    // Start the automatic 20 second capture timer
    const captureInterval = setInterval(() => {
      setShowCaptureScreen(true); // Show the capture screen every 20 seconds
    }, 20000);

    return () => clearInterval(captureInterval); // Clear interval on component unmount
  }, []);

  // This function gets called after the countdown ends and switches to comments and hearts
  const onCaptureComplete = () => {
    setShowCaptureScreen(false);
    setTimeUntilNextCapture(20); // Reset the timer for next capture
  };

  return (
    <div className="app">
      {showCaptureScreen ? (
        <CaptureScreen onCapture={onCaptureComplete} />
      ) : (
        <>
          {/* Display the heart with likes */}
          {apiData && <HeartWithNumber likes={apiData.likes} />}

          {/* Display the image from the JSON file */}
          {apiData && <ImageDisplay imageUrl={apiData.image} />}

          {/* Display the comment section */}
          {apiData && <CommentSection commentsData={apiData} />}

          {/* Timer in the bottom right corner */}
          <div className="timer">
            Next capture in: {timeUntilNextCapture}s
          </div>
        </>
      )}
    </div>
  );
}

export default App;
