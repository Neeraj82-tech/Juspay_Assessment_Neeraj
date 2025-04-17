import React, { useState, useEffect, useCallback, useRef } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Sidebar from './components/Sidebar';
import MidArea from './components/MidArea';
import PreviewArea from './components/PreviewArea';
import SpriteSelector from './components/SpriteSelector';
import Icon from './components/Icon';

export default function App() {
  const [nextId, setNextId] = useState(2); // Start from 2 since initial sprite is 1
  const [sprites, setSprites] = useState([
    { id: 1, x: 0, y: 0, type: 'cat', dx: 1, dy: 0, rotation: 0, visible: true, size: 100 },
  ]);
  const [blocks, setBlocks] = useState({ 1: [] });
  const [activeSprite, setActiveSprite] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [animationTimeout, setAnimationTimeout] = useState(null);
  const [completedSprites, setCompletedSprites] = useState(new Set());
  const [showSpriteSelector, setShowSpriteSelector] = useState(false);
  const [pressedKeys, setPressedKeys] = useState(new Set());
  const [flagClicked, setFlagClicked] = useState(false);
  const [clickedSpriteId, setClickedSpriteId] = useState(null);
  const [selectedSpriteType, setSelectedSpriteType] = useState('cat');

  // Add ref to track current block values
  const currentBlockValues = useRef({});

  // Update the ref when blocks change
  useEffect(() => {
    currentBlockValues.current = blocks;
  }, [blocks]);

  // Update selectedSpriteType when activeSprite changes
  useEffect(() => {
    const activeSpriteData = sprites.find(sprite => sprite.id === activeSprite);
    if (activeSpriteData) {
      setSelectedSpriteType(activeSpriteData.type);
    }
  }, [activeSprite, sprites]);

  // Handle key press events
  useEffect(() => {
    const handleKeyDown = (e) => {
      setPressedKeys(prev => new Set([...prev, e.key.toLowerCase()]));
    };

    const handleKeyUp = (e) => {
      setPressedKeys(prev => {
        const newSet = new Set(prev);
        newSet.delete(e.key.toLowerCase());
        return newSet;
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // Handle sprite click events
  const handleSpriteClick = useCallback((spriteId) => {
    setClickedSpriteId(spriteId);
    // Reset after a short delay
    setTimeout(() => setClickedSpriteId(null), 100);
  }, []);

  // Handle flag click
  const handleFlagClick = useCallback(() => {
    setFlagClicked(true);
    // Reset after a short delay
    setTimeout(() => setFlagClicked(false), 100);
  }, []);

  const addSprite = () => {
    setShowSpriteSelector(true);
  };

  const handleSpriteSelect = (spriteType) => {
    const newId = nextId;
    const newSprite = {
      id: newId,
      x: 0,
      y: 0,
      type: spriteType,
      dx: 1,
      dy: 0,
      rotation: 0,
      visible: true,
      size: 100,
    };

    setSprites((prev) => [...prev, newSprite]);
    setActiveSprite(newId);
    setBlocks((prev) => ({
      ...prev,
      [newId]: [],
    }));
    setNextId((prevId) => prevId + 1);
    setShowSpriteSelector(false);
    setSelectedSpriteType(spriteType);
  };

  const checkCollision = (sprite1, sprite2) => {
    const sprite1Width = 50;
    const sprite1Height = 50;
    const sprite2Width = 50;
    const sprite2Height = 50;

    return (
      sprite1.x < sprite2.x + sprite2Width &&
      sprite1.x + sprite1Width > sprite2.x &&
      sprite1.y < sprite2.y + sprite2Height &&
      sprite1.y + sprite1Height > sprite2.y
    );
  };

  const executeBlock = useCallback(
    async (block, sprite, sprites, setSprites, currentBlockIndex, setCurrentBlockIndex, onComplete) => {
      console.log(`[DEBUG] Executing block ${block.type} for sprite ${sprite.id}`);

      switch (block.type) {
        case 'MOVE':
          setSprites((prevSprites) => {
            let updatedSprites = prevSprites.map((s) => {
              if (s.id === sprite.id) {
                const currentBlocks = currentBlockValues.current[sprite.id] || [];
                const currentMoveBlock = currentBlocks.find((b) => b.type === 'MOVE');
                const moveValue = currentMoveBlock ? currentMoveBlock.value : block.value ?? 10;
                const dx = s.dx ?? 1;
                const dy = s.dy ?? 0;
                const newX = s.x + dx * moveValue;
                const newY = s.y + dy * moveValue;
                return { ...s, x: newX, y: newY };
              }
              return s;
            });

            for (let i = 0; i < updatedSprites.length; i++) {
              for (let j = i + 1; j < updatedSprites.length; j++) {
                const spriteA = updatedSprites[i];
                const spriteB = updatedSprites[j];
                if (checkCollision(spriteA, spriteB)) {
                  const dx = spriteA.x - spriteB.x;
                  const dy = spriteA.y - spriteB.y;
                  const distance = Math.sqrt(dx * dx + dy * dy) || 1;
                  const separation = 10;

                  updatedSprites[i] = {
                    ...spriteA,
                    dx: -(spriteA.dx ?? 1),
                    dy: -(spriteA.dy ?? 0),
                    x: spriteA.x + (separation * dx) / distance,
                    y: spriteA.y + (separation * dy) / distance,
                  };
                  updatedSprites[j] = {
                    ...spriteB,
                    dx: -(spriteB.dx ?? 1),
                    dy: -(spriteB.dy ?? 0),
                    x: spriteB.x - (separation * dx) / distance,
                    y: spriteB.y - (separation * dy) / distance,
                  };
                }
              }
            }
            return updatedSprites;
          });
          break;
        case 'TURN':
          setSprites((prevSprites) => {
            return prevSprites.map((s) => {
              if (s.id === sprite.id) {
                const currentBlocks = currentBlockValues.current[sprite.id] || [];
                const currentTurnBlock = currentBlocks.find((b) => b.type === 'TURN');
                const turnValue = currentTurnBlock ? currentTurnBlock.value : block.value ?? 15;
                const newRotation = (s.rotation || 0) + turnValue;
                const angle = (newRotation * Math.PI) / 180;
                return {
                  ...s,
                  rotation: newRotation,
                  dx: Math.cos(angle),
                  dy: Math.sin(angle),
                };
              }
              return s;
            });
          });
          break;
        case 'GOTO':
          setSprites((prevSprites) => {
            return prevSprites.map((s) => {
              if (s.id === sprite.id) {
                const currentBlocks = currentBlockValues.current[sprite.id] || [];
                const currentGotoBlock = currentBlocks.find((b) => b.type === 'GOTO');
                const value = currentGotoBlock ? currentGotoBlock.value : block.value || { x: 0, y: 0 };
                const newX = typeof value === 'object' && value !== null && !isNaN(value.x) ? value.x : s.x;
                const newY = typeof value === 'object' && value !== null && !isNaN(value.y) ? value.y : s.y;
                return { ...s, x: newX, y: newY };
              }
              return s;
            });
          });
          break;
        case 'SAY':
          setSprites((prevSprites) => {
            return prevSprites.map((s) => {
              if (s.id === sprite.id) {
                const currentBlocks = currentBlockValues.current[sprite.id] || [];
                const currentSayBlock = currentBlocks.find((b) => b.type === 'SAY');
                const message = currentSayBlock ? currentSayBlock.value : block.value || 'Hello!';
                return { ...s, message, messageType: 'say' };
              }
              return s;
            });
          });
          break;
        case 'THINK':
          setSprites((prevSprites) => {
            return prevSprites.map((s) => {
              if (s.id === sprite.id) {
                const currentBlocks = currentBlockValues.current[sprite.id] || [];
                const currentThinkBlock = currentBlocks.find((b) => b.type === 'THINK');
                const message = currentThinkBlock ? currentThinkBlock.value : block.value || 'Hmm...';
                return { ...s, message, messageType: 'think' };
              }
              return s;
            });
          });
          break;
        case 'SHOW':
          setSprites((prevSprites) => {
            return prevSprites.map((s) => {
              if (s.id === sprite.id) {
                return { ...s, visible: true };
              }
              return s;
            });
          });
          break;
        case 'HIDE':
          setSprites((prevSprites) => {
            return prevSprites.map((s) => {
              if (s.id === sprite.id) {
                return { ...s, visible: false };
              }
              return s;
            });
          });
          break;
        case 'SIZE':
          setSprites((prevSprites) => {
            return prevSprites.map((s) => {
              if (s.id === sprite.id) {
                const currentBlocks = currentBlockValues.current[sprite.id] || [];
                const currentSizeBlock = currentBlocks.find((b) => b.type === 'SIZE');
                const sizeValue = currentSizeBlock ? currentSizeBlock.value : block.value || 100;
                return { ...s, size: sizeValue };
              }
              return s;
            });
          });
          break;
        case 'WAIT':
          const waitValue = block.value || 1;
          if (onComplete) {
            const timeout = setTimeout(() => {
              onComplete();
            }, waitValue * 1000);
            setAnimationTimeout(timeout);
          }
          return;
        case 'IF':
          if (block.value) {
            if (onComplete) onComplete();
          }
          return;
        case 'FOREVER':
          if (blocks[sprite.id]) {
            const executeForeverBlock = () => {
              let currentBlockIndex = 0;
              const executeNextInForever = () => {
                if (currentBlockIndex >= blocks[sprite.id].length) {
                  executeForeverBlock();
                  return;
                }

                const block = blocks[sprite.id][currentBlockIndex];
                if (block.type === 'FOREVER') {
                  currentBlockIndex++;
                  executeNextInForever();
                  return;
                }

                executeBlock(
                  block,
                  sprite,
                  sprites,
                  setSprites,
                  currentBlockIndex,
                  (newIndex) => {
                    currentBlockIndex = newIndex;
                  },
                  () => {
                    currentBlockIndex++;
                    executeNextInForever();
                  }
                );
              };
              executeNextInForever();
            };
            executeForeverBlock();
          }
          return;
        case 'DELETE_CLONE':
          setSprites((prevSprites) => {
            const newSprites = prevSprites.filter((s) => s.id !== sprite.id);
            // If this was the last sprite, stop playing
            if (newSprites.length === 0) {
              setIsPlaying(false);
              if (animationTimeout) {
                clearTimeout(animationTimeout);
                setAnimationTimeout(null);
              }
            }
            return newSprites;
          });
          setBlocks((prevBlocks) => {
            const newBlocks = { ...prevBlocks };
            delete newBlocks[sprite.id];
            return newBlocks;
          });
          return;
        case 'REPEAT':
          console.log(`Starting repeat block for sprite ${sprite.id} with value ${block.value}`);
          const repeatValue = block.value || 10;
          let repeatIndex = 0;

          const executeRepeatBlock = async () => {
            if (repeatIndex < repeatValue) {
              console.log(`Repeat iteration ${repeatIndex + 1} of ${repeatValue}`);
              const childBlocks = blocks[sprite.id]?.slice(currentBlockIndex + 1) || [];
              let childIndex = 0;

              const executeNextChildBlock = async () => {
                if (childIndex < childBlocks.length) {
                  const childBlock = childBlocks[childIndex];
                  if (childBlock.type === 'REPEAT') {
                    childIndex++;
                    await executeNextChildBlock();
                    return;
                  }

                  await new Promise((resolve) => {
                    executeBlock(
                      childBlock,
                      sprite,
                      sprites,
                      setSprites,
                      currentBlockIndex + childIndex + 1,
                      (newIndex) => {
                        childIndex = newIndex - (currentBlockIndex + 1);
                      },
                      () => {
                        childIndex++;
                        resolve();
                      }
                    );
                  });
                  await executeNextChildBlock();
                } else {
                  repeatIndex++;
                  if (repeatIndex < repeatValue) {
                    await executeRepeatBlock();
                  } else {
                    console.log(`Completed repeat block for sprite ${sprite.id}`);
                    onComplete();
                  }
                }
              };
              await executeNextChildBlock();
            } else {
              console.log(`Completed repeat block for sprite ${sprite.id}`);
              onComplete();
            }
          };
          await executeRepeatBlock();
          return;
        case 'WHEN_FLAG_CLICKED':
          if (flagClicked) {
            if (onComplete) onComplete();
          }
          return;
        case 'WHEN_SPRITE_CLICKED':
          if (clickedSpriteId === sprite.id) {
            if (onComplete) onComplete();
          }
          return;
        case 'WHEN_KEY_PRESSED':
          if (pressedKeys.has(block.value?.toLowerCase() || 'space')) {
            if (onComplete) onComplete();
          }
          return;
        default:
          console.log(`[DEBUG] Unhandled block type: ${block.type}`);
          if (onComplete) onComplete();
          return;
      }
      if (onComplete) {
        const timeout = setTimeout(() => {
          onComplete();
        }, 200);
        setAnimationTimeout(timeout);
      }
    },
    [flagClicked, clickedSpriteId, pressedKeys]
  );

  const playAnimations = useCallback(() => {
    if (isPlaying) return;

    if (animationTimeout) {
      clearTimeout(animationTimeout);
      setAnimationTimeout(null);
    }

    setIsPlaying(true);
    setCompletedSprites(new Set());

    const executeNextBlock = (spriteId, blockIndex) => {
      const sprite = sprites.find((s) => s.id === spriteId);
      if (!sprite) return;

      if (!blocks[spriteId] || blockIndex >= blocks[spriteId].length) {
        setCompletedSprites((prev) => {
          const newCompleted = new Set(prev);
          newCompleted.add(spriteId);
          if (newCompleted.size === sprites.length) {
            setIsPlaying(false);
            setAnimationTimeout(null);
          }
          return newCompleted;
        });
        return;
      }

      const block = blocks[spriteId][blockIndex];

      executeBlock(
        block,
        sprite,
        sprites,
        setSprites,
        blockIndex,
        (newIndex) => { },
        () => {
          executeNextBlock(spriteId, blockIndex + 1);
        }
      );
    };

    sprites.forEach((sprite) => {
      if (blocks[sprite.id] && blocks[sprite.id].length > 0) {
        executeNextBlock(sprite.id, 0);
      } else {
        setCompletedSprites((prev) => {
          const newCompleted = new Set(prev);
          newCompleted.add(sprite.id);
          if (newCompleted.size === sprites.length) {
            setIsPlaying(false);
            setAnimationTimeout(null);
          }
          return newCompleted;
        });
      }
    });
  }, [sprites, blocks, executeBlock, isPlaying, animationTimeout]);

  const handleRemoveBlock = useCallback((block) => {
    if (!block || !block.spriteId) return;

    setBlocks((prev) => {
      const newBlocks = { ...prev };
      if (newBlocks[block.spriteId]) {
        newBlocks[block.spriteId] = newBlocks[block.spriteId].filter(
          (_, index) => index !== block.index
        );
      }
      return newBlocks;
    });
  }, []);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="h-screen flex flex-col bg-blue-100">
        <div className="flex-1 flex flex-row p-4 gap-4">
          <div className="flex-1 flex flex-row bg-white rounded-xl overflow-hidden">
            <Sidebar
              addSprite={addSprite}
              sprites={sprites}
              activeSprite={activeSprite}
              setActiveSprite={setActiveSprite}
              onRemoveBlock={handleRemoveBlock}
            />
            <div className="flex flex-col flex-1">
              <button
                onClick={playAnimations}
                className="p-2 bg-green-500 text-white rounded m-2 self-start"
                disabled={isPlaying}
              >
                {isPlaying ? 'Playing...' : 'Play'}
              </button>
              <MidArea
                key={activeSprite}
                spriteId={activeSprite}
                blocks={blocks}
                setBlocks={setBlocks}
                selectedSpriteType={selectedSpriteType}
              />
            </div>
          </div>
          <div className="w-1/3 bg-white rounded-xl overflow-hidden">
            <PreviewArea
              sprites={sprites}
              setSprites={setSprites}
              blocks={blocks}
              setBlocks={setBlocks}
              setActiveSprite={setActiveSprite}
              onSpriteClick={handleSpriteClick}
            />
          </div>
        </div>
      </div>
      {showSpriteSelector && (
        <SpriteSelector
          onClose={() => setShowSpriteSelector(false)}
          onSelect={handleSpriteSelect}
        />
      )}
    </DndProvider>
  );
}