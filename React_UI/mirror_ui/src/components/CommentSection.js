import React, { useEffect, useRef } from "react";
import "./CommentSection.css"; // Import the CSS file for styling

const CommentSection = ({ commentsData }) => {
  const commentRef = useRef(null);

  useEffect(() => {
    const scrollInterval = setInterval(() => {
      if (commentRef.current) {
        commentRef.current.scrollTop += 1;
        if (
          commentRef.current.scrollTop + commentRef.current.clientHeight >=
          commentRef.current.scrollHeight
        ) {
          commentRef.current.scrollTop = 0;
        }
      }
    }, 50);

    return () => clearInterval(scrollInterval);
  }, []);

  return (
    <div className="comment-section" ref={commentRef}>
      <div>
        {Object.keys(commentsData).map((key) => {
          if (!isNaN(key)) { // Ensure only comment keys (not 'likes', 'views', 'comments') are displayed
            return <p key={key}>{commentsData[key]}</p>;
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default CommentSection;
