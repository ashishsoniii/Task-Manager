import React, { useState } from "react";
import axios from "axios";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {
  Button,
  TextField,
  MenuItem,
  FormControl,
  Select,
} from "@mui/material";

const AddTaskDialog = ({ toggleModal,setDataRefresh }) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    priority: "Low",
    dueDate: Date,
    status: "Pending",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleClose = () => {
    setOpen(false);
    toggleModal(); // Close modal
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3001/task/tasks",
        formData
      );
      setDataRefresh(false);
      console.log("Task added successfully:", response.data);
      handleClose(); // Close modal after successful submission
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  return (
    <div>
      <div className="relative">
        <button
          type="button"
          className="absolute top-0 right-0 text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mt-2"
          onClick={() => setOpen(true)}
        >
          Add New Task
        </button>
      </div>

      <Dialog open={open} onClose={handleClose}>
        <form onSubmit={handleSubmit}>
          <DialogTitle>Add New Task</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please fill out the following details to add a new task:
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              name="name"
              label="Name"
              type="text"
              fullWidth
              required
              value={formData.name}
              onChange={handleChange}
            />
            <TextField
              autoFocus
              margin="dense"
              id="description"
              name="description"
              label="Description"
              type="text"
              fullWidth
              required
              value={formData.description}
              onChange={handleChange}
            />
            <FormControl fullWidth margin="dense">
              <div>Priority</div>
              <Select
                labelId="priority-label"
                id="priority"
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                required
              >
                <MenuItem value="Low">Low</MenuItem>
                <MenuItem value="Medium">Medium</MenuItem>
                <MenuItem value="High">High</MenuItem>
              </Select>
            </FormControl>
            <TextField
              margin="dense"
              id="dueDate"
              name="dueDate"
              label="Due Date"
              type="date"
              fullWidth
              required
              value={formData.dueDate}
              onChange={handleChange}
            />
            <FormControl fullWidth margin="dense">
              <div>Status</div>
              <Select
                labelId="status-label"
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                required
              >
                <MenuItem value="Pending">Pending</MenuItem>
                <MenuItem value="Completed">Completed</MenuItem>
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Add Task</Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

export default AddTaskDialog;
