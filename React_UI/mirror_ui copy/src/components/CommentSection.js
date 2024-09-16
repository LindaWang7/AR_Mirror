import React, { useEffect, useState, useRef, useCallback } from "react";
import "./CommentSection.css";

const CommentSection = ({ commentsData }) => {
  const [allComments, setAllComments] = useState([]); // All comments data
  const [visibleComments, setVisibleComments] = useState([]); // 3 visible comments
  const timer = useRef(null);
  const containerTop = 100;
  const commentH = 56;

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

  const container = useCallback(
    (node) => {
      if (node !== null && allComments.length) {
        let PositionTop = -(commentH * allComments.length) * 2;

        node.style.top = PositionTop + "px";
        if (timer.current) {
          clearInterval(timer.currents);
        }

        function isInViewport(element) {
          const rect = element.getBoundingClientRect();
          return (
            rect.top - containerTop >= -commentH &&
            rect.bottom - containerTop <= 360 + commentH
          );
        }

        function setContent() {
          let list = node.querySelectorAll("p");

          list.forEach((mlNode, index) => {
            const op =
              ((360 + containerTop) / mlNode.getBoundingClientRect().bottom -
                1) *
              2;
            const ob =
              (mlNode.getBoundingClientRect().top + commentH) /
                (commentH + containerTop) -
              1;
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

        setContent();
        function move() {
          PositionTop += 0.1;
          if (PositionTop >= -(commentH * allComments.length)) {
            let list = node.querySelectorAll("p");
            console.log(list);
            const newElements = [];
            list.forEach((mlNode, index) => {
              if (index > list.length - allComments.length - 1) {
                newElements.push(mlNode);
                mlNode.remove();
              }
            });
            console.log(newElements);
            newElements.forEach(function (element) {
              node.insertBefore(element, node.firstChild);
            });
            PositionTop = -(commentH * allComments.length) * 2;
          }
          // setTop(PositionTop);
          node.style.top = PositionTop + "px";
          setContent();
        }
        timer.current = setInterval(move, 1);
      }
    },
    [allComments]
  );

  useEffect(() => {
    return () => {
      clearInterval(timer.current);
    };
  }, []);
  return (
    <div
      className="comment-section"
      style={{
        top: containerTop + "px",
      }}
    >
      <div
        className="comment-container"
        style={{
          position: "absolute",
        }}
        ref={container}
      >
        {visibleComments.map((comment, index) => (
          <p
            key={index}
            className="comment-start"
            style={{
              height: commentH + "px",
            }}
          >
            {formatComment(comment)}
          </p>
        ))}
        {visibleComments.map((comment, index) => (
          <p
            key={index}
            className="comment-content"
            style={{
              height: commentH + "px",
            }}
          >
            {formatComment(comment)}
          </p>
        ))}
        {visibleComments.map((comment, index) => (
          <p
            key={index}
            className="comment-end"
            style={{
              height: commentH + "px",
            }}
          >
            {formatComment(comment)}
          </p>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;