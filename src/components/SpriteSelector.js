import React from 'react';
import { useDrag } from 'react-dnd';

const SPRITE_OPTIONS = [
  { id: 'cat', name: 'Cat', component: 'CatSprite', description: 'The original animated cat', emoji: '🐱' },
  { id: 'dog', name: 'Dog', component: 'DogSprite', description: 'A friendly animated dog', emoji: '🐶' },
  { id: 'robot', name: 'Robot', component: 'RobotSprite', description: 'A cool animated robot', emoji: '🤖' },
  { id: 'alien', name: 'Alien', component: 'AlienSprite', description: 'A mysterious animated alien', emoji: '👽' },
  { id: 'bear', name: 'Bear', component: 'BearSprite', description: 'A friendly animated bear', emoji: '🐻' },
  { id: 'ball', name: 'Ball', component: 'BallSprite', description: 'A bouncy ball', emoji: '⚽' },
];

function SpriteItem({ sprite, onSelect }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'sprite',
    item: {
      type: sprite.id,
      fromPalette: true,
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const handleClick = () => {
    onSelect(sprite.id); // Call onSelect with the sprite type
  };

  return (
    <div
      ref={drag}
      onClick={handleClick} // Add click handler to select sprite
      className={`flex flex-col items-center p-4 border rounded-lg hover:bg-gray-50 transition-colors cursor-move ${isDragging ? 'opacity-50' : ''}`}
    >
      <div className="w-16 h-16 mb-2 flex items-center justify-center">
        {sprite.id === 'cat' ? (
          <div className="w-16 h-16 bg-blue-200 rounded-full flex items-center justify-center">
            <span className="text-2xl">{sprite.emoji}</span>
          </div>
        ) : sprite.id === 'dog' ? (
          <div className="w-16 h-16 bg-yellow-200 rounded-full flex items-center justify-center">
            <span className="text-2xl">{sprite.emoji}</span>
          </div>
        ) : sprite.id === 'robot' ? (
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
            <span className="text-2xl">{sprite.emoji}</span>
          </div>
        ) : sprite.id === 'alien' ? (
          <div className="w-16 h-16 bg-green-200 rounded-full flex items-center justify-center">
            <span className="text-2xl">{sprite.emoji}</span>
          </div>
        ) : (
          <div className="w-16 h-16 bg-green-200 rounded-full flex items-center justify-center">
            <span className="text-2xl">{sprite.emoji}</span>
          </div>
        )}
      </div>
      <span className="font-medium">{sprite.name}</span>
      <span className="text-sm text-gray-500">{sprite.description}</span>
    </div>
  );
}

export default function SpriteSelector({ onClose, onSelect }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Choose a Sprite</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">✕</button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {SPRITE_OPTIONS.map((sprite) => (
            <SpriteItem key={sprite.id} sprite={sprite} onSelect={onSelect} />
          ))}
        </div>
      </div>
    </div>
  );
}