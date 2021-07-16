import React, { useState } from "react";
import ToDo from "./Todo";
import TodoForm from "./TodoForm";
import "../../CSS/Todo.css";

function TodoList() {
  const [todos, setTodos] = useState([]);
  const addTodo = (todo) => {
    if (!todo.text || /^\s*$/.test(todo.text)) {
      return;
    }

    const newTodos = [todo, ...todos];

    setTodos(newTodos);
    console.log(...todos);
  };

  const completeTodo = (id) => {
    let updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete;
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  return (
    <div className="todo-app">
      <h1>What's the plan for Today</h1>
      <TodoForm onSubmit={addTodo} />
      <ToDo todos={todos} completeTodo={completeTodo} />
    </div>
  );
}

export default TodoList;
