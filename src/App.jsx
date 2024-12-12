import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import TaskManager from "./taskmanager.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/task-manager/:userId" element={<TaskManager />} />
      </Routes>
    </Router>
  );
}

export default App;
