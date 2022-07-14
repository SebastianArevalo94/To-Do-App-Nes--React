import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import {checkTask} from "../redux/taskSlice";
import click from "../assets/sounds/click.mp3";

const TaskList = () => {
	const dispatch = useDispatch();
	const state = useSelector(state => state.tasks);
	const [filterState, setFilterState] = useState(null);

	const handleCheck = (id) => {
		dispatch(checkTask(id));
	};

		const playClick = () => {
		let clickSound = new Audio(click);
		// clickSound.loop = true;
		clickSound.play(); 
	};

	const setActive = (which) => {
		let body = document.querySelector("#body");

		if (which === "allTasks") {
			setFilterState(null)
			let allTasksHTML = document.querySelector("#allTasks");

			body.className === "lightBody"
				? (allTasksHTML.className = "allTasks active")
				: (allTasksHTML.className = "allTasks activeDark");

			document.querySelector("#doneTasks").className = "doneTasks";

			document.querySelector("#undoneTasks").className = "undoneTasks";
		} else if (which === "doneTasks") {
			let doneTasksHTML = document.querySelector("#doneTasks");
			setFilterState(true)
			body.className === "lightBody"
				? (doneTasksHTML.className = "doneTasks active")
				: (doneTasksHTML.className = "doneTasks activeDark");

			document.querySelector("#allTasks").className = "allTasks";

			document.querySelector("#undoneTasks").className = "undoneTasks";
		} else if (which === "undoneTasks") {
			let undoneTasksHTML = document.querySelector("#undoneTasks");
			setFilterState(false)
			body.className === "lightBody"
				? (undoneTasksHTML.className = "undoneTasks active")
				: (undoneTasksHTML.className = "undoneTasks activeDark");

			document.querySelector("#allTasks").className = "allTasks";

			document.querySelector("#doneTasks").className = "doneTasks";
		}
	};

	useEffect(() => {
		localStorage.setItem("theme", "light");
	}, []);
 
	return (
		<>
			<div id="taskFilter" className="taskFilter">
						<div
							id="allTasks"
							className="allTasks active"
							onClick={() => {
								setActive("allTasks");
								playClick();
							}}
						>
							Todas
						</div>
						<div
							id="doneTasks"
							className="doneTasks"
							onClick={() => {
								setActive("doneTasks");
								playClick();
							}}
						>
							Hechas
						</div>
						<div
							id="undoneTasks"
							className="undoneTasks"
							onClick={() => {
								setActive("undoneTasks");
								playClick();
							}}
						>
							Sin hacer
						</div>
					</div>
					<div className="taskList">
						{
							//todas las tareas
							filterState === null ? ( state.tasks.map((task) => {
							return localStorage.getItem("theme") === "light" ? (
								<div
									key={task.id}
									id="onlyTask"
									className="onlyTask nes-container with-title"
								>
									<p className="title">Tarea {task.id}</p>
									<label>
										<input
											name="done"
											id="checkTask1"
											type="checkbox"
											className="onlyCheck nes-checkbox"
											checked={task.completed}
											onChange={() => handleCheck(task.id)}
										/>
										<span>{task.name}</span>
									</label>
									<div className="timeContainer">
										<p className="taskTime">{task.time}</p>
									</div>
								</div>
							) : (
								<div
									key={task.id}
									id="onlyTask"
									className="onlyTask nes-container with-title is-dark"
								>
									<p className="title">Tarea {task.id}</p>
									<label>
										<input
											name="done"
											id="checkTask1"
											type="checkbox"
											checked={task.completed}
											className="onlyCheck nes-checkbox is-dark"
											onChange={() => handleCheck(task.id)}
										/>
										<span>{task.name}</span>
									</label>
									<div className="timeContainer">
										<p className="taskTime">{task.time}</p>
									</div>
								</div>
							);
						})		//si no son todas, son hechas o sin hacer
								): (
								filterState === true ? (
									//si son hechas
									state.tasks.filter(task => task.completed === filterState).map((task) => {
							return localStorage.getItem("theme") === "light" ? (
								<div
									key={task.id}
									id="onlyTask"
									className="onlyTask nes-container with-title"
								>
									<p className="title">Tarea {task.id}</p>
									<label>
										<input
											name="done"
											id="checkTask1"
											type="checkbox"
											checked={task.completed}
											className="onlyCheck nes-checkbox"
											onChange={() => handleCheck(task.id)}
										/>
										<span>{task.name}</span>
									</label>
									<div className="timeContainer">
										<p className="taskTime">{task.time}</p>
									</div>
								</div>
							) : (
								<div
									key={task.id}
									id="onlyTask"
									className="onlyTask nes-container with-title is-dark"
								>
									<p className="title">Tarea {task.id}</p>
									<label>
										<input
											name="done"
											id="checkTask1"
											type="checkbox"
											checked={task.completed}
											className="onlyCheck nes-checkbox is-dark"
											onChange={() => handleCheck(task.id)}
										/>
										<span>{task.name}</span>
									</label>
									<div className="timeContainer">
										<p className="taskTime">{task.time}</p>
									</div>
								</div>
							);
						})
									) : //si son sin hacer
										(
											state.tasks.filter(task => task.completed === filterState).map((task) => {
							return localStorage.getItem("theme") === "light" ? (
								<div
									key={task.id}
									id="onlyTask"
									className="onlyTask nes-container with-title"
								>
									<p className="title">Tarea {task.id}</p>
									<label>
										<input
											name="done"
											id="checkTask1"
											type="checkbox"
											checked={task.completed}
											className="onlyCheck nes-checkbox"
											onChange={() => handleCheck(task.id)}
										/>
										<span>{task.name}</span>
									</label>
									<div className="timeContainer">
										<p className="taskTime">{task.time}</p>
									</div>
								</div>
							) : (
								<div
									key={task.id}
									id="onlyTask"
									className="onlyTask nes-container with-title is-dark"
								>
									<p className="title">Tarea {task.id}</p>
									<label>
										<input
											name="done"
											id="checkTask1"
											type="checkbox"
											checked={task.completed}
											className="onlyCheck nes-checkbox is-dark"
											onChange={() => handleCheck(task.id)}
										/>
										<span>{task.name}</span>
									</label>
									<div className="timeContainer">
										<p className="taskTime">{task.time}</p>
									</div>
								</div>
							);
						}) 
									)
								)
						}
					</div>
		</>
	);
};

export default TaskList;



							

