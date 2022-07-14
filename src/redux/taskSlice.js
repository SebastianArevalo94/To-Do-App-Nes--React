import {createSlice} from '@reduxjs/toolkit';

const initialState = ({
	tasks: []
});

const firstLetterCapital = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const taskSlice = createSlice ({
	name: 'tasks',
	initialState,
	reducers :{
		addTask: (state, action) => {
			action.payload.name = firstLetterCapital(action.payload.name);
			state.tasks.push(action.payload)
		},
		deleteAll: (state, action) => {
			state.tasks = []
		},
		checkTask: (state, action) => {
			const searchTask = state.tasks.find(task => task.id === action.payload);
			if(searchTask){
				searchTask.completed = !searchTask.completed;
			};
		}
	}
});

export const {addTask, deleteAll, checkTask} = taskSlice.actions;

export default taskSlice.reducer;
