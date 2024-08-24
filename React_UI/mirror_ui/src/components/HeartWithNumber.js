import React, { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import "./HeartWithNumber.css";

const HeartWithNumber = ({ likes }) => {
  const [count, setCount] = useState(0);
  const duration = 3000; // 3 seconds

  useEffect(() => {
    let start = 0;
    const increment = likes / (duration / 10);
    const interval = setInterval(() => {
      start += increment;
      if (start >= likes) {
        setCount(likes);
        clearInterval(interval);
      } else {
        setCount(Math.floor(start));
        
      }
    }, 10);
    return () => clearInterval(interval);
  }, [likes]);

  return (
    <div className="heart-icon">
      <FaHeart />
      <span>{count}</span>
    </div>
  );
};

export default HeartWithNumber;
