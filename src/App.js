import { useEffect, useState } from "react";
import "./App.css";
import {
  deleteListItem,
  getAllTasks,
  putListItems,
  saveTask,
} from "./services/taskService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightLeft, faTrashCan } from "@fortawesome/free-solid-svg-icons";

export const App = () => {
  const [allTasks, setAllTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [completedTasks, setCompletedTasks] = useState([]);
  const [incompletedTasks, setIncompletedTasks] = useState([]);
  const [incompleteTaskCount, setIncompletedTaskCount] = useState(0);
  const [completedTaskCount, setCompletedTaskCount] = useState(0);

  //initial fetch for all tasks
  const getData = () => {
    getAllTasks().then((res) => setAllTasks(res));
  };

  useEffect(() => {
    getData();
  }, [allTasks]);

  //useEffect for completed tasks
  useEffect(() => {
    const completeTasks = allTasks.filter((task) => task.complete === true);
    setCompletedTasks(completeTasks);
    //sets counter for toldJokes
    setCompletedTaskCount(completeTasks.length);
  }, [allTasks]);

  //useEffect for incomplete tasks
  useEffect(() => {
    const notFinishedTasks = allTasks.filter((task) => task.complete === false);
    setIncompletedTasks(notFinishedTasks);
    //sets counter for untoldJokes
    setIncompletedTaskCount(notFinishedTasks.length);
  }, [allTasks]);

  //object that is posted when new task is entered
  const handleNewTask = () => {
    let taskEntry = {
      text: newTask,
      complete: false,
    };
   //function responsible for posting new task
    saveTask(taskEntry).then((res) => {
      setNewTask("");
      //have to refetch after each post so it is rendered on DOM
      getData();
    });
  };

  //function responsible for putting new jokes in correct column based off button click
  const handleCompletionChange = (task) => {
    task.complete = !task.complete;
    putListItems(task).then((res) => res.json());
  };

  //function responsible for deleting jokes when delete button is pressed
  const handleTaskDelete = (task) => {
    deleteListItem(task).then((res) => res.json());
  };

  return (
    <div className="app-container">
      <div className="app-heading">
        <h1 className="app-heading-text">TO-DO LIST PACK BOI</h1>
      </div>
      <div className="joke-add-form">
        <input
          className="joke-input"
          type="text"
          placeholder="New task"
          value={newTask}
          onChange={(event) => setNewTask(event.target.value)}
        />
        <button className="joke-input-submit" onClick={handleNewTask}>
          Add
        </button>
      </div>
      <div className="joke-lists-container">
        <div className="joke-list-container">
          <h2>
            <span className="told-count">{completedTaskCount}</span>
            Completed Tasks
          </h2>
          {completedTasks.map((joke) => (
            <div className="joke-list-item" key={joke.id}>
              {joke.text}
              <div className="joke-list-action-toggle">
                <FontAwesomeIcon
                  icon={faRightLeft}
                  value={joke}
                  onClick={() => handleCompletionChange(joke)}
                />
              </div>
              <div className="joke-list-action-delete">
                <FontAwesomeIcon
                  icon={faTrashCan}
                  value={joke}
                  onClick={() => handleTaskDelete(joke)}
                  className="delete"
                />
              </div>
            </div>
          ))}
        </div>
        <div className="joke-list-container">
          <h2>
            <span className="untold-count">{incompleteTaskCount}</span>
            Incomplete Tasks
          </h2>
          {incompletedTasks.map((joke) => (
            <div className="joke-list-item" key={joke.id}>
              {joke.text}
              <div className="joke-list-action-toggle">
                <FontAwesomeIcon
                  icon={faRightLeft}
                  value={joke}
                  onClick={() => handleCompletionChange(joke)}
                />
              </div>
              <div className="joke-list-action-delete">
                <FontAwesomeIcon
                  icon={faTrashCan}
                  value={joke}
                  onClick={() => handleTaskDelete(joke)}
                  className="delete"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
