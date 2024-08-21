import React, { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";

const HeartWithNumber = () => {
  const [count, setCount] = useState(0);
  const targetNumber = 12345;
  const duration = 3000; // 3 seconds

  useEffect(() => {
    let start = 0;
    const increment = targetNumber / (duration / 10);
    const interval = setInterval(() => {
      start += increment;
      if (start >= targetNumber) {
        setCount(targetNumber);
        clearInterval(interval);
      } else {
        setCount(Math.floor(start));
      }
    }, 10);
    return () => clearInterval(interval);
  }, [targetNumber]);

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <FaHeart style={{ color: "red", marginRight: "8px" }} />
      <span>{count}</span>
    </div>
  );
};

export default HeartWithNumber;
