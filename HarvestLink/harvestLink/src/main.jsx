import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./utils/consoleUtils"; // Import console error handling
import "./index.css";
import App from "./App.jsx";
import ErrorBoundary from "./components/ErrorBoundary.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
);
