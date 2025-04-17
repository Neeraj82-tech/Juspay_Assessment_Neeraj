import React, { memo } from 'react';

const AlienSprite = memo(({ x = 0, y = 0, rotation = 0 }) => {
    return (
        <div
            className="absolute"
            style={{
                transform: `translate(${x}px, ${y}px) rotate(${rotation}deg)`,
                transformOrigin: 'center',
                zIndex: 100,
                width: '80px',
                height: '100px',
            }}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 80 100"
                width="80"
                height="100"
                version="1.1"
            >
                <g stroke="#000" strokeWidth="1.2" fillRule="evenodd">
                    {/* Body - Green oval */}
                    <ellipse cx="40" cy="60" rx="25" ry="30" fill="#77dd77" />

                    {/* Head - Green circle */}
                    <circle cx="40" cy="30" r="20" fill="#77dd77" />

                    {/* Eyes - Black ovals */}
                    <ellipse cx="30" cy="28" rx="5" ry="8" fill="#000" />
                    <ellipse cx="50" cy="28" rx="5" ry="8" fill="#000" />

                    {/* Antenna */}
                    <line x1="40" y1="10" x2="40" y2="0" strokeWidth="1.5" />
                    <circle cx="40" cy="-2" r="4" fill="#ff69b4" />

                    {/* Arms - Green lines/ovals */}
                    <ellipse cx="15" cy="60" rx="5" ry="15" fill="#77dd77" transform="rotate(-30 15 60)" />
                    <ellipse cx="65" cy="60" rx="5" ry="15" fill="#77dd77" transform="rotate(30 65 60)" />

                    {/* Legs - Green lines/ovals */}
                    <ellipse cx="30" cy="90" rx="5" ry="10" fill="#77dd77" />
                    <ellipse cx="50" cy="90" rx="5" ry="10" fill="#77dd77" />
                </g>
            </svg>
        </div>
    );
});

export default AlienSprite; 