// components/Droppable.js

"use client"
import React from "react";
import { useDroppable } from "@dnd-kit/core";

const Droppable = ({ id, label, children }) => {
  const { isOver, setNodeRef } = useDroppable({ id });
  const style = {
    backgroundColor: isOver ? "#d1fadf" : "#f3f4f6",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="w-full bg-gradient-to-b from-[#9677FF] to-[#6B4AFD] text-white font-semibold md:w-1/2 p-4 border border-gray-300 rounded-lg flex flex-col items-center justify-center min-h-[200px]"
    >
      <p className="text-lg font-semibold mb-2">{label}</p>
      <div className="flex flex-wrap gap-x-2 gap-y-2 justify-center">
      {children}
      </div>
      
    </div>
  );
};

export default Droppable;
