import React, { useEffect, useRef } from "react";
import "./CommentSection.css"; // Import the CSS file for styling

const commentsData = {
  '0': '@flambofan: Maybe try some accessories like a necklace or bracelet to add a bit of flair.',
  '1': '@speclover: The casual vibe of the denim shorts is perfect for summer!',
  '2': '@astonilov: A pop of color with a bright belt could add some fun contrast.',
  '3': '@increarti: The simplicity of the outfit is effortlessly chic. ️👍✨',
  '4': '@fabumiss: The overall color coordination is on point! ❤️',
  '5': '@elabolove: Consider rolling up the sleeves of the tee for a more relaxed look.',
  '6': '@sophisfan: Adding a stylish watch could give it a more polished vibe.',
  '7': '@enchace: How about a small, crossbody bag to complete the outfit?',
  '8': '@unimiss: Switching to high-top sneakers could add some edge to the outfit.',
  '9': '@luxurylover: A pair of statement earrings could totally glam up this look.',
  '10': '@fancexpe: A different hairstyle could also change up the look nicely.',
  '11': '@marvfan: The fit of the tee is perfect – not too tight, not too loose. ️👍',
  '12': '@astonigal: The minimalistic approach really works here – less is more! ️👍',
  '13': '@astgirl: The relaxed, hands-in-pockets pose looks super comfortable.',
  '14': '@wondelov: Try some high-waisted shorts instead for a twist.',
  '15': '@granfan: The matching teal sneakers are a cool touch! ️👍',
  '16': '@stunarti: Maybe think about a patterned scarf to bring some texture.',
  '17': '@sensatilov: How about a light jacket or cardigan for those chilly evenings?',
  '18': '@ornatearti: Try some fun nail polish to add a little extra something!',
  '19': '@luxurylov: That teal top is super trendy – love the color! 😍',
  '20': '@senssis: A cute sunhat could elevate this summer look to another level.',
  'likes': 15245,
  'views': 410686,
  'comments': 20
};

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
