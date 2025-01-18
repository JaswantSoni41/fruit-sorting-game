// components/Draggable.js
"use client"
import React from "react";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

const Draggable = ({ id, label }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });
  const style = {
    transform: CSS.Translate.toString(transform),
    touchAction: "none", // Ensure touch events work properly
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="cursor-pointer p-4 bg-gray-600 rounded shadow-md m-2"
    >
      {label}
    </div>
  );
};

export default Draggable;