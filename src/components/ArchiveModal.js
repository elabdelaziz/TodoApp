import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Button,
} from "@mui/material";

const ArchiveModal = ({ archivedTodos, unarchiveTodo, onClose }) => {
  const handleUnarchive = (todo) => {
    unarchiveTodo(todo);
  };

  return (
    <Dialog open={Boolean(archivedTodos)} onClose={onClose}>
      <DialogTitle>Archived Todos</DialogTitle>
      <DialogContent>
        {archivedTodos.length > 0 ? (
          archivedTodos.map((todo) => (
            <div key={todo.id}>
              <Typography variant="h6">{todo.title}</Typography>
              <Typography>{`Description: ${todo.description}`}</Typography>
              <Button
                onClick={() => handleUnarchive(todo)}
                variant="contained"
                color="primary"
              >
                Unarchive
              </Button>
            </div>
          ))
        ) : (
          <Typography variant="body1">No archived todos found.</Typography>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ArchiveModal;
