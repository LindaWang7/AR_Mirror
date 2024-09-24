import React, { useEffect, useState } from 'react';
import HeartWithNumber from './components/HeartWithNumber';
import CommentSection from './components/CommentSection';
import ImageDisplay from './components/ImageDisplay';
import CaptureScreen from './components/CaptureScreen';
import NoPersonFound from './components/NoPersonFound'; // Import the new component
import DottedCircleLoader from './components/DottedCircleLoader';
import './App.css';

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
      // Call the Python backend
      // Set loading to true after calling the Python script
      const response = await fetch('http://127.0.0.1:5000/init');
      if (response.ok) {
        const result = await response.json();
        setLoading(false); // Stop loading after 12 seconds
        setShowCaptureScreen(true);
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error("Failed to call Python script:", error);
      setLoading(false); // Stop loading if there's an error
    }
  };

  // This function gets called after the "3, 2, 1, Smile!" countdown ends
  const capture_int = () => {
    setLoading(true); 
    callPythonScript();
  };

  // This function gets called after the "3, 2, 1, Smile!" countdown ends
  const capture = async () => {
    try {
    setShowCaptureScreen(false);
    setLoading(true); 
    const response = await fetch('http://127.0.0.1:5000/run_script');
      if (response.ok) {
        const result = await response.json();
        setLoading(false); // 更新加载状态
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error("Failed to call Python script:", error);
      setLoading(false); // Stop loading if there's an error
    }
  };

  // Use useEffect to listen for keyboard events
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.keyCode === 39) { // Right arrow key code is 39
        capture_int();
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
    return <DottedCircleLoader loading={loading} />; // Use the DottedCircleLoader instead of the simple "Loading..." text
  }
  if (!loading) {
    return (
      <div className="app">
        {showCaptureScreen ? (
          <CaptureScreen onCapture={capture} />
        ) : (
          <>
            {/* Conditionally render NoPersonFound if no person is detected */}
            {apiData?.error === "Person not found!" ? (
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
}

export default App;
