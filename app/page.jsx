// pages/index.js
"use client";
import React, { useState, useEffect } from "react";
import { DndContext } from "@dnd-kit/core";
import Draggable from "@/components/DraggableItem";
import Droppable from "@/components/DroppableContainer";
import { GrPowerReset } from "react-icons/gr";

const initialItems = [
  { id: "apple", type: "fruit", label: "🍎 Apple" },
  { id: "carrot", type: "vegetable", label: "🥕 Carrot" },
  { id: "banana", type: "fruit", label: "🍌 Banana" },
  { id: "broccoli", type: "vegetable", label: "🥦 Broccoli" },
  { id: "grapes", type: "fruit", label: "🍇 Grapes" },
  { id: "potato", type: "vegetable", label: "🥔 Potato" },
  { id: "watermelon", type: "fruit", label: "🍉 Watermelon" },
  { id: "lettuce", type: "vegetable", label: "🥬 Lettuce" },
  { id: "cherry", type: "fruit", label: "🍒 Cherry" },
  { id: "onion", type: "vegetable", label: "🧅 Onion" },
];

const Game = () => {
  const [items, setItems] = useState(initialItems);
  const [fruits, setFruits] = useState([]);
  const [vegetables, setVegetables] = useState([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true); // Ensure client-only rendering of DnD context
  }, []);

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over) {
      return;
    }

    const draggedItem = items.find((item) => item.id === active.id);

    if (draggedItem) {
      if (over.id === "fruit-container" && draggedItem.type === "fruit") {
        setFruits((prev) => [...prev, draggedItem]);
        setItems((prev) => prev.filter((item) => item.id !== active.id));
      } else if (over.id === "vegetable-container" && draggedItem.type === "vegetable") {
        setVegetables((prev) => [...prev, draggedItem]);
        setItems((prev) => prev.filter((item) => item.id !== active.id));
      } else {
        // Return the item to its original position
        setItems((prev) => prev);
      }
    }
  };

  const resetGame = () => {
    setItems(initialItems);
    setFruits([]);
    setVegetables([]);
  };

  const isGameComplete = items.length === 0 && fruits.length + vegetables.length === initialItems.length;

  if (!isMounted) {
    // Render empty content during server-side rendering
    return null;
  }

  return (
    <main className="w-full md:h-[calc(100vh_-_3.75rem)]">
      <DndContext onDragEnd={handleDragEnd}>
        <div className="flex flex-col items-center p-6 bg-black text-white min-h-screen md:flex md:justify-center md:items-center">
          <h1 className="text-2xl font-bold mb-6 text-center">Fruit & Vegetable Sorting Game</h1>

          {isGameComplete ? (
            <div className="text-center text-green-500 text-2xl font-bold flex flex-col items-center gap-2 w-full h-[calc(100vh_-_3.75rem)] justify-center">
              <span>You completed this game! 🎉</span>
              <div className="reset-button flex w-full items-center px-4 justify-center">
            <button
              onClick={resetGame}
              className="px-4 py-2 bg-blue-500 text-white font-semibold rounded shadow-md hover:bg-blue-600 flex justify-center items-center gap-3 z-[2]"
            >
              <GrPowerReset />
              <span>Reset Game</span>
            </button>
          </div>
            </div>
          ) : (
            <>
              <div className="flex flex-col md:flex-row justify-center gap-6 w-full max-w-4xl relative -z-2 mb-8">
                <Droppable id="fruit-container" label="Fruits">
                  {fruits.map((item) => (
                    <div
                      key={item.id}
                      className="p-2 bg-green-400 text-white rounded shadow-md my-1"
                    >
                      {item.label}
                    </div>
                  ))}
                </Droppable>
                <Droppable id="vegetable-container" label="Vegetables">
                  {vegetables.map((item) => (
                    <div
                      key={item.id}
                      className="p-2 bg-orange-300 rounded shadow-md my-1"
                    >
                      {item.label}
                    </div>
                  ))}
                </Droppable>
              </div>
              <div className="mb-4 flex flex-wrap justify-center">
                {items.map((item) => (
                  <Draggable key={item.id} id={item.id} label={item.label} />
                ))}
              </div>
            </>
          )}

          <div className="reset-button fixed bottom-16 right-1 sm:static flex w-full items-center justify-end px-4 sm:justify-center">
            <button
              onClick={resetGame}
              className="md:mt-6 px-4 py-2 bg-blue-500 text-white font-semibold rounded shadow-md hover:bg-blue-600 flex justify-center items-center gap-3 z-[1]"
            >
              <GrPowerReset />
              <span className="hidden sm:inline-block">Reset Game</span>
            </button>
          </div>
        </div>
      </DndContext>
    </main>
  );
};

export default Game;

