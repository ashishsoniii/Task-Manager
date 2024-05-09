import React, { useEffect, useState } from "react";
import axios from "axios";
import TaskCard from "./TaskCard";
import AddTaskDialog from "./AddTaskDialog";
import Modal from "react-modal";

Modal.setAppElement("#root"); // Set the root element for accessibility

const Tasks = () => {
  const [selectedButton, setSelectedButton] = useState("All");
  const [textData, setTaskData] = useState([]);
  const [error, setError] = useState(null);
  const [dataRefresh, setDataRefresh] = useState(null);

  const handleButtonClick = (category) => {
    setSelectedButton(category);
  };

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3001/task/tasks");
      console.log(response.data);
      setTaskData(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      setError("Error fetching tasks. Please try again later.");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchData();
  }, [dataRefresh]);

  const renderTasksByPriority = () => {
    if (selectedButton === "All") {
      const allTasks = [
        ...(textData["High"] || []),
        ...(textData["Medium"] || []),
        ...(textData["Low"] || []),
      ];
      return allTasks;
    } else {
      return textData[selectedButton] || [];
    }
  };

  return (
    <div>
      <div>
        <AddTaskDialog fetchData={fetchData} setDataRefresh={setDataRefresh} />
      </div>

      <div className="flex items-center justify-center py-4  md:py-8 flex-wrap">
        {/* Buttons for each priority */}
        <button
          type="button"
          className={`text-gray-900 border border-white hover:border-gray-200 dark:border-gray-900 dark:bg-gray-900 dark:hover:border-gray-700 bg-white focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-full text-base font-medium px-5 py-2.5 text-center me-3 mb-3 dark:text-white dark:focus:ring-gray-800 ${
            selectedButton === "priority" ? "bg-gray-900 text-white" : ""
          }`}
          onClick={() => handleButtonClick("All")}
        >
          All
        </button>
        {Object.keys(textData).map((priority) => (
          <button
            key={priority}
            type="button"
            className={`text-gray-900 border border-white hover:border-gray-200 dark:border-gray-900 dark:bg-gray-900 dark:hover:border-gray-700 bg-white focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-full text-base font-medium px-5 py-2.5 text-center me-3 mb-3 dark:text-white dark:focus:ring-gray-800 ${
              selectedButton === priority ? "bg-gray-900 text-white" : ""
            }`}
            onClick={() => handleButtonClick(priority)}
          >
            {priority} Priority
          </button>
        ))}
        {/* <AddTaskDialog fetchData={fetchData} setDataRefresh={setDataRefresh} /> */}

      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {/* Display Task cards or error message */}
        {error ? (
          <div className="text-red-500 text-center">{error}</div>
        ) : renderTasksByPriority().length > 0 ? (
          renderTasksByPriority().map((task) => (
            <TaskCard key={task._id} task={task} />
          ))
        ) : (
          <div className="text-gray-500 text-center">
            No tasks available. Add a new task.
          </div>
        )}
      </div>
    </div>
  );
};

export default Tasks;
