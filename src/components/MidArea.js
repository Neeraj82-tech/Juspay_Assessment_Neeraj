import React, { useState } from 'react';
import { useDrop, useDrag } from 'react-dnd';
import RobotSprite from './RobotSprite';
import DogSprite from './DogSprite';
import AlienSprite from './AlienSprite';
import CatSprite from './CatSprite';
import BearSprite from './BearSprite';
import BallSprite from './BallSprite';

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

const BlockDisplay = ({ block, onUpdate, spriteId, index, moveBlock }) => {
  const [inputValues, setInputValues] = useState(
    block.type === 'GOTO' ? [
      block.value && typeof block.value === 'object' ? block.value.x || 0 : 0,
      block.value && typeof block.value === 'object' ? block.value.y || 0 : 0
    ] :
      block.type === 'SAY' || block.type === 'THINK' ? [block.value || ''] :
        block.type === 'SIZE' || block.type === 'WAIT' ? [block.value || 0] :
          block.type === 'WHEN_KEY_PRESSED' ? [block.value || 'space'] :
            [block.value || 0]
  );

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'block',
    item: { ...block, spriteId, index },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'block',
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
    hover: (item) => {
      if (item.index === index) return;
      moveBlock(item.index, index);
      item.index = index;
    },
  }));

  const handleInputChange = (index, value) => {
    const newValues = [...inputValues];
    newValues[index] = value;
    setInputValues(newValues);

    if (block.type === 'GOTO') {
      const x = parseFloat(newValues[0]) || 0;
      const y = parseFloat(newValues[1]) || 0;
      onUpdate({
        ...block,
        value: { x, y },
      });
    } else if (block.type === 'REPEAT' || block.type === 'SIZE' || block.type === 'WAIT') {
      const numValue = Math.max(1, Math.floor(parseFloat(newValues[0]) || 1));
      onUpdate({
        ...block,
        value: numValue,
      });
    } else if (block.type === 'SAY' || block.type === 'THINK' || block.type === 'WHEN_KEY_PRESSED') {
      onUpdate({
        ...block,
        value: newValues[0],
      });
    } else {
      onUpdate({
        ...block,
        value: parseFloat(newValues[0]) || 0,
      });
    }
  };

  return (
    <div
      ref={(node) => drag(drop(node))}
      className={`p-2 mb-2 rounded cursor-move ${isDragging ? 'opacity-50' : ''} ${isOver ? 'border-2 border-dashed border-gray-400' : ''}`}
      style={{ backgroundColor: getBlockColor(block.type) }}
    >
      {block.type === 'GOTO' ? (
        <div className="flex items-center space-x-2">
          <span>go to x:</span>
          <input
            type="number"
            value={inputValues[0]}
            onChange={(e) => handleInputChange(0, e.target.value)}
            className="w-16 p-1 border rounded"
            placeholder="x"
          />
          <span>y:</span>
          <input
            type="number"
            value={inputValues[1]}
            onChange={(e) => handleInputChange(1, e.target.value)}
            className="w-16 p-1 border rounded"
            placeholder="y"
          />
        </div>
      ) : block.type === 'REPEAT' ? (
        <div className="flex items-center space-x-2">
          <span>repeat</span>
          <input
            type="number"
            value={inputValues[0]}
            onChange={(e) => handleInputChange(0, e.target.value)}
            className="w-16 p-1 border rounded"
            min="1"
            step="1"
          />
          <span>times</span>
        </div>
      ) : block.type === 'DELETE_CLONE' ? (
        <div className="flex items-center space-x-2">
          <span>delete this clone</span>
        </div>
      ) : block.type === 'SAY' ? (
        <div className="flex items-center space-x-2">
          <span>say</span>
          <input
            type="text"
            value={inputValues[0]}
            onChange={(e) => handleInputChange(0, e.target.value)}
            className="w-32 p-1 border rounded"
            placeholder="Hello!"
          />
        </div>
      ) : block.type === 'THINK' ? (
        <div className="flex items-center space-x-2">
          <span>think</span>
          <input
            type="text"
            value={inputValues[0]}
            onChange={(e) => handleInputChange(0, e.target.value)}
            className="w-32 p-1 border rounded"
            placeholder="Hmm..."
          />
        </div>
      ) : block.type === 'SIZE' ? (
        <div className="flex items-center space-x-2">
          <span>set size to</span>
          <input
            type="number"
            value={inputValues[0]}
            onChange={(e) => handleInputChange(0, e.target.value)}
            className="w-16 p-1 border rounded"
            min="1"
          />
          <span>%</span>
        </div>
      ) : block.type === 'WAIT' ? (
        <div className="flex items-center space-x-2">
          <span>wait</span>
          <input
            type="number"
            value={inputValues[0]}
            onChange={(e) => handleInputChange(0, e.target.value)}
            className="w-16 p-1 border rounded"
            min="0.1"
            step="0.1"
          />
          <span>seconds</span>
        </div>
      ) : block.type === 'WHEN_KEY_PRESSED' ? (
        <div className="flex items-center space-x-2">
          <span>when</span>
          <input
            type="text"
            value={inputValues[0]}
            onChange={(e) => handleInputChange(0, e.target.value)}
            className="w-20 p-1 border rounded"
            placeholder="space"
          />
          <span>key pressed</span>
        </div>
      ) : block.type === 'WHEN_FLAG_CLICKED' ? (
        <div>when flag clicked</div>
      ) : block.type === 'WHEN_SPRITE_CLICKED' ? (
        <div>when this sprite clicked</div>
      ) : block.type === 'SHOW' ? (
        <div>show</div>
      ) : block.type === 'HIDE' ? (
        <div>hide</div>
      ) : block.type === 'IF' ? (
        <div>if</div>
      ) : block.type === 'FOREVER' ? (
        <div>forever</div>
      ) : block.type === 'STOP' ? (
        <div>stop all</div>
      ) : (
        <div className="flex items-center space-x-2">
          <span>{block.type.toLowerCase()}</span>
          <input
            type="number"
            value={inputValues[0]}
            onChange={(e) => handleInputChange(0, e.target.value)}
            className="w-16 p-1 border rounded"
          />
          <span>{block.type === 'MOVE' ? 'steps' : 'degrees'}</span>
        </div>
      )}
    </div>
  );
};

export default function MidArea({ spriteId, blocks, setBlocks, selectedSpriteType }) {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'block',
    drop: (item) => {
      if (item.spriteId === spriteId) return;
      setBlocks((prev) => ({
        ...prev,
        [spriteId]: [...(prev[spriteId] || []), { ...item, spriteId }],
      }));
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const moveBlock = (fromIndex, toIndex) => {
    setBlocks((prev) => {
      const newBlocks = [...(prev[spriteId] || [])];
      const [removed] = newBlocks.splice(fromIndex, 1);
      newBlocks.splice(toIndex, 0, removed);
      return {
        ...prev,
        [spriteId]: newBlocks,
      };
    });
  };

  const renderSelectedSprite = () => {
    if (!selectedSpriteType) return null;

    const spriteProps = {
      x: 0,
      y: 0,
      rotation: 0,
      scale: 1.5,
      isSelected: false
    };

    switch (selectedSpriteType) {
      case 'robot':
        return <RobotSprite {...spriteProps} />;
      case 'dog':
        return <DogSprite {...spriteProps} />;
      case 'alien':
        return <AlienSprite {...spriteProps} />;
      case 'cat':
        return <CatSprite {...spriteProps} />;
      case 'bear':
        return <BearSprite {...spriteProps} />;
      case 'ball':
        return <BallSprite {...spriteProps} />;
      default:
        return null;
    }
  };

  return (
    <div
      ref={drop}
      className={`flex-1 p-4 overflow-y-auto relative ${isOver ? 'bg-gray-100' : ''}`}
    >
      {/* Transparent sprite indicator */}
      {selectedSpriteType && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-40 pointer-events-none z-10">
          {renderSelectedSprite()}
        </div>
      )}

      {/* Existing blocks */}
      {(blocks[spriteId] || []).map((block, index) => (
        <BlockDisplay
          key={`${block.type}-${index}`}
          block={block}
          onUpdate={(updatedBlock) => {
            setBlocks((prev) => {
              const newBlocks = [...(prev[spriteId] || [])];
              newBlocks[index] = updatedBlock;
              return {
                ...prev,
                [spriteId]: newBlocks,
              };
            });
          }}
          spriteId={spriteId}
          index={index}
          moveBlock={moveBlock}
        />
      ))}
    </div>
  );
}