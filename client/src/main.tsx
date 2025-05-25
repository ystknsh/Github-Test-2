import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Set title for Electron app
document.title = "MulmoCast - AI-Powered Content Generator";

createRoot(document.getElementById("root")!).render(<App />);
