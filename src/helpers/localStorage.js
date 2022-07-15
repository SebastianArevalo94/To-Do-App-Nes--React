import {useDispatch} from 'react';
import {setTasksLS} from '../redux/taskSlice';

export const getLSData = () => {
	let ls = JSON.parse(localStorage.getItem('tasks'));
	if(ls===null){
		let newTasksLS = [];
		localStorage.setItem('tasks', JSON.stringify(newTasksLS));
		return newTasksLS
	} else {
		return JSON.parse(localStorage.getItem('tasks'));
	}
};

export const cleanLS = () => {
	let ls = JSON.parse(localStorage.getItem('tasks'));
	ls = [];
	localStorage.setItem('tasks', JSON.stringify(ls));
};

export const addTaskLS = (task) => {
	let tasksLS = JSON.parse(localStorage.getItem('tasks'))
	tasksLS.push(task);
	localStorage.setItem('tasks', JSON.stringify(tasksLS));
};

export const editTasksLS = (tasks) => {
	localStorage.setItem('tasks', JSON.stringify(tasks))
};