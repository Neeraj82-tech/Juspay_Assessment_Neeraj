// src/components/DogSprite.js
import React, { memo } from 'react';

const DogSprite = memo(({ x = 0, y = 0, rotation = 0 }) => {
  return (
    <div
      className="absolute"
      style={{
        transform: `translate(${x}px, ${y}px) rotate(${rotation}deg)`,
        transformOrigin: 'center',
        zIndex: 100,
        width: '95px',
        height: '100px',
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="95"
        height="100"
        viewBox="0 0 95 100"
        version="1.1"
      >
        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g transform="translate(5, 5)">
            {/* Body */}
            <ellipse cx="42" cy="60" rx="30" ry="25" fill="#c49b74" stroke="#000" strokeWidth="1.2" />
            
            {/* Head */}
            <circle cx="42" cy="30" r="20" fill="#c49b74" stroke="#000" strokeWidth="1.2" />

            {/* Ears */}
            <ellipse cx="25" cy="20" rx="7" ry="12" fill="#a9825a" stroke="#000" strokeWidth="1.2" />
            <ellipse cx="59" cy="20" rx="7" ry="12" fill="#a9825a" stroke="#000" strokeWidth="1.2" />

            {/* Eyes */}
            <circle cx="35" cy="28" r="3" fill="#000" />
            <circle cx="49" cy="28" r="3" fill="#000" />

            {/* Nose */}
            <circle cx="42" cy="36" r="2" fill="#000" />

            {/* Mouth */}
            <path d="M38,40 Q42,44 46,40" stroke="#000" strokeWidth="1.2" fill="none" />

            {/* Tail */}
            <path d="M12,60 Q5,55 10,45" stroke="#a9825a" strokeWidth="4" strokeLinecap="round" />

            {/* Legs */}
            <line x1="30" y1="85" x2="30" y2="95" stroke="#000" strokeWidth="3" />
            <line x1="55" y1="85" x2="55" y2="95" stroke="#000" strokeWidth="3" />
          </g>
        </g>
      </svg>
    </div>
  );
});

export default DogSprite;
