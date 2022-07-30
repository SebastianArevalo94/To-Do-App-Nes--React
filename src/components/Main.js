import { useState, useEffect } from "react";
import TaskList from "./TaskList";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { addTask, deleteAll, setTasksLS } from "../redux/taskSlice";
import click from "../assets/sounds/click.mp3";
import { getLSData, cleanLS } from "../helpers/localStorage";
import sun from "../assets/icons/sun-symbol.png";
import moon from "../assets/icons/moon-symbol.png";
import editIconDark from "../assets/icons/edit.icon.dark.svg";
import editIconLight from "../assets/icons/edit.icon.light.svg";
import deleteIconLight from "../assets/icons/delete.icon.light.svg";
import deleteIconDark from "../assets/icons/delete.icon.dark.svg";
import languageIconLight from "../assets/icons/language.icon.light.svg";
import languageIconDark from "../assets/icons/language.icon.dark.svg";
import { English, Spanish } from "../languages/languages";

const Main = () => {
  const [taskId, setTaskId] = useState(1);
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks);
  const [languageData, setLanguageData] = useState({});
  const [fixHeight, setFixHeight] = useState(0);
  const [initialHeight, setInitialHeight] = useState();
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [cleanDisabled, setCleanDisabled] = useState(true);
  const [errorInfo, setErrorInfo] = useState("");

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    const languageLS = localStorage.getItem("language");
    if (!languageLS || languageLS === "english") {
      localStorage.setItem("language", "english");
      setLanguageData(English);
    } else {
      setLanguageData(Spanish);
    }
    const body = document.querySelector("#body");
    body.style.height = `${document.documentElement.scrollHeight}px`;
    setInitialHeight(`${document.documentElement.scrollHeight}px`);
    dispatch(setTasksLS(getLSData()));
    setCleanDisabled(
      JSON.parse(localStorage.getItem("tasks")).length > 0 ? false : true
    );
    if (theme === null) {
      localStorage.setItem("theme", "light");
    } else {
      setTheme(theme);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const initialState = {
    name: "",
    completed: false,
    time: new Date().toLocaleTimeString(),
  };

  const [task, setTask] = useState(initialState);

  const playClick = () => {
    const clickSound = new Audio(click);
    clickSound.play();
  };
  const clean = () => {
    dispatch(deleteAll());
    cleanLS();
    setTaskId(1);
    cancel();
    setCleanDisabled(!cleanDisabled);
    let body = document.querySelector("#body");
    body.style.height = initialHeight;
  };

  const showConfirm = () => {
    document.getElementById("delete-all").showModal();
  };

  const cancel = () => {
    document.getElementById("delete-all").close();
  };

  const handleChange = (e) => {
    const text = document.querySelector("#errorText");
    if (e.target.value === "") {
      setBtnDisabled(true);
      text.style.display = "block";
      setErrorInfo(languageData.emptyInput);
    } else if (e.target.value.length < 4) {
      setBtnDisabled(true);
      text.style.display = "block";
      setErrorInfo(languageData.minLength);
    } else {
      text.style.display = "none";
      setBtnDisabled(false);
    }
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!btnDisabled) {
      setFixHeight(fixHeight + 1);
    }
    if (fixHeight === 4) {
      const body = document.querySelector("#body");
      body.removeAttribute("style");
    }
    if (task.name !== "" && task.name.length >= 4) {
      dispatch(addTask({ ...task, id: taskId }));
      setCleanDisabled(false);
      setTaskId(taskId + 1);
      setTask(initialState);
    }
    setBtnDisabled(true);
  };
  const setTheme = (theme) => {
    const body = document.querySelector("#body");
    const titleApp = document.querySelector("#titleApp");
    const addTaskContainer = document.querySelector("#addTaskContainer");
    const label = document.querySelector("#taskLabel");
    const input = document.querySelector("#taskInput");
    const taskFilter = document.querySelector("#taskFilter");
    const allTasks = document.querySelector("#allTasks");
    const icon = document.querySelector("#themeImg");
    const languageIcon = document.querySelector("#languageIcon");
    if (theme === "dark") {
      localStorage.setItem("theme", theme);
      icon.src = sun;
      languageIcon.src = languageIconDark;
      body.className = "darkBody";
      titleApp.className = "titleAppDark";
      addTaskContainer.className = "addTask nes-container dark addTaskDark";
      taskFilter.className = "taskFilterDark";
      allTasks.className = "allTasks active";
      input.className = "nes-input is-dark";
      label.style.color = "#fff";
      if (tasks.length !== 0) {
        const taskList = document.querySelectorAll(".onlyTask");
        const arrayTaskList = Array.from(taskList);
        const checkList = document.querySelectorAll(".onlyCheck");
        const arrayCheckList = Array.from(checkList);
        arrayTaskList.forEach((task) => {
          task.className = "onlyTask nes-container with-title is-dark";
        });
        arrayCheckList.forEach((check) => {
          check.className = "onlyCheck nes-checkbox is-dark";
        });
      }
    } else {
      body.className = "lightBody";
      localStorage.setItem("theme", "light");
      icon.src = moon;
      languageIcon.src = languageIconLight;
      body.className = "lightBody";
      titleApp.className = "titleAppLight";
      addTaskContainer.className = "addTask nes-container";
      taskFilter.className = "taskFilter";
      allTasks.className = "allTasks activeDark";
      input.className = "nes-input";
      label.style.color = "#000";
      if (tasks.length !== 0) {
        const taskList = document.querySelectorAll(".onlyTask");
        const arrayTaskList = Array.from(taskList);
        const checkList = document.querySelectorAll(".onlyCheck");
        const arrayCheckList = Array.from(checkList);
        arrayTaskList.forEach((task) => {
          task.className = "onlyTask nes-container with-title";
        });
        arrayCheckList.forEach((check) => {
          check.className = "onlyCheck nes-checkbox";
        });
      }
    }
  };
  const changeTheme = () => {
    const body = document.querySelector("#body");
    const titleApp = document.querySelector("#titleApp");
    const addTaskContainer = document.querySelector("#addTaskContainer");
    const label = document.querySelector("#taskLabel");
    const input = document.querySelector("#taskInput");
    const taskFilter = document.querySelector("#taskFilter");
    const alertDeleteAll = document.querySelector("#delete-all");
    const icon = document.querySelector("#themeImg");
    const languageIcon = document.querySelector("#languageIcon");
    const editIcons = document.querySelectorAll(".editIcon");
    const deleteIcons = document.querySelectorAll(".deleteIcon");
    const editIconsArray = Array.from(editIcons);
    const deleteIconsArray = Array.from(deleteIcons);

    if (body.className === "lightBody") {
      localStorage.setItem("theme", "dark");
      icon.src = sun;
      languageIcon.src = languageIconDark;
      editIconsArray.forEach((icon) => {
        icon.src = editIconDark;
      });
      deleteIconsArray.forEach((icon) => {
        icon.src = deleteIconDark;
      });
      body.className = "darkBody";
      titleApp.className = "titleAppDark";
      addTaskContainer.className = "addTask nes-container dark addTaskDark";
      taskFilter.className = "taskFilterDark";
      alertDeleteAll.className = "nes-dialog alert is-dark dialog-dark";
      input.className = "nes-input is-dark";
      label.style.color = "#fff";
      if (tasks.length !== 0) {
        let taskList = document.querySelectorAll(".onlyTask");
        let arrayTaskList = Array.from(taskList);
        let checkList = document.querySelectorAll(".onlyCheck");
        let arrayCheckList = Array.from(checkList);
        arrayTaskList.forEach((task) => {
          task.className = "onlyTask nes-container with-title is-dark";
        });
        arrayCheckList.forEach((check) => {
          check.className = "onlyCheck nes-checkbox is-dark";
        });
      }
    } else {
      body.className = "lightBody";
      localStorage.setItem("theme", "light");
      icon.src = moon;
      languageIcon.src = languageIconLight;
      editIconsArray.forEach((icon) => {
        icon.src = editIconLight;
      });
      deleteIconsArray.forEach((icon) => {
        icon.src = deleteIconLight;
      });
      body.className = "lightBody";
      titleApp.className = "titleAppLight";
      addTaskContainer.className = "addTask nes-container";
      taskFilter.className = "taskFilter";
      alertDeleteAll.className = "nes-dialog alert";
      input.className = "nes-input";
      label.style.color = "#000";
      if (tasks.length !== 0) {
        let taskList = document.querySelectorAll(".onlyTask");
        let arrayTaskList = Array.from(taskList);
        let checkList = document.querySelectorAll(".onlyCheck");
        let arrayCheckList = Array.from(checkList);
        arrayTaskList.forEach((task) => {
          task.className = "onlyTask nes-container with-title";
        });
        arrayCheckList.forEach((check) => {
          check.className = "onlyCheck nes-checkbox";
        });
      }
    }
  };
  const typeErrorTranslate = (typeError) => {
    if(typeError === "Type at least 4 letters."){
      return "Escribe minimo 4 letras."
    } else if (typeError === "Escribe minimo 4 letras.") {
      return "Type at least 4 letters."
    } else if(typeError === "Type a task."){
      return "Escribe una tarea."
    } else if (typeError === "Escribe una tarea."){
      return "Type a task"
    }
  }
  const changeLanguage = (currentLanguage) => {
    if (currentLanguage === "english") {
      localStorage.setItem("language", "spanish");
      setErrorInfo(typeErrorTranslate(errorInfo));
      setLanguageData(Spanish);
    } else {
      localStorage.setItem("language", "english");
      setErrorInfo(typeErrorTranslate(errorInfo));
      setLanguageData(English);
    }
  };
  const Alerts = () => {
    return (
      <>
        <section className="alertSection">
          <dialog
            className={
              localStorage.getItem("theme") === "light"
                ? "nes-dialog alert"
                : "nes-dialog alert is-dark dialog-dark"
            }
            id="delete-all"
          >
            <div method="dialog">
              <p className="nes-text is-warning">
                {tasks.tasks.length > 1
                  ? languageData.confirmDeleteAll
                  : languageData.confirmDeleteOne}
              </p>
              <div className="edit-container nes-field">
                <label className="textCenter" htmlFor="name_field">
                  {tasks.tasks.length > 1
                    ? languageData.confirmDeleteAllInfo
                    : languageData.confirmDeleteOneSub}
                </label>
                <menu className="dialog-menu edit-btn">
                  <button
                    onMouseDown={playClick}
                    type="submit"
                    className="nes-btn is-success"
                    onClick={clean}
                  >
                    {languageData.deleteButton}
                  </button>
                  <button
                    onMouseDown={playClick}
                    onClick={cancel}
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
      </>
    );
  };
  return (
    <div id="body" className="lightBody">
      <div className="global">
        <div className="titleAndTheme">
          <h1 id="titleApp" className="titleAppLight">
            To Do List
          </h1>
          <div className="changeTheme">
            <img
              id="themeImg"
              onMouseDown={() => {
                playClick();
                changeTheme();
              }}
              alt="iconTheme"
              className="themeImg"
              src={moon}
            />
            <img
              id="languageIcon"
              alt="languageIcon"
              className="themeImg"
              src={languageIconLight}
              onClick={() => {
                changeLanguage(localStorage.getItem("language"));
              }}
            />
          </div>
        </div>
        <div id="addTaskContainer" className="addTask nes-container ">
          <form onSubmit={handleSubmit}>
            <div className="nes-field">
              <label id="taskLabel" htmlFor="taskInput">
                {languageData.labelInput}
              </label>
              <input
                name="name"
                onChange={handleChange}
                type="text"
                id="taskInput"
                autoComplete="off"
                className="nes-input"
                value={task.name}
              />
            </div>
            <p id="errorText" className="nes-text is-error errorText">
              {errorInfo}
            </p>
            <div className="addBtnDiv">
              <button
                type="submit"
                onMouseDown={() => {
                  if (task.name !== "" && task.name.length >= 4) {
                    playClick();
                  }
                }}
                className={
                  btnDisabled
                    ? "addBtn nes-btn is-success is-disabled"
                    : "addBtn nes-btn is-success"
                }
              >
                {languageData.addTask}
              </button>
              <button
                type="button"
                onMouseDown={() => {
                  if (tasks.tasks.length >= 1) {
                    playClick();
                  }
                }}
                onClick={() => {
                  if (!cleanDisabled) {
                    showConfirm();
                  }
                }}
                className={
                  cleanDisabled
                    ? "cleanBtn nes-btn is-error is-disabled"
                    : "cleanBtn nes-btn is-error"
                }
              >
                {languageData.cleanTasks}
              </button>
            </div>
          </form>
        </div>
        <Alerts />
        <div id="taskContainer" className="taskDiv">
          <TaskList />
        </div>
      </div>
    </div>
  );
};

export default Main;
