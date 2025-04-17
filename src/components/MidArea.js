import React, { useState } from 'react';
import { useDrop, useDrag } from 'react-dnd';

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

const BlockDisplay = ({ block, onUpdate, spriteId }) => {
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
    item: { ...block, spriteId },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
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
      ref={drag}
      className={`p-2 mb-2 rounded cursor-move ${isDragging ? 'opacity-50' : ''}`}
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

export default function MidArea({ spriteId, blocks, setBlocks }) {
  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: 'block',
    drop: (item) => {
      if (item.spriteId === spriteId) {
        return;
      }

      setBlocks((prev) => {
        const currentBlocks = prev[spriteId] || [];

        const newBlock = {
          ...item,
          id: item.id || Date.now(),
          spriteId: spriteId,
          value: item.value || (item.type === 'GOTO' ? { x: 0, y: 0 } : item.value),
        };

        if (item.spriteId && item.id) {
          prev[item.spriteId] = prev[item.spriteId].filter(block => block.id !== item.id);
        }

        const updatedBlocks = {
          ...prev,
          [spriteId]: [...currentBlocks, newBlock]
        };
        return updatedBlocks;
      });
    },
    canDrop: (item) => !item.spriteId || item.spriteId !== spriteId,
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  }));

  const updateBlock = (updatedBlock) => {
    setBlocks((prev) => ({
      ...prev,
      [spriteId]: prev[spriteId].map((block) =>
        block.id === updatedBlock.id ? updatedBlock : block
      ),
    }));
  };

  return (
    <div
      ref={drop}
      className={`flex-1 h-full overflow-auto p-4 ${isOver && canDrop ? 'bg-blue-100' : 'bg-white'}`}
    >
      {blocks[spriteId]?.map((block) => (
        <BlockDisplay
          key={block.id}
          block={block}
          onUpdate={updateBlock}
          spriteId={spriteId}
        />
      ))}
    </div>
  );
}