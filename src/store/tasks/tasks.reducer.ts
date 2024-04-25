import { createSlice } from "@reduxjs/toolkit";

export type TaskState = {
  readonly tasks: string[];

};

const INITIAL_STATE: TaskState = {
  tasks: []
};

const addNewTask = (tasks: TaskState, newTask: string) => {
  return [...tasks.tasks, newTask];
}

export const taskSlice = createSlice({
  name: 'task',
  initialState: INITIAL_STATE,
  reducers: {
    setTask(state, action) {
      state.tasks = action.payload;
    },
    addTask(state, action) {
      state.tasks = addNewTask(state, action.payload)
    }
  }
});

export const { setTask, addTask } = taskSlice.actions;

export const taskReducer = taskSlice.reducer;