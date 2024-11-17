import { useState, useEffect } from "react";
import Image from "next/image";

import frame from "../images/pig.png";
import frame1 from "../images/pig1.png";
import frame2 from "../images/pig2.png";
import frame3 from "../images/pig3.png";
import frame4 from "../images/pig4.png";
import frame5 from "../images/pig5.png";
import frame6 from "../images/pig6.png";
import frame7 from "../images/pig-big.png";
import frame8 from "../images/pig.png";

const frames = [
  frame,
  frame1,
  frame2,
  frame3,
  frame4,
  frame5,
  frame6,
  frame7,
  frame8,
];

interface AnimatePNGProps {
  style?: React.CSSProperties;
}

function animatePNG({ style }: AnimatePNGProps) {
  const [currentFrame, setCurrentFrame] = useState(0);
  const [isAnimating] = useState(true);

  useEffect(() => {
    if (!isAnimating) return;

    const frameCount = frames.length;
    const intervalId = setInterval(() => {
      setCurrentFrame((prevFrame) => {
        const nextFrame = (prevFrame + 1) % frameCount;
        if (nextFrame === 0) {
          clearInterval(intervalId);
        }
        return nextFrame;
      });
    }, 100);

    return () => clearInterval(intervalId);
  }, [isAnimating]);

  return (
    <div style={{ ...style, width: "100%", height: "100%" }}>
      <Image
        src={frames[currentFrame]}
        alt="Animation Frame"
        width={500}
        height={300}
        style={{ objectFit: "cover" }}
      />
    </div>
  );
}

export default animatePNG;
