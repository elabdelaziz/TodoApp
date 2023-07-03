import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Checkbox,
  Button,
} from "@mui/material";

const EditTodoModal = ({ todo, onSave, onClose }) => {
  const [editedTodo, setEditedTodo] = useState({ ...todo });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedTodo((prevTodo) => ({
      ...prevTodo,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setEditedTodo((prevTodo) => ({
      ...prevTodo,
      [name]: checked,
    }));
  };

  const handleSave = () => {
    onSave(editedTodo);
  };

  return (
    <Dialog open={Boolean(todo)} onClose={onClose}>
      <DialogTitle>Edit Todo</DialogTitle>
      <DialogContent>
        <TextField
          name="title"
          label="Title"
          value={editedTodo.title}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="description"
          label="Description"
          value={editedTodo.description}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          multiline
          rows={4}
        />
        <Checkbox
          name="checked"
          checked={editedTodo.checked}
          onChange={handleCheckboxChange}
        />
        <Button onClick={handleSave} variant="contained" color="primary">
          Save
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default EditTodoModal;
