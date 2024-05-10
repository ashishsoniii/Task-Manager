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
import editImg from "../../assets/edit.png";

const EditTaskDialog = ({ toggleModal, setDataRefresh, fetchData, task }) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: task.name,
    description: task.description,
    priority: task.priority,
    dueDate: task.dueDate
      ? new Date(task.dueDate).toISOString().split("T")[0]
      : "",
    status: task.status,
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
      const response = await axios.patch(
        `http://localhost:3001/task/tasks/${task._id}`,
        formData
      );
      alert("Task Updated successfully!");
      setFormData({
        name: "",
        description: "",
        priority: "Low",
        dueDate: Date, // Assuming dueDate should be reset to an empty string
        status: "Pending",
      });
      fetchData();
      handleClose(); // Close modal after successful submission
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  return (
    <div>
      <div className=" ">
        <button
          type="button"
          className="absolute top-2 right-2  hover:bg-blue-600 text-white px-4 py-1 rounded"
          onClick={() => setOpen(true)}
        >
          {/* Edit */}

          <img className="h-6" src={editImg} />
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
            <Button type="submit">Update Task</Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

export default EditTaskDialog;
