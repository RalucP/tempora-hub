import { createSlice } from "@reduxjs/toolkit";
import { Task } from "./task.types";

export type TaskState = {
  readonly tasks: Task[];

};

const INITIAL_STATE: TaskState = {
  tasks: []
};

const addNewTask = (tasks: TaskState, newTask: Task) => {
  return [...tasks.tasks, newTask];
}

export const taskSlice = createSlice({
  name: 'task',
  initialState: INITIAL_STATE,
  reducers: {
    setTasks(state, action) {
      state.tasks = action.payload;
    },
    addTask(state, action) {
      state.tasks = addNewTask(state, action.payload)
    }
  }
});

export const { setTasks, addTask } = taskSlice.actions;

export const taskReducer = taskSlice.reducer;