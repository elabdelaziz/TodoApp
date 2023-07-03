import React, { useState } from "react";
import { ListItem, ListItemText, Checkbox } from "@mui/material";

const TodoItem = ({ todo }) => {
  const [checked, setChecked] = useState(todo.checked);

  const handleCheckboxChange = () => {
    setChecked(!checked);
  };

  const handleTodoClick = () => {
    console.log("Todo clicked:", todo);
  };

  return (
    <ListItem button onClick={handleTodoClick}>
      <Checkbox checked={checked} onChange={handleCheckboxChange} />
      <ListItemText primary={todo.title} secondary={todo.description} />
    </ListItem>
  );
};

export default TodoItem;
