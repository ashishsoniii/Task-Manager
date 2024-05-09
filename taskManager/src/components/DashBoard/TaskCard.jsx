import React, { useState } from "react";
import axios from "axios";

const TaskCard = ({ task }) => {
  const [isPending, setIsPending] = useState(task.status === "Pending");

  const getStatusColor = () => {
    return task.status === "Completed" ? "text-green-500" : "text-red-500";
  };

  const handleStatusChange = async () => {
    const confirmAction = window.confirm(
      `Are you sure you want to mark this task as ${
        isPending ? "completed" : "pending"
      }?`
    );

    if (confirmAction) {
      try {
        const newStatus = isPending ? "Completed" : "Pending";
        await axios.patch(`http://localhost:3001/task/tasks/${task._id}`, {
          status: newStatus,
        });
        setIsPending(!isPending);
      } catch (error) {
        console.error("Error updating task status:", error);
      }
    }
  };

  return (
    <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {task.name}
      </h5>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        Priority: {task.priority}
      </p>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        Due Date: {task.dueDate}
      </p>
      <p className={`font-normal ${getStatusColor()} dark:text-gray-400`}>
        Status: {task.status}
      </p>
      <div className="flex items-center text-gray-400 space-x-2 mt-4">
        <input
          type="checkbox"
          id={`completed_${task.id}`}
          checked={!isPending}
          onChange={handleStatusChange}
        />
        <label htmlFor={`completed_${task.id}`}>
          {isPending ? "Mark as Complete" : "Mark as Pending"}
        </label>
      </div>
    </div>
  );
};

export default TaskCard;
