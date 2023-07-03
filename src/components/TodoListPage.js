import React, { useEffect, useState } from "react";
import {
  Button,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import TodoModal from "./TodoModal";
import ArchiveModal from "./ArchiveModal";
import axios from "axios";
import { Link } from "react-router-dom";

const TodoListPage = () => {
  const [todos, setTodos] = useState([
    {
      id: 1,
      title: "Learn React",
      description: "Study React documentation",
      checked: false,
      archived: false,
    },
  ]);
  const [archivedTodos, setArchivedTodos] = useState([]);
  const [openArchivedTodo, setOpenArchivedTodo] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        getWeatherData(latitude, longitude);
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);

  const getWeatherData = (lat, lon) => {
    const API_KEY = "88054119f917552dff57e4160290e064";
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`;

    axios
      .get(apiUrl)
      .then((response) => {
        const weatherData = response.data;
        setWeatherData(weatherData);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleOpenModal = (todo) => {
    setSelectedTodo(todo);
  };

  const handleTodoClick = (todo) => {
    handleOpenModal(todo);
  };

  const handleDeleteTodo = (todoId) => {
    const updatedTodos = todos.filter((todo) => todo.id !== todoId);
    setTodos(updatedTodos);
  };

  const handleAddTodo = () => {
    const newTodo = {
      id: todos.length + 1,
      title: "New Todo",
      description: "",
      checked: false,
    };
    setTodos([...todos, newTodo]);
  };

  const unarchiveTodo = (todo) => {
    const updatedTodos = archivedTodos.filter(
      (archivedTodo) => archivedTodo.id !== todo.id
    );
    setArchivedTodos(updatedTodos);

    setTodos((prevTodos) => [
      ...prevTodos,
      {
        ...todo,
        archived: false,
      },
    ]);
  };

  const handleOpenArchiveModal = () => {
    setOpenArchivedTodo(true);
  };

  const handleCloseArchiveModal = () => {
    setOpenArchivedTodo(false);
  };

  return (
    <div>
      <Button
        onClick={handleOpenArchiveModal}
        variant="contained"
        color="primary"
      >
        Archived
      </Button>
      <Typography variant="h4">Todo List</Typography>
      {todos.length > 0 ? (
        <List>
          {todos.map((todo) => (
            <ListItem
              key={todo.id}
              button
              onClick={() => handleTodoClick(todo)}
            >
              <ListItemText primary={todo.title} />
              <Button
                onClick={() => handleDeleteTodo(todo.id)}
                variant="outlined"
                color="error"
              >
                Delete
              </Button>
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography variant="body1">No todos found.</Typography>
      )}
      <Button onClick={handleAddTodo} variant="contained" color="primary">
        Add Todo
      </Button>
      <TodoModal
        todo={selectedTodo}
        setTodos={setTodos}
        onClose={() => setSelectedTodo(null)}
        archivedTodos={archivedTodos}
        setOpenArchivedTodo={setOpenArchivedTodo}
        setArchivedTodos={setArchivedTodos}
      />
      {weatherData && (
        <Link to={"/weather"}>
          <h2>Current weather: {weatherData.main.temp}</h2>
        </Link>
      )}
      {openArchivedTodo && (
        <ArchiveModal
          archivedTodos={archivedTodos}
          unarchiveTodo={unarchiveTodo}
          onClose={handleCloseArchiveModal}
        />
      )}
    </div>
  );
};

export default TodoListPage;
