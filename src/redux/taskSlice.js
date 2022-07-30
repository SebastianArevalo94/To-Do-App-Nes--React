import { createSlice } from "@reduxjs/toolkit";
import { addTaskLS, editTasksLS } from "../helpers/localStorage";

const initialState = {
  tasks: [],
};

const firstLetterCapital = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action) => {
      action.payload.name = firstLetterCapital(action.payload.name);
      state.tasks.push(action.payload);
      addTaskLS(action.payload);
    },
    deleteAll: (state, action) => {
      state.tasks = [];
    },
    checkTask: (state, action) => {
      const searchTask = state.tasks.find((task) => task.id === action.payload);
      if (searchTask) {
        searchTask.completed = !searchTask.completed;
      }
      editTasksLS(state.tasks);
    },
    editTask: (state, action) => {
      const { id, name } = action.payload;
      const taskFind = state.tasks.find((task) => task.id === id);
      if (taskFind) {
        taskFind.name = firstLetterCapital(name);
      }
      editTasksLS(state.tasks);
    },
    deleteTask: (state, action) => {
      const taskFind = state.tasks.find((task) => task.id === action.payload);
      if (taskFind) {
        state.tasks.splice(state.tasks.indexOf(taskFind), 1);
      }
      editTasksLS(state.tasks);
    },
    setTasksLS: (state, action) => {
      state.tasks = action.payload;
    },
  },
});

export const {
  addTask,
  deleteAll,
  checkTask,
  editTask,
  deleteTask,
  setTasksLS,
} = taskSlice.actions;

export default taskSlice.reducer;
