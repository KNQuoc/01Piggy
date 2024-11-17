import React, { useState, useEffect } from "react";
import frame from "../pig.png";
import frame1 from "../pig1.png";
import frame2 from "../pig2.png";
import frame3 from "../pig3.png";
import frame4 from "../pig4.png";
import frame5 from "../pig5.png";
import frame6 from "../pig6.png";
import frame7 from "../pig-big.png";
import frame8 from "../pig.png";

const frames = [frame, frame1, frame2, frame3, frame4, frame5, frame6, frame7, frame8]; 

function AnimatePNG({ style }) {
  const [currentFrame, setCurrentFrame] = useState(0);
  const [isAnimating] = useState(true); // To track if animation should continue

  useEffect(() => {
    if (!isAnimating) return;

    const frameCount = frames.length;
    const intervalId = setInterval(() => {
      setCurrentFrame((prevFrame) => {
        const nextFrame = (prevFrame + 1) % frameCount;
        if (nextFrame === 0) {
          clearInterval(intervalId); // Stop animation after the last frame
        }
        return nextFrame;
      });
    }, 100); // Animation speed in ms

    // Cleanup interval on component unmount or when animation ends
    return () => clearInterval(intervalId);
  }, [isAnimating]);

  return (
    <div style={{ ...style, width: "100%", height: "100%" }}>
      <img
        src={frames[currentFrame]}
        alt="Animation Frame"
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
}

export default AnimatePNG;
