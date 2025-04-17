import React, { memo } from 'react';

const BallSprite = memo(({ x = 0, y = 0, rotation = 0 }) => {
    return (
        <div
            className="absolute"
            style={{
                transform: `translate(${x}px, ${y}px) rotate(${rotation}deg)`,
                transformOrigin: 'center',
                zIndex: 100,
                width: '46px',
                height: '46px',
            }}
        >
            <svg
                width="46"
                height="46"
                viewBox="-0.5 -0.5 46 46"
            >
                <defs>
                    <radialGradient id="ballGradient" cx="29.7275" cy="13.1396" r="38.5299" gradientUnits="userSpaceOnUse">
                        <stop offset="0" style={{ stopColor: '#FFFF99' }} />
                        <stop offset="1" style={{ stopColor: '#FF9400' }} />
                    </radialGradient>
                </defs>
                <g>
                    <circle fill="url(#ballGradient)" cx="22.5" cy="22.5" r="22.5" strokeWidth="1" />
                </g>
            </svg>
        </div>
    );
});

export default BallSprite; 