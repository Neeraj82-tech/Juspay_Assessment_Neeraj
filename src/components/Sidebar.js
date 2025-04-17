import React, { useState, useRef, useEffect } from "react";
import Icon from "./Icon";
import { useDrag } from "react-dnd";

const getBlockColor = (type) => {
  switch (type) {
    case 'MOVE':
    case 'TURN':
    case 'GOTO':
      return '#4A90E2'; // Blue
    case 'REPEAT':
      return '#D0021B'; // Red
    case 'SAY':
    case 'THINK':
    case 'SHOW':
    case 'HIDE':
    case 'SIZE':
      return '#4CAF50'; // Green
    case 'WAIT':
    case 'IF':
    case 'FOREVER':
    case 'STOP':
      return '#FF9800'; // Orange
    case 'WHEN_FLAG_CLICKED':
    case 'WHEN_SPRITE_CLICKED':
    case 'WHEN_KEY_PRESSED':
      return '#FFD700'; // Gold
    default:
      return '#9B9B9B'; // Gray
  }
};

const CATEGORIES = [
  {
    name: 'Motion',
    color: 'bg-[#4A90E2]',
    textColor: 'text-[#4A90E2]',
    icon: <Icon name="arrow-up" size={20} className="text-white" />,
    blocks: [
      { type: 'MOVE', label: 'Move 10 steps', icon: <Icon name="arrow-right" size={14} className="text-[#4A90E2]" />, value: 10 },
      { type: 'TURN', label: 'Turn 15 degrees', icon: <Icon name="redo" size={14} className="text-[#4A90E2]" />, value: 15 },
      { type: 'GOTO', label: 'Go to x: 0 y: 0', icon: <Icon name="move" size={14} className="text-[#4A90E2]" />, value: { x: 0, y: 0 } },
    ],
  },
  {
    name: 'Events',
    color: 'bg-[#FFD700]',
    textColor: 'text-[#FFD700]',
    icon: <Icon name="flag" size={20} className="text-gray-800" />,
    blocks: [
      { type: 'WHEN_FLAG_CLICKED', label: 'When flag clicked', icon: <Icon name="flag" size={14} className="text-[#FFD700]" /> },
      { type: 'WHEN_SPRITE_CLICKED', label: 'When this sprite clicked', icon: <Icon name="mouse" size={14} className="text-[#FFD700]" /> },
      { type: 'WHEN_KEY_PRESSED', label: 'When space key pressed', icon: <Icon name="keyboard" size={14} className="text-[#FFD700]" />, value: 'space' },
    ],
  },
  {
    name: 'Looks',
    color: 'bg-[#4CAF50]',
    textColor: 'text-[#4CAF50]',
    icon: <Icon name="eye" size={20} className="text-white" />,
    blocks: [
      { type: 'SAY', label: 'Say Hello!', icon: <Icon name="comment" size={14} className="text-[#4CAF50]" />, value: 'Hello!' },
      { type: 'THINK', label: 'Think Hmm...', icon: <Icon name="thought" size={14} className="text-[#4CAF50]" />, value: 'Hmm...' },
      { type: 'SHOW', label: 'Show', icon: <Icon name="eye" size={14} className="text-[#4CAF50]" /> },
      { type: 'HIDE', label: 'Hide', icon: <Icon name="eye-off" size={14} className="text-[#4CAF50]" /> },
      { type: 'SIZE', label: 'Set size to 100%', icon: <Icon name="resize" size={14} className="text-[#4CAF50]" />, value: 100 },
    ],
  },
  {
    name: 'Control',
    color: 'bg-[#FF9800]',
    textColor: 'text-[#FF9800]',
    icon: <Icon name="repeat" size={20} className="text-white" />,
    blocks: [
      { type: 'WAIT', label: 'Wait 1 seconds', icon: <Icon name="clock" size={14} className="text-[#FF9800]" />, value: 1 },
      { type: 'REPEAT', label: 'Repeat 10', icon: <Icon name="repeat" size={14} className="text-[#FF9800]" />, value: 10 },
      { type: 'FOREVER', label: 'Forever', icon: <Icon name="infinity" size={14} className="text-[#FF9800]" /> },
      { type: 'IF', label: 'If', icon: <Icon name="question" size={14} className="text-[#FF9800]" /> },
      { type: 'STOP', label: 'Stop all', icon: <Icon name="stop" size={14} className="text-[#FF9800]" /> },
    ],
  },
];

const Block = ({ block, categoryColor }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "block",
    item: { type: block.type, value: block.value },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={`flex items-center gap-2 px-3 py-2 rounded-md cursor-grab bg-white hover:bg-opacity-90 shadow-sm hover:shadow-md transform transition-all duration-150 hover:-translate-y-0.5 ${
        isDragging ? "opacity-50 scale-95" : "opacity-100"
      }`}
      style={{ backgroundColor: `${getBlockColor(block.type)}20` }}
    >
      <span className="flex-shrink-0">{block.icon}</span>
      <span className="text-sm font-medium text-gray-800">{block.label}</span>
    </div>
  );
};

export default function Sidebar({ addSprite, sprites, activeSprite, setActiveSprite, onRemoveBlock }) {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });
  const buttonRefs = useRef({});

  // Handle adding numbered sprites
  const handleAddSprite = () => {
    addSprite();
  };

  // Handle clicking a category button
  const handleCategoryClick = (categoryName, buttonRef) => {
    if (selectedCategory === categoryName) {
      setSelectedCategory(null); // Close if clicking the same category
    } else {
      setSelectedCategory(categoryName);
      if (buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect();
        setPopupPosition({
          top: rect.top + rect.height / 2 + window.scrollY - 24, // Center vertically with the icon
          left: rect.right + 4, // Tight adjacency to the icon
        });
      }
    }
  };

  // Close popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        selectedCategory &&
        !Object.values(buttonRefs.current).some((ref) => ref?.contains(event.target)) &&
        !event.target.closest('.blocks-popup')
      ) {
        setSelectedCategory(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [selectedCategory]);

  return (
    <div className="w-64 flex-none h-full overflow-y-auto flex flex-col p-4 bg-gray-50 border-r border-gray-200 shadow-sm">
      {/* Sprites Section */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Sprites</h2>
        <button
          onClick={handleAddSprite}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-[#4A90E2] text-white shadow-md hover:shadow-lg transform transition-all duration-200 hover:scale-110"
          title="Add new sprite"
        >
          <Icon name="plus" size={18} />
        </button>
      </div>
      <div className="mb-6">
        {sprites.map((sprite) => (
          <div
            key={sprite.id}
            className={`flex items-center gap-2 px-3 py-2 mb-1.5 rounded-lg cursor-pointer transition-all duration-200 ${
              activeSprite === sprite.id
                ? "bg-blue-50 text-blue-800 shadow-md"
                : "bg-white hover:bg-gray-100 text-gray-700"
            }`}
            onClick={() => setActiveSprite(sprite.id)}
          >
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#1E3A8A] text-white text-xs font-semibold">
              {sprite.id}
            </span>
            <span className="text-sm font-medium">Sprite {sprite.id}</span>
          </div>
        ))}
      </div>

      {/* Categories Section */}
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Blocks</h2>
      </div>
      <div className="flex flex-col gap-3 mb-6">
        {CATEGORIES.map((cat) => (
          <div key={cat.name} className="relative">
            <button
              ref={(el) => (buttonRefs.current[cat.name] = el)}
              className={`group relative flex items-center justify-center w-12 h-12 rounded-full shadow-md border-2 transition-all duration-300 ${cat.color} ${
                selectedCategory === cat.name ? "border-gray-700 scale-110 ring-2 ring-gray-700/20" : "border-transparent hover:scale-105"
              }`}
              onClick={() => handleCategoryClick(cat.name, buttonRefs.current[cat.name])}
            >
              <span className="flex-shrink-0">{cat.icon}</span>
              <span className="absolute left-full ml-2 bg-gray-800 text-white text-xs rounded-md px-2 py-1 opacity-0 group-hover:opacity-100 transition-all duration-200">
                {cat.name}
              </span>
            </button>
            {selectedCategory === cat.name && (
              <div
                className="blocks-popup absolute z-10 w-48 bg-white rounded-lg shadow-lg border border-gray-100 animate-fadeIn"
                style={{ top: popupPosition.top, left: popupPosition.left }}
              >
                <div className={`text-sm font-semibold px-3 pt-2 pb-1.5 ${cat.textColor}`}>
                  {cat.name}
                </div>
                <div className="px-2 pb-2">
                  {cat.blocks.map((block, idx) => (
                    <Block key={block.type + idx} block={block} categoryColor={cat.color} />
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}