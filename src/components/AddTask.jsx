import React, { useContext, useState } from "react";
import useAxiosPublic from "../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import { AuthContext } from "../authentication/AuthProvider";

export default function AddTask() {
    const { user, loading } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();
    if(loading){
        return <div>loading.....</div>
    }

    const [task, setTask] = useState({
        title: "",
        description: "",
        category: "To-Do",
        email: user.email
    });

    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setTask((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate Title length
        if (!task.title || task.title.length > 50) {
            return Swal.fire("Error", "Title is required (max 50 characters)", "error");
        }
        // Validate Description length
        if (task.description.length > 200) {
            return Swal.fire("Error", "Description max 200 characters", "error");
        }

        // Add timestamp
        const newTask = {
            ...task,
            timestamp: new Date().toISOString(),
        };

        try {
            const response = await axiosPublic.post("/task", newTask);
            if (response.data.insertedId) {
                Swal.fire("Success", "Task added successfully!", "success");
                setTask({ title: "", description: "", category: "To-Do" }); // Reset form
            }
        } catch (error) {
            Swal.fire("Error", "Failed to add task!", "error");
        }
    };

    return (
        <div className="max-w-lg mx-auto bg-white p-6 shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Add New Task</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Title */}
                <div>
                    <label className="block font-medium">Title</label>
                    <input
                        type="text"
                        name="title"
                        value={task.title}
                        onChange={handleChange}
                        maxLength="50"
                        required
                        className="input input-bordered w-full"
                    />
                </div>

                {/* Description */}
                <div>
                    <label className="block font-medium">Description</label>
                    <textarea
                        name="description"
                        value={task.description}
                        onChange={handleChange}
                        maxLength="200"
                        className="textarea textarea-bordered w-full"
                    />
                </div>

                {/* Category */}
                <div>
                    <label className="block font-medium">Category</label>
                    <select
                        name="category"
                        value={task.category}
                        onChange={handleChange}
                        className="select select-bordered w-full"
                    >
                        <option>To-Do</option>
                        <option>In Progress</option>
                        <option>Done</option>
                    </select>
                </div>

                {/* Submit Button */}
                <button type="submit" className="btn btn-primary w-full">
                    Add Task
                </button>
            </form>
        </div>
    );
}
