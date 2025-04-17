import React, { memo } from 'react';

const RobotSprite = memo(({ x = 0, y = 0, rotation = 0 }) => {
    return (
        <div
            className="absolute"
            style={{
                transform: `translate(${x}px, ${y}px) rotate(${rotation}deg)`,
                transformOrigin: 'center',
                zIndex: 100,
                width: '70px',
                height: '90px',
            }}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 70 90"
                width="70"
                height="90"
                version="1.1"
            >
                <g stroke="#000" strokeWidth="1.2" fillRule="evenodd">
                    {/* Body - Gray rectangle */}
                    <rect x="15" y="30" width="40" height="45" fill="#b0b0b0" rx="5" ry="5" />

                    {/* Head - Darker gray circle */}
                    <circle cx="35" cy="20" r="15" fill="#808080" />

                    {/* Eyes - Yellow rectangles */}
                    <rect x="25" y="15" width="8" height="10" fill="#ffff00" />
                    <rect x="37" y="15" width="8" height="10" fill="#ffff00" />

                    {/* Antenna */}
                    <line x1="35" y1="5" x2="35" y2="0" strokeWidth="1.5" />
                    <circle cx="35" cy="-2" r="3" fill="#ff0000" />

                    {/* Arms - Gray rectangles */}
                    <rect x="5" y="35" width="10" height="25" fill="#808080" rx="3" ry="3" />
                    <rect x="55" y="35" width="10" height="25" fill="#808080" rx="3" ry="3" />

                    {/* Legs - Gray rectangles */}
                    <rect x="20" y="75" width="10" height="15" fill="#808080" rx="3" ry="3" />
                    <rect x="40" y="75" width="10" height="15" fill="#808080" rx="3" ry="3" />
                </g>
            </svg>
        </div>
    );
});

export default RobotSprite; 