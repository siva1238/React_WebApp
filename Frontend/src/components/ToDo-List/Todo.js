import React from "react";
import "../../CSS/Todo.css";

function ToDo({ todos, completeTodo }) {
  return todos.map((todo, index) => (
    <div
      className={todo.isComplete ? "todo-row complete" : "todo-row"}
      key={index}
    >
      <div key={todo.id} onClick={() => completeTodo(todo.id)}>
        <input
          type="checkbox"
          id="todomark"
          checked={todo.isComplete ? true : false}
        />
        &nbsp;
        {todo.text}
      </div>
    </div>
  ));
}

export default ToDo;
