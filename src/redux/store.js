import {configureStore} from '@reduxjs/toolkit';
import taskSlice from './taskSlice';

export default configureStore({
	reducer:{
		tasks: taskSlice
	},
});