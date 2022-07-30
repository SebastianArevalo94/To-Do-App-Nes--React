import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { checkTask } from "../redux/taskSlice";
import click from "../assets/sounds/click.mp3";
import { editTask, deleteTask } from "../redux/taskSlice";
import editIconDark from "../assets/icons/edit.icon.dark.svg";
import editIconLight from "../assets/icons/edit.icon.light.svg";
import deleteIconLight from "../assets/icons/delete.icon.light.svg";
import deleteIconDark from "../assets/icons/delete.icon.dark.svg";
import { English, Spanish } from "../languages/languages";

const TaskList = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.tasks);
  const [languageData, setLanguageData] = useState({});
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
    clickSound.play();
  };

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    const language =
      localStorage.getItem("language") === "english" ? English : Spanish;
    setIconsTheme(theme);
    setLanguageData(language);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localStorage.getItem('language')]);

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

  const setIconsTheme = (theme) => {
    const editIcons = document.querySelectorAll(".editIcon");
    const editIconsArray = Array.from(editIcons);
    const deleteIcons = document.querySelectorAll(".deleteIcon");
    const deleteIconsArray = Array.from(deleteIcons);
    if (theme === "dark") {
      editIconsArray.forEach((icon) => {
        icon.src = editIconDark;
      });
      deleteIconsArray.forEach((icon) => {
        icon.src = deleteIconDark;
      });
    } else {
      editIconsArray.forEach((icon) => {
        icon.src = editIconLight;
      });
      deleteIconsArray.forEach((icon) => {
        icon.src = deleteIconLight;
      });
    }
  };

  const TaskDiv = ({ task, index }) => {
    const lsTheme = localStorage.getItem("theme");
    return (
      <div
        key={index}
        id="onlyTask"
        className={
          lsTheme === "light"
            ? "onlyTask nes-container with-title"
            : "onlyTask nes-container with-title is-dark"
        }
      >
        <p className="title">{languageData.taskNumber} {task.id}</p>
        <label>
          <input
            name="done"
            id="checkTask1"
            type="checkbox"
            className={
              lsTheme === "light"
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
            id="editIcon"
            src={lsTheme === "light" ? editIconLight : editIconDark}
            className="taskBtn editIcon"
            onClick={() => handleEdit(task.id)}
            width="24px"
            height="24px"
            alt="Edit Icon"
          />
          <img
            id="deleteIcon"
            src={lsTheme === "light" ? deleteIconLight : deleteIconDark}
            className="deleteIcon"
            onClick={() => showConfirmDelete(task.id)}
            width="24px"
            height="24px"
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
          {languageData.allTasks}
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
          {languageData.completeTasks}
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
          {languageData.incompleteTasks}
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
              <p className="nes-text is-primary">{languageData.editTaskTitle}</p>
              <form onSubmit={handleSubmit}>
                <div className="edit-container nes-field">
                  <label htmlFor="name_field">{languageData.editTaskLabel}</label>
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
                      {languageData.editButton}
                    </button>
                    <button
                      onMouseDown={playClick}
                      onClick={handleCancel}
                      type="button"
                      className="nes-btn is-error"
                    >
                      {languageData.cancelButton}
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
                {languageData.deleteAllOneTasksTitle}
              </p>
              <div className="edit-container nes-field">
                <label htmlFor="name_field">
                  "{task.name}" {languageData.deleteOneTaskSubtitle} {task.time}
                </label>
                <menu className="dialog-menu edit-btn">
                  <button
                    onMouseDown={playClick}
                    type="submit"
                    className="nes-btn is-success"
                    onClick={handleConfirmDelete}
                  >
                    {languageData.deleteButton}
                  </button>
                  <button
                    onMouseDown={playClick}
                    onClick={handleCancelDelete}
                    type="button"
                    className="nes-btn is-error"
                  >
                    {languageData.cancelButton}
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
