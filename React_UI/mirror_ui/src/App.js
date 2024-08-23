import React, { useEffect, useState } from "react";
import HeartWithNumber from "./components/HeartWithNumber";
import CommentSection from "./components/CommentSection";
import "./App.css";

function App() {
  const [apiData, setApiData] = useState(null);

  useEffect(() => {
    // Simulating API call
    const fetchData = async () => {
      const response = {
        "0": "@enchanguru: The smile is contagious, definitely adds to the outfit’s charm. 😍😍❤️",
        "1": "@flamboyexp: If that's a hint of a necklace, it’s a nice minimal accessory to add! ️👍",
        "2": "@allurimiss: Seems like the background is neat; always a good choice for portraits. ️👍😍😍",
        // ... other comments ...
        "likes": 23204,
        "views": 419143,
        "comments": 20
      };
      setApiData(response);
    };

    fetchData();
  }, []);

  return (
    <div>
      {apiData && <HeartWithNumber likes={apiData.likes} />}
      <CommentSection />
    </div>
  );
}

export default App;
