import React, { useContext, useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import useAxiosPublic from "../hooks/useAxiosPublic";
import TaskColumn from "./TaskColumn";
import { AuthContext } from "../authentication/AuthProvider";
import Swal from "sweetalert2";

export default function TaskBoard() {
    const { user } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [authLoading, setAuthLoading] = useState(true);

    // Ensure user is fully loaded before making API call
    useEffect(() => {
        if (user) {
            setAuthLoading(false); // User is available
        }
    }, [user]);

    // Fetch tasks from database only when user is fully loaded
    useEffect(() => {
        if (!authLoading && user?.email) {
            setLoading(true);
            axiosPublic.get(`tasks/${user.email}`)
                .then((response) => {
                    setTasks(response.data);
                    setLoading(false);
                })
                .catch((error) => {
                    console.error("Error fetching tasks:", error);
                    setLoading(false);
                });
        }
    }, [authLoading, user?.email]);

    // Update task category in state & database
    const updateTaskCategory = async (taskId, newCategory) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task._id === taskId ? { ...task, category: newCategory } : task
            )
        );

        try {
            await axiosPublic.put(`/tasks/${taskId}`, { category: newCategory });
        } catch (error) {
            console.error("Failed to update task", error);
        }
    };


    // Update task
    const handleUpdate = async (updatedTask) => {
        try {
            await axiosPublic.put(`/edit-tasks/${updatedTask._id}`, updatedTask);
            setTasks((prev) =>
                prev.map((task) =>
                    task._id === updatedTask._id ? updatedTask : task
                )
            );

            // Show success alert
            Swal.fire({
                icon: "success",
                title: "Task Updated!",
                text: "Your task has been updated successfully.",
                timer: 1500,
                showConfirmButton: false,
            });

        } catch (error) {
            console.error("Update failed:", error);
        }
    };

    // Delete task
    const handleDelete = async (taskId) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axiosPublic.delete(`/tasks/${taskId}`);
                    setTasks((prev) => prev.filter((task) => task._id !== taskId));

                    // Show success message
                    Swal.fire({
                        icon: "success",
                        title: "Deleted!",
                        text: "Your task has been deleted.",
                        timer: 1500,
                        showConfirmButton: false,
                    });
                } catch (error) {
                    console.error("Delete failed:", error);
                }
            }
        });
    };

    return (
        <DndProvider backend={HTML5Backend}>
            {authLoading || loading ? (
                <div className="flex justify-center items-center min-h-screen">
                    <p className="text-lg font-semibold">You haven't added any tasks yet.</p>
                </div>
            ) : tasks.length === 0 ? (
                <div className="flex justify-center items-center min-h-screen">
                    <p className="text-lg font-semibold text-gray-500">You haven't added any tasks yet.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                    {["To-Do", "In Progress", "Done"].map((category) => (
                        <TaskColumn
                            key={category}
                            category={category}
                            tasks={tasks.filter((task) => task.category === category)}
                            updateTaskCategory={updateTaskCategory}
                            onUpdate={handleUpdate}
                            onDelete={handleDelete}
                        />
                    ))}
                </div>
            )}
        </DndProvider>
    );
}
