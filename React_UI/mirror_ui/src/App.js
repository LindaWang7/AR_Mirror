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

  useEffect(() => {
    //if it's not the capture screen (1,2,3 Smile)
    if (!showCaptureScreen) {
      // Countdown for the next capture
      const interval = setInterval(() => {
        setTimeUntilNextCapture((countdown) => {
          if (countdown > 0) {
            return countdown - 1;  // Decrease the timer by 1 if it's greater than 0
          } else {
            setShowCaptureScreen(true); // Show the capture screen when the timer reaches 0
            return 20; // Reset the timer for the next cycle
          }
        });
      }, 1000);

      return () => clearInterval(interval); // Clear interval on unmount
    }
  }, [showCaptureScreen]);

  // This function gets called after the countdown ends and switches to comments and hearts
  const onCaptureComplete = () => {
    setShowCaptureScreen(false); // Hide the capture screen and show the main content
  };

  return (
    <div className="app">
      {showCaptureScreen ? (
        <CaptureScreen onCapture={onCaptureComplete} />
      ) : (
        <>
          {apiData && <HeartWithNumber likes={apiData.likes} />}
          {apiData && <ImageDisplay imageUrl={apiData.image} />}
          {apiData && <CommentSection commentsData={apiData} />}
          <div className="timer">
            Next capture in: {timeUntilNextCapture}s
          </div>
        </>
      )}
    </div>
  );
}

export default App;
