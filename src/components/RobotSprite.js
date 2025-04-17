import React from "react";

const RobotSprite = ({ x, y, rotation, scale, isSelected }) => {
    return (
        <div
            className={`absolute transition-all duration-300 ${isSelected ? "ring-2 ring-blue-500" : ""
                }`}
            style={{
                transform: `translate(${x}px, ${y}px) rotate(${rotation}deg) scale(${scale})`,
                width: "70px",
                height: "90px",
            }}
        >
            <svg
                width="70"
                height="90"
                viewBox="0 0 70 90"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <g transform="translate(35, 45)">
                    <rect x="-20" y="-30" width="40" height="60" fill="#9E9E9E" />
                    <rect x="-15" y="-35" width="30" height="20" fill="#757575" />
                    <circle cx="-8" cy="-25" r="4" fill="#FFD700" />
                    <circle cx="8" cy="-25" r="4" fill="#FFD700" />
                    <rect x="-5" y="-5" width="10" height="15" fill="#616161" />
                    <rect x="-25" y="-20" width="10" height="20" fill="#757575" />
                    <rect x="15" y="-20" width="10" height="20" fill="#757575" />
                    <rect x="-25" y="20" width="10" height="15" fill="#757575" />
                    <rect x="15" y="20" width="10" height="15" fill="#757575" />
                </g>
            </svg>
        </div>
    );
};

export default RobotSprite; 