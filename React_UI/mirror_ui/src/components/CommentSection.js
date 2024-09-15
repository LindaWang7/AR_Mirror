import React, { useEffect, useState, useRef, useCallback } from "react";
import "./CommentSection.css"; // Import the CSS file for styling

const CommentSection = ({ commentsData }) => {
  const [allComments, setAllComments] = useState([]); // All comments data
  const [visibleComments, setVisibleComments] = useState([]); // 3 visible comments
  const [startIndex, setStartIndex] = useState(0); // Index of the first visible comment
  const [fadeInIndex, setFadeInIndex] = useState(null); // Track the index of the comment to fade in
  const [fadeOutIndex, setFadeOutIndex] = useState(null); // Track the index of the comment to fade out
  const scrollInterval = 3000; // Interval in milliseconds to scroll to the next comment
  const timer = useRef(null);

  // const [top, setTop] = useState(-720 * 2);

  // Function to make the username bold
  const formatComment = (comment) => {
    const parts = comment.split(": "); // Split the username and the comment text
    return (
      <>
        <span className="username">{parts[0]}:</span> {parts[1]}
      </>
    );
  };

  // Initialize the comments
  useEffect(() => {
    const commentsArray = Object.keys(commentsData)
      .filter((key) => !isNaN(key))
      .map((key) => commentsData[key]);
    setAllComments(commentsArray);
    setVisibleComments([...commentsArray]); // Show the first 3 comments initially
  }, [commentsData]);

  //   useEffect(() => {
  //     let PositionTop = -720;
  //     function move() {
  //       PositionTop += 0.1;
  //       if (PositionTop >= 0) {
  //         PositionTop = -720;
  //       }
  //       setTop(PositionTop);
  //     }
  //     setInterval(move, 1);
  //   }, [allComments]);

  const container = useCallback(
    (node) => {
      if (node !== null && allComments.length) {
        timer.current && clearInterval(timer.currents);

        function isInViewport(element) {
          const rect = element.getBoundingClientRect();

          return (
            (rect.top + 36) / 136 >= 0 &&
            rect.left >= 0 &&
            460 / (rect.bottom - 1) * 2 >= -0.2 &&
            rect.right <=
            (window.innerWidth || document.documentElement.clientWidth)
          );
        }

        function setContent() {
          let list = node.querySelectorAll("p");

          list.forEach((mlNode, index) => {

            const op = (460 / (mlNode.getBoundingClientRect().bottom) - 1) * 2;
            const ob = (mlNode.getBoundingClientRect().top + 36) / 136 - 1;
            if (ob < 1) {
              mlNode.style.color = `rgba(255,255,255,${ob})`;
            }
            if (op < 0.8 && op > -0.15) {
              mlNode.style.color = `rgba(255,255,255,${op})`;
            }
            if (!isInViewport(mlNode)) {
              mlNode.style.color = `rgba(255,255,255,1)`;
            }
          });
        }

        let PositionTop = -720 * 2

        node.style.top = PositionTop + "px";

        setContent();
        function move() {
          PositionTop += 0.1;
          if (PositionTop >= -720) {
            let list = node.querySelectorAll("p");
            console.log(list)
            const newElements = [];
            list.forEach((mlNode, index) => {
              if (index > list.length - allComments.length - 1) {
                newElements.push(mlNode);
                mlNode.remove();
              }
            });
            console.log(newElements)
            newElements.forEach(function (element) {
              node.insertBefore(element, node.firstChild);
            });
            PositionTop = -720 * 2;
          }
          // setTop(PositionTop);
          node.style.top = PositionTop + "px";
          setContent();
        }
        timer.current = setInterval(move, 10);
      }
    },
    [allComments]
  );
  return (
    <div className="comment-section">
      <div
        className="comment-container"
        style={{
          position: 'absolute',
          // top: top,
        }}
        ref={container}
      >
        {visibleComments.map((comment, index) => (
          <p key={index} className="start">{formatComment(comment)}</p>
        ))}
        {visibleComments.map((comment, index) => (
          <p key={index} className="contnt">{formatComment(comment)}</p>
        ))}
        {visibleComments.map((comment, index) => (
          <p key={index} className="n">{formatComment(comment)}</p>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;