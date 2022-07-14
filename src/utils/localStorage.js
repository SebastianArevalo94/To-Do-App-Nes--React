export const getLocalStorage = () => {
	const tasks = localStorage.getItem('tasks');
	if(tasks===null){
		return undefined
	}
	return JSON.parse(tasks)
};

export const setLocalStorage = (state) => {
	const tasks = JSON.stringify(state);
	localStorage.setItem('tasks', tasks);
}