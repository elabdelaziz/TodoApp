import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Button,
} from "@mui/material";
import EditTodoModal from "./EditTodoModal";

const TodoModal = ({
  todo,
  setTodos,
  archivedTodos,
  setArchivedTodos,
  onClose,
}) => {
  const [isEditModalOpen, setEditModalOpen] = useState(false);

  const handleOpenEditModal = () => {
    setEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setEditModalOpen(false);
  };

  const handleSaveEditedTodo = (editedTodo) => {
    setTodos((prevTodos) => {
      const updatedTodos = prevTodos.map((t) =>
        t.id === editedTodo.id ? editedTodo : t
      );
      return updatedTodos;
    });
    onClose();
  };

  const handleArchive = () => {
    setTodos((prevTodos) => {
      const updatedTodos = prevTodos.map((t) =>
        t.id === todo.id ? { ...t, archived: true } : t
      );
      const archivedItem = updatedTodos.find((t) => t.id === todo.id);

      const isArchivedItemExists = archivedTodos.some(
        (t) => t.id === archivedItem.id
      );

      if (!isArchivedItemExists) {
        setArchivedTodos((prevArchivedTodos) => [
          ...prevArchivedTodos,
          archivedItem,
        ]);
      }

      return updatedTodos.filter((t) => !t.archived);
    });
    onClose();
  };

  const handleSave = (editedTodo) => {
    handleSaveEditedTodo(editedTodo);
  };

  return (
    <Dialog open={Boolean(todo)} onClose={onClose}>
      {todo && (
        <>
          <DialogTitle>{todo.title}</DialogTitle>
          <DialogContent>
            <Typography>{`Description: ${todo.description}`}</Typography>
            <Typography variant="body1">
              Checked: {todo.checked ? "Yes" : "No"}
            </Typography>
            <Button
              onClick={handleOpenEditModal}
              variant="contained"
              color="primary"
            >
              Edit Todo
            </Button>
            <Button
              onClick={handleArchive}
              variant="contained"
              color="secondary"
            >
              Archive Todo
            </Button>
          </DialogContent>
        </>
      )}
      {isEditModalOpen && (
        <EditTodoModal
          todo={todo}
          setTodos={setTodos}
          onSave={handleSave}
          onClose={handleCloseEditModal}
          isOpen={isEditModalOpen}
        />
      )}
    </Dialog>
  );
};

export default TodoModal;
