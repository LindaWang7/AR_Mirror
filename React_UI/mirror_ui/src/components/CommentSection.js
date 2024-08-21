import React, { useEffect, useRef } from "react";

const comments = [
  "This is amazing!",
  "Great job!",
  "I love this!",
  "Incredible work!",
  "Keep it up!",
  "Awesome!",
  "Fantastic!",
  "So cool!",
  "Brilliant!",
  "Mind-blowing!"
];

const CommentSection = () => {
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
    <div
      ref={commentRef}
      style={{
        height: "150px",
        overflow: "hidden",
        border: "1px solid #ddd",
        padding: "10px"
      }}
    >
      <div>
        {comments.map((comment, index) => (
          <p key={index}>{comment}</p>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;
