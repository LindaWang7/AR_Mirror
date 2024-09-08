import React, { useEffect, useState } from "react";
import HeartWithNumber from "./components/HeartWithNumber";
import CommentSection from "./components/CommentSection";
import ImageDisplay from "./components/ImageDisplay"; // Import the image display component
import "./App.css";

function App() {
  const [apiData, setApiData] = useState(null);

  useEffect(() => {
    // Fetching data from a JSON file located at the specified path
    const fetchData = async () => {
      try {
        const response = await fetch('/Pictures/New_folder/json/image_response.json'); // Path to your JSON file in the public folder
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

  return (
    <div className="app">
      {apiData && (
        <>
          {/* Display the heart with likes */}
          <HeartWithNumber likes={apiData.likes} />
          
          {/* Display the image from the JSON file */}
          <ImageDisplay imageUrl={apiData.image} />
          
          {/* Display the comment section */}
          <CommentSection commentsData={apiData} />
        </>
      )}
    </div>
  );
}

export default App;
