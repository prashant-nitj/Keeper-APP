import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { NotesContextProvider, ThemeProvider } from "./context";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <ThemeProvider>
        <NotesContextProvider>
          <App />
        </NotesContextProvider>
      </ThemeProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
