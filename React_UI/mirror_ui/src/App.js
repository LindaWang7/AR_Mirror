import React from "react";
import HeartWithNumber from "./components/HeartWithNumber";
import CommentSection from "./components/CommentSection";
import "./App.css";

function App() {
  return (
    <div className="app">
      <HeartWithNumber />
      <CommentSection />
    </div>
  );
}

export default App;
