import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Task } from "./task.types";
import { deleteTaskFromFirebase, updateTaskStatusInFirestore } from "../../utils/firebase";

export type TaskState = {
  readonly tasks: Task[];

};

const INITIAL_STATE: TaskState = {
  tasks: []
};

const addNewTask = (tasks: TaskState, newTask: Task) => {
  return [...tasks.tasks, newTask];
}

const setStatus = (tasks: TaskState, taskToBeUpdatedId: string) => {
  return tasks.tasks.map((task) => {
    let tempStatus = false;

    if(task.id === taskToBeUpdatedId){
      tempStatus = !task.status;
      return {...task, status: tempStatus}
    }

    return task;
  })
}

const removeTask = (tasks: TaskState, taskToBeDeletedId: string) => {
  const existingTask = tasks.tasks.find((task) => task.id === taskToBeDeletedId)

  if(!existingTask) return tasks.tasks;

  return tasks.tasks.filter(task =>  task.id !== taskToBeDeletedId)
}

export const updateTaskStatus = createAsyncThunk(
  'task/updateStatus',
  async ({ id, status }: { id: string; status: boolean }) => {
    try{
      await updateTaskStatusInFirestore(id, status);
      return id;
    }
    catch (error) {
      console.log("Error while updating task status: " + error);
    }
})

export const deleteTask = createAsyncThunk(
  'task/deleteTask', 
  async ({id}: {id: string}) => {
    try{
      await deleteTaskFromFirebase(id);
      return id;
    }
    catch(error) {
      console.log("There was a problem deleting the task: " + error);
    }
  }
)

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
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateTaskStatus.fulfilled, (state, action) => {
        const taskId = action.payload;

        if(!taskId) return;

        state.tasks = setStatus(state, taskId);
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        const taskId = action.payload;

        if(!taskId) return;

        state.tasks = removeTask(state, taskId);
      })
  }
});

export const { setTasks, addTask } = taskSlice.actions;

export const taskReducer = taskSlice.reducer;