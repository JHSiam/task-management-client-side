import React, { useState } from "react";
import { useDrag } from "react-dnd";
import { FaClock, FaTasks, FaEdit, FaTrash } from "react-icons/fa";
import { MdOutlineCategory } from "react-icons/md";
import { format } from "date-fns";

export default function TaskCard({ task, onUpdate, onDelete }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "TASK",
    item: { id: task._id, category: task.category },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({ ...task });

  // Handle Input Changes
  const handleChange = (e) => {
    setEditedTask({ ...editedTask, [e.target.name]: e.target.value });
  };

  // Submit Edited Task
  const handleUpdate = () => {
    onUpdate(editedTask);
    setIsEditing(false);
  };

  return (
    <>
      <div
        ref={drag}
        className={`card bg-white shadow-lg p-4 border rounded-lg cursor-pointer transition-all ${
          isDragging ? "opacity-50" : "opacity-100"
        }`}
      >
        <div className="card-body p-3 space-y-2">
          {/* Task Title */}
          <h3 className="card-title text-lg font-bold flex items-center gap-2">
            <FaTasks className="text-primary" />
            {task.title}
          </h3>

          {/* Task Description */}
          <p className="text-sm text-gray-600">{task.description}</p>

          {/* Category & Timestamp */}
          <div className="flex justify-between items-center text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <MdOutlineCategory className="text-secondary" />
              <span className="badge badge-outline">{task.category}</span>
            </div>
            <div className="flex items-center gap-1">
              <FaClock className="text-accent" />
              <span>{format(new Date(task.timestamp), "PPpp")}</span>
            </div>
          </div>

          {/* Edit & Delete Buttons */}
          <div className="flex justify-end gap-2 mt-2">
            <button
              className="btn btn-sm btn-outline btn-primary flex items-center gap-1"
              onClick={() => setIsEditing(true)}
            >
              <FaEdit /> Edit
            </button>
            <button
              className="btn btn-sm btn-outline btn-error flex items-center gap-1"
              onClick={() => onDelete(task._id)}
            >
              <FaTrash /> Delete
            </button>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {isEditing && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-3">Edit Task</h2>

            <label className="block mb-2">Title:</label>
            <input
              type="text"
              name="title"
              value={editedTask.title}
              onChange={handleChange}
              className="input input-bordered w-full mb-3"
            />

            <label className="block mb-2">Description:</label>
            <textarea
              name="description"
              value={editedTask.description}
              onChange={handleChange}
              className="textarea textarea-bordered w-full mb-3"
            />

            <label className="block mb-2">Category:</label>
            <select
              name="category"
              value={editedTask.category}
              onChange={handleChange}
              className="select select-bordered w-full mb-3"
            >
              <option value="To-Do">To-Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>

            <div className="flex justify-end gap-2">
              <button className="btn btn-outline" onClick={() => setIsEditing(false)}>
                Cancel
              </button>
              <button className="btn btn-primary" onClick={handleUpdate}>
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
