import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { checkTask } from "../redux/taskSlice";
import click from "../assets/sounds/click.mp3";
import { editTask, deleteTask } from "../redux/taskSlice";

const TaskList = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.tasks);
  const [filterState, setFilterState] = useState(null);
  const [task, setTask] = useState({
    name: "",
    completed: false,
    time: new Date().toLocaleTimeString(),
  });

  const handleCheck = (id) => {
    dispatch(checkTask(id));
  };

  const showConfirmDelete = (id) => {
    document.getElementById("confirm-delete").showModal();
    setTask(state.tasks.find((task) => task.id === id));
  };

  const handleConfirmDelete = () => {
    dispatch(deleteTask(task.id));
    document.getElementById("confirm-delete").close();
  };

  const handleCancelDelete = () => {
    document.getElementById("confirm-delete").close();
  };

  const handleInputChange = ({ target }) => {
    setTask({ ...task, [target.name]: target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editTask(task));
    document.getElementById("edit-task-modal").close();
  };

  const handleCancel = () => {
    document.getElementById("edit-task-modal").close();
  };

  const playClick = () => {
    let clickSound = new Audio(click);
    // clickSound.loop = true;
    clickSound.play();
  };

  useEffect(() => {}, []);

  const handleEdit = (id) => {
    document.getElementById("edit-task-modal").showModal();
    setTask(state.tasks.find((task) => task.id === id));
  };

  const setActive = (which) => {
    let body = document.querySelector("#body");

    if (state.tasks.length >= 1) {
      if (which === "allTasks") {
        setFilterState(null);
        let allTasksHTML = document.querySelector("#allTasks");

        body.className === "lightBody"
          ? (allTasksHTML.className = "allTasks active")
          : (allTasksHTML.className = "allTasks activeDark");

        document.querySelector("#doneTasks").className = "doneTasks";

        document.querySelector("#undoneTasks").className = "undoneTasks";
      } else if (which === "doneTasks") {
        let doneTasksHTML = document.querySelector("#doneTasks");
        setFilterState(true);
        body.className === "lightBody"
          ? (doneTasksHTML.className = "doneTasks active")
          : (doneTasksHTML.className = "doneTasks activeDark");

        document.querySelector("#allTasks").className = "allTasks";

        document.querySelector("#undoneTasks").className = "undoneTasks";
      } else if (which === "undoneTasks") {
        let undoneTasksHTML = document.querySelector("#undoneTasks");
        setFilterState(false);
        body.className === "lightBody"
          ? (undoneTasksHTML.className = "undoneTasks active")
          : (undoneTasksHTML.className = "undoneTasks activeDark");

        document.querySelector("#allTasks").className = "allTasks";

        document.querySelector("#doneTasks").className = "doneTasks";
      }
    }
  };

  const TaskDiv = ({ task, index }) => {
    let themeIsLight = localStorage.getItem("theme") === "light" ? true : false;
    return (
      <div
        key={index}
        id="onlyTask"
        className={
          themeIsLight
            ? "onlyTask nes-container with-title"
            : "onlyTask nes-container with-title is-dark"
        }
      >
        <p className="title">Tarea {task.id}</p>
        <label>
          <input
            name="done"
            id="checkTask1"
            type="checkbox"
            className={
              themeIsLight
                ? "onlyCheck nes-checkbox"
                : "onlyCheck nes-checkbox is-dark"
            }
            checked={task.completed}
            onChange={() => handleCheck(task.id)}
          />
          <span>{task.name}</span>
        </label>
        <div className="taskActions">
          <img
            src="https://img.icons8.com/material-sharp/28/0082C7/edit--v1.png"
            onClick={() => handleEdit(task.id)}
            alt="Edit Icon"
          />
          <img
            src="https://img.icons8.com/material-sharp/28/DE0000/trash.png"
            onClick={() => showConfirmDelete(task.id)}
            alt="Delete Icon"
          />
        </div>
        <div className="timeContainer">
          <p className="taskTime">{task.time}</p>
        </div>
      </div>
    );
  };

  const FilterTasksDiv = () => {
    if (filterState === null) {
      return state.tasks.map((task, index) => (
        <TaskDiv task={task} key={index} />
      ));
    } else if (filterState) {
      return state.tasks
        .filter((task) => task.completed === filterState)
        .map((task, index) => <TaskDiv task={task} key={index} />);
    } else {
      return state.tasks
        .filter((task) => task.completed === filterState)
        .map((task, index) => <TaskDiv task={task} key={index} />);
    }
  };

  return (
    <>
      <div id="taskFilter" className="taskFilter">
        <div
          id="allTasks"
          className="allTasks active"
          onClick={() => {
            setActive("allTasks");
            if (state.tasks.length >= 1) {
              playClick();
            }
          }}
        >
          Todas
        </div>
        <div
          id="doneTasks"
          className="doneTasks"
          onClick={() => {
            setActive("doneTasks");
            if (state.tasks.length >= 1) {
              playClick();
            }
          }}
        >
          Hechas
        </div>
        <div
          id="undoneTasks"
          className="undoneTasks"
          onClick={() => {
            setActive("undoneTasks");
            if (state.tasks.length >= 1) {
              playClick();
            }
          }}
        >
          Sin hacer
        </div>
      </div>
      <div className="taskList">
        <FilterTasksDiv />
        <section className="alertSection">
          <dialog
            className={
              localStorage.getItem("theme") === "light"
                ? "nes-dialog alert"
                : "nes-dialog alert is-dark dialog-dark"
            }
            id="edit-task-modal"
          >
            <div method="dialog">
              <p className="nes-text is-primary">Editar Tarea</p>
              <form onSubmit={handleSubmit}>
                <div className="edit-container nes-field">
                  <label htmlFor="name_field">Nombre de la tarea</label>
                  <input
                    name="name"
                    onChange={handleInputChange}
                    type="text"
                    id="name_field"
                    value={task.name}
                    className="nes-input"
                  />
                  <menu className="dialog-menu edit-btn">
                    <button
                      onMouseDown={playClick}
                      type="submit"
                      className="nes-btn is-warning"
                    >
                      Editar
                    </button>
                    <button
                      onMouseDown={playClick}
                      onClick={handleCancel}
                      type="button"
                      className="nes-btn is-error"
                    >
                      Cancelar
                    </button>
                  </menu>
                </div>
              </form>
            </div>
          </dialog>
        </section>
        <section className="alertSection">
          <dialog
            className={
              localStorage.getItem("theme") === "light"
                ? "nes-dialog alert"
                : "nes-dialog alert is-dark dialog-dark"
            }
            id="confirm-delete"
          >
            <div method="dialog">
              <p className="nes-text is-warning textCenter">
                ¿Quieres eliminar esta tarea?
              </p>
              <div className="edit-container nes-field">
                <label htmlFor="name_field">
                  "{task.name}" agregada a las {task.time}
                </label>
                <menu className="dialog-menu edit-btn">
                  <button
                    onMouseDown={playClick}
                    type="submit"
                    className="nes-btn is-success"
                    onClick={handleConfirmDelete}
                  >
                    Eliminar
                  </button>
                  <button
                    onMouseDown={playClick}
                    onClick={handleCancelDelete}
                    type="button"
                    className="nes-btn is-error"
                  >
                    Cancelar
                  </button>
                </menu>
              </div>
            </div>
          </dialog>
        </section>
      </div>
    </>
  );
};

export default TaskList;
