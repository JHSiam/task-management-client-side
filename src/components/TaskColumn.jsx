import React from "react";
import { useDrop } from "react-dnd";
import TaskCard from "./TaskCard";

export default function TaskColumn({ category, tasks, updateTaskCategory, onUpdate, onDelete }) {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "TASK",
    drop: (item) => updateTaskCategory(item.id, category),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      className={`p-4 rounded-lg min-h-[300px] border-2 ${
        isOver ? "bg-gray-200" : "bg-gray-100"
      }`}
    >
      <h2 className="text-xl font-bold mb-4 text-center text-purple-400">{category}</h2>
      {tasks.map((task) => (
        <TaskCard key={task._id} task={task} onUpdate={onUpdate} onDelete={onDelete}/>
      ))}
    </div>
  );
}
