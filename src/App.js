import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./Home";
import "./index.css";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Home />
      </div>
    </BrowserRouter>
  );
}

export default App;
