import "../styles/Main.css";
import { useState } from "react";
import TaskList from "./TaskList";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {addTask, deleteAll} from "../redux/taskSlice";
import click from "../assets/sounds/click.mp3";

const Main = () => {
	const [taskId, setTaskId] = useState(1);
	const dispatch = useDispatch(); 
	const tasks = useSelector(state => state.tasks)

	const initialState = {
		name: "",
		completed: false,
		time: new Date().toLocaleTimeString(),
	}

	const [task, setTask] = useState(initialState);

	const playClick = () => {
		let clickSound = new Audio(click);
		clickSound.play(); 
	};

	const clean = () => {
		dispatch(deleteAll());
		setTaskId(1)
	};

	const handleChange = e => {
		setTask({
			...task,
			[e.target.name]: e.target.value
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if(task.name!==''){
			dispatch(addTask({...task, id: taskId}))
			setTaskId(taskId+1);
			setTask(initialState);
		} else {
			document.getElementById('dialog-default').showModal();
		}
		
	}

	const changeTheme = () => {
		let body = document.querySelector("#body");
		let titleApp = document.querySelector("#titleApp");
		let addTaskContainer = document.querySelector("#addTaskContainer");
		let label = document.querySelector("#taskLabel");
		let input = document.querySelector("#taskInput");
		let taskFilter = document.querySelector("#taskFilter");

		let icon = document.querySelector("#themeImg");
		let icons = {
			moon: "https://img.icons8.com/ios-glyphs/60/000000/moon-symbol.png",
			sun: "https://img.icons8.com/ios-glyphs/60/ffffff/sun--v1.png",
		};
		//blanco a negro */}
		if (body.className === "lightBody") {
			localStorage.setItem("theme", "dark");
			icon.src = icons.sun;
			body.className = "darkBody";
			titleApp.className = "titleAppDark";
			addTaskContainer.className =
				"addTask nes-container dark addTaskDark";
			taskFilter.className = "taskFilterDark";
			input.className = "nes-input is-dark";
			label.style.color = "#fff";
			if (tasks.length !== 0) {
				let taskList = document.querySelectorAll(".onlyTask");
				let arrayTaskList = Array.from(taskList);
				let checkList = document.querySelectorAll(".onlyCheck");
				let arrayCheckList = Array.from(checkList);
				arrayTaskList.forEach((task) => {
					task.className =
						"onlyTask nes-container with-title is-dark";
				});
				arrayCheckList.forEach((check) => {
					check.className = "onlyCheck nes-checkbox is-dark";
				});
			}
		} else {
			body.className = "lightBody";
			localStorage.setItem("theme", "light");
			icon.src = icons.moon;
			body.className = "lightBody";
			titleApp.className = "titleAppLight";
			addTaskContainer.className = "addTask nes-container";
			taskFilter.className = "taskFilter";
			// allTasks.className = 'allTasks active'; }
			// doneTasks.className = 'doneTasks active'; }
			// undoneTasks.className = 'undoneTasks active'; }
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

	return (
		<div id="body" className="lightBody">
			<div className="global">
				<div className="titleAndTheme">
					<h1 id="titleApp" className="titleAppLight">
						To Do List
					</h1>
					<div onMouseDown={changeTheme} className="changeTheme">
						<img
							id="themeImg"
							onMouseDown={playClick}
							alt="iconTheme"
							className="themeImg"
							src="https://img.icons8.com/ios-glyphs/60/000000/moon-symbol.png"
						/>
					</div>
				</div>
				<div id="addTaskContainer" className="addTask nes-container ">
					<form onSubmit={handleSubmit}>
						<div className="nes-field">
							<label id="taskLabel" htmlFor="taskInput">
								Tarea
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
						<div className="addBtnDiv">
							<button
								type="submit"
								onMouseDown={playClick}
								onClick={addTask}
								className="addBtn nes-btn is-success"
							>
								Agregar
							</button>
							<button
								type="button"
								onMouseDown={playClick}
								onClick={clean}
								className="cleanBtn nes-btn is-error"
							>
								Eliminar
							</button>
						</div>
					</form>
				</div>
				<section className="alertSection">
					<dialog className="nes-dialog alert" id="dialog-default">
						<form method="dialog">
							<p className="nes-text is-error">Error</p>
							<p>Debes agregar un nombre a la tarea.</p>
							<menu className="dialog-menu">
								<button
									onMouseDown={playClick}
									className="nes-btn is-error"
								>
									Confirmar
								</button>
							</menu>
						</form>
					</dialog>
				</section>
				<div id="taskContainer" className="taskDiv">
					<TaskList/>
				</div>
			</div>
		</div>
	);
};

export default Main;
