import React, { useEffect, useRef, useState, useCallback, useLayoutEffect } from 'react';
import { useDrop } from 'react-dnd';
import CatSprite from './CatSprite';
import DogSprite from './DogSprite';
import RobotSprite from './RobotSprite';
import AlienSprite from './AlienSprite';
import BearSprite from './BearSprite';
import BallSprite from './BallSprite';

const SPRITE_COMPONENTS = {
  cat: CatSprite,
  dog: DogSprite,
  robot: RobotSprite,
  alien: AlienSprite,
  bear: BearSprite,
  ball: BallSprite,
};

const SPRITE_DIMENSIONS = {
  width: 95,
  height: 100,
};

export default function PreviewArea({
  sprites,
  setSprites,
  blocks,
  setBlocks,
  setActiveSprite,
  onSpriteClick
}) {
  const previewRef = useRef(null);
  const [center, setCenter] = useState({ x: 0, y: 0 });

  useLayoutEffect(() => {
    const updateCenter = () => {
      if (previewRef.current) {
        const rect = previewRef.current.getBoundingClientRect();
        const newCenter = {
          x: Math.floor(rect.width / 2),
          y: Math.floor(rect.height / 2),
        };
        setCenter(newCenter);
      }
    };

    updateCenter();
    window.addEventListener('resize', updateCenter);
    return () => window.removeEventListener('resize', updateCenter);
  }, []);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: ['block', 'sprite'],
    drop: (item, monitor) => {
      if (item.type === 'sprite' && item.fromPalette && !monitor.didDrop()) {
        const newSprite = {
          ...item,
          id: Date.now(),
          x: 0, // Center-relative (0, 0)
          y: 0,
          rotation: 0,
        };
        setSprites((prev) => [...prev, newSprite]);
      } else if (item.type === 'block' && !item.id) {
        const newId = Date.now();
        setBlocks((prev) => ({
          ...prev,
          [item.spriteId]: [...(prev[item.spriteId] || []), { ...item, id: newId }],
        }));
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const handleSpriteClick = useCallback((spriteId) => {
    setActiveSprite(spriteId);
  }, [setActiveSprite]);

  const moveSprite = useCallback((id, absX, absY) => {
    const relX = absX - center.x;
    const relY = absY - center.y;
    setSprites((prev) =>
      prev.map((sprite) => (sprite.id === id ? { ...sprite, x: relX, y: relY } : sprite))
    );
  }, [center.x, center.y, setSprites]);

  useEffect(() => {
  }, [sprites]);

  return (
    <div
      ref={drop}
      className={`flex-1 h-full overflow-hidden ${isOver ? 'bg-blue-100' : 'bg-white'}`}
    >
      <div
        ref={previewRef}
        className="relative w-full h-full"
        style={{ minWidth: '500px', minHeight: '500px' }}
      >
        {sprites.map((sprite) => {
          const SpriteComponent = SPRITE_COMPONENTS[sprite.type] || CatSprite;
          const absoluteX = center.x + sprite.x;
          const absoluteY = center.y + sprite.y;
          return (
            <DraggableSprite
              key={sprite.id}
              id={sprite.id}
              x={absoluteX}
              y={absoluteY}
              rotation={sprite.rotation}
              onMove={moveSprite}
              onClick={() => handleSpriteClick(sprite.id)}
              message={sprite.message}
              messageType={sprite.messageType}
              visible={sprite.visible !== false}
              size={sprite.size || 100}
            >
              <SpriteComponent rotation={sprite.rotation} />
            </DraggableSprite>
          );
        })}
      </div>
    </div>
  );
}

const DraggableSprite = ({ id, x, y, rotation, onMove, onClick, children, message, messageType, visible = true, size = 100 }) => {
  const spriteRef = useRef(null);

  const handleMouseDown = (e) => {
    e.stopPropagation();
    const startX = e.clientX;
    const startY = e.clientY;

    const handleMouseMove = (e) => {
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;
      onMove(id, x + dx, y + dy);
    };

    const handleMouseUp = () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  if (!visible) return null;

  return (
    <div
      ref={spriteRef}
      onMouseDown={handleMouseDown}
      onClick={onClick}
      className="absolute cursor-move"
      style={{
        left: `${x}px`,
        top: `${y}px`,
        transform: `rotate(${rotation}deg) scale(${size / 100})`,
        transition: 'all 0.1s ease-in-out',
      }}
    >
      {children}
      {message && (
        <div
          className={`absolute -top-20 left-1/2 transform -translate-x-1/2 p-2 rounded-lg text-white whitespace-nowrap ${messageType === 'say' ? 'bg-blue-500' : 'bg-gray-500'
            }`}
        >
          {message}
          <div
            className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0 border-8 border-transparent ${messageType === 'say' ? 'border-t-blue-500' : 'border-t-gray-500'
              }`}
          />
        </div>
      )}
    </div>
  );
};