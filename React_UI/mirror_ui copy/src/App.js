import React, { useEffect, useState } from 'react';
import HeartWithNumber from './components/HeartWithNumber';
import CommentSection from './components/CommentSection';
import ImageDisplay from './components/ImageDisplay';
import CaptureScreen from './components/CaptureScreen';
import NoPersonFound from './components/NoPersonFound'; // Import the new component
import './App.css';

function App() {
  const [apiData, setApiData] = useState(null);
  const [showCaptureScreen, setShowCaptureScreen] = useState(false); // Initially don't show capture screen

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
      const response = await fetch('http://127.0.0.1:5000/run-script');
      const result = await response.json();
      console.log("finished running python backend");
    } catch (error) {
      console.error("Failed to call Python script:", error);
    }
  };

  // Handle the capture button click
  const handleCaptureButtonClick = () => {
    console.log("clicked")
    setShowCaptureScreen(true); // Show the capture screen when the button is clicked
  };

  // This function gets called after the "3, 2, 1, Smile!" countdown ends
  const onCaptureComplete = () => {
    setShowCaptureScreen(false); // Hide the capture screen and show the main content
    callPythonScript(); // Call the Python script after the capture
  };

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

          {/* Capture button */}
          <div className="capture-button-container">
            {/* <button onClick={handleCaptureButtonClick} className="capture-button">
              Capture Image
            </button> */}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
