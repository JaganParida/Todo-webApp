import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./todo.css";
import myImg from "./assets/todo.png";

export default function TodoList() {
  let [tasks, setTasks] = useState([
    { task: "sample task", id: uuidv4(), isDone: false },
  ]);
  let [newTask, setNewTask] = useState("");

  // add a new task
  let addTask = () => {
    setTasks((prevTask) => {
      return [...prevTask, { task: newTask, id: uuidv4(), isDone: false }];
    });
    setNewTask("");
  };

  // update the new task value
  let updateTaskValue = (event) => {
    setNewTask(event.target.value);
  };

  // delete a task
  let deleteTask = (id) => {
    setTasks((prevTask) => {
      return prevTask.filter((task) => task.id !== id);
    });
  };

  // update all tasks to uppercase
  let markAsDoneAll = () => {
    setTasks((prevTask) =>
      prevTask.map((task) => {
        return {
          ...task,
          isDone: true,
        };
      })
    );
  };

  // update a single task to uppercase
  let markAsDoneOne = (id) => {
    setTasks((prevTask) =>
      prevTask.map((task) => {
        if (task.id === id) {
          return {
            ...task,
            isDone: true,
          };
        } else {
          return task;
        }
      })
    );
  };

  return (
    <div className="todo">
      <img src={myImg} alt="my img"></img>
      <div className="input">
        <input
          placeholder="add a task"
          value={newTask}
          onChange={updateTaskValue}
        />{" "}
        &nbsp;
        <button onClick={addTask}>Add Task</button>
      </div>
      <hr />
      <h4>Task Todo</h4>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <span
              style={
                task.isDone
                  ? {
                      textDecorationLine: "line-through",
                      textDecorationColor: "red",
                    }
                  : {}
              }
            >
              {task.task}
            </span>
            &nbsp;
            <button className="delete" onClick={() => deleteTask(task.id)}>
              Delete
            </button>{" "}
            &nbsp;
            <button onClick={() => markAsDoneOne(task.id)}>Mark as Done</button>
          </li>
        ))}
      </ul>
      <br />
      <button onClick={markAsDoneAll}>Mark as Done All</button>
    </div>
  );
}
