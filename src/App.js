import React from "react";
import TodoList from "./component/TodoList";
import {Routes,Route} from "react-router-dom"
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<TodoList/>} />
        <Route path="/home" element={<TodoList/>} />
      </Routes>
    </div>
  );
}

export default App;
