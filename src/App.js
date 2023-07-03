import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { createMuiTheme, ThemeProvider, CssBaseline } from "@mui/material";
import TodoListPage from "./components/TodoListPage";
import WeatherPage from "./components/WeatherPage";

const App = () => {
  const theme = createMuiTheme({
    palette: {
      type: "light",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <div>
          <header>
            <h1>Todo App</h1>
            {/* <ThemeToggle /> */}
          </header>
          <Routes>
            <Route exact path="/" element={<TodoListPage />} />
            <Route exact path="/weather" element={<WeatherPage />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;
