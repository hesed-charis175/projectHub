import React, { useState, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import Card from "./Card.jsx";

const radius = 320;
const max_tilt = 10;
const hover_delay = 500;

export default function ImageSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const hoverTimeout = useRef(null);

  const cards = [
    { path: "./Hero/A.png" },
    { path: "./Hero/B.png" },
    { path: "./Hero/C.png" },
    { path: "./Hero/D.png" },
    { path: "./Hero/E.png" },
    { path: "./Hero/A.png" },
    { path: "./Hero/B.png" },
    { path: "./Hero/C.png" },
  ];

  const count = cards.length;
  const step = (2 * Math.PI) / count;

  return (
    <div className="flex items-center justify-center">
      <div className="relative w-full perspective-[1200px]">
        {cards.map((card, i) => {
          const offset = i - activeIndex;

          const angle = offset * step;
          const x = Math.sin(angle) * radius;
          const z = Math.cos(angle) * radius;

          const scale = 0.85 + (z / radius) * 0.25;
          const opacity = 0.4 + (z / radius) * 0.6;
          const zIndex = Math.round(z);

          const isActive = i === activeIndex;

          const rawRotateX = useMotionValue(0);
          const rawRotateY = useMotionValue(0);

          const rotateX = useSpring(rawRotateX, {
            stiffness: 220,
            damping: 26,
          });
          const rotateY = useSpring(rawRotateY, {
            stiffness: 220,
            damping: 26,
          });

          const handleMouseMove = (e) => {
            if (!isActive) return;

            const rect = e.currentTarget.getBoundingClientRect();
            const px = (e.clientX - rect.left) / rect.width - 0.5;
            const py = (e.clientY - rect.top) / rect.height - 0.5;

            rawRotateY.set(px * max_tilt);
            rawRotateX.set(-py * max_tilt);
          };

          const resetTilt = () => {
            rawRotateX.set(0);
            rawRotateY.set(0);
          };

          const handleHoverStart = () => {
            hoverTimeout.current = setTimeout(() => {
              setActiveIndex(i);
            }, hover_delay);
          };

          const handleHoverEnd = () => {
            clearTimeout(hoverTimeout.current);
            resetTilt();
          };

          return (
            <div
              key={i}
              className="absolute left-1/2 top-1/2 transition-all duration-500 ease-out cursor-pointer"
              style={{
                transform: `
                  translate(-50%, -50%)
                  translateX(${x}px)
                  translateZ(${z}px)
                  scale(${scale})
                `,
                opacity,
                zIndex,
                transformStyle: "preserve-3d",
              }}
              onMouseEnter={handleHoverStart}
              onMouseLeave={handleHoverEnd}
            >
              <motion.div
                style={{
                  rotateX,
                  rotateY,
                  transformStyle: "preserve-3d",
                }}
                onMouseMove={handleMouseMove}
              >
                <Card path={card.path} />
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
