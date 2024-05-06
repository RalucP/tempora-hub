import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Task } from "./task.types";
import { deleteTaskFromFirebase, getTaskCollectionFromUser, updateTaskStatusInFirestore } from "../../utils/firebase";

export type TaskState = {
  readonly tasks: Task[];

};

const INITIAL_STATE: TaskState = {
  tasks: []
};

const addNewTask = (tasks: Task[], newTask: Task) => {
  return [newTask, ...tasks];
}

const setStatus = (tasks: Task[], taskToBeUpdatedId: string) => {
  return tasks.map((task) => {
    let tempStatus = false;

    if(task.id === taskToBeUpdatedId){
      tempStatus = !task.status;
      return {...task, status: tempStatus}
    }

    return task;
  })
}

const removeTask = (tasks: Task[], taskToBeDeletedId: string) => {
  const existingTask = tasks.find((task) => task.id === taskToBeDeletedId)

  if(!existingTask) return tasks;

  return tasks.filter(task =>  task.id !== taskToBeDeletedId)
}

const sortTasksByStatus = (tasks: Task[]) => {
  return tasks.sort((taskA, taskB) => {
    if (taskA.status === false && taskB.status === true) {
      return -1; // taskA comes before taskB
    } else if (taskA.status === true && taskB.status === false) {
      return 1; // taskB comes before taskA
    } else {
      return 0; // Keep the order unchanged
    }
  })
}

export const setTasks = createAsyncThunk(
  'task/setTasks',
  async() => {
    try {
      const tasks = await getTaskCollectionFromUser();
      return tasks;
    }
    catch (error) {
      console.log("Error fetching tasks: " + error);
    }
  }
)

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
    addTask(state, action) {
      state.tasks = sortTasksByStatus(addNewTask(state.tasks, action.payload))
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(setTasks.fulfilled, (state, action) => {
        if(!action.payload) return;

        const tasks = action.payload.map((data) => {
          return {
            id: data.id,
            content: data.content,
            status: data.status
          }
        });

        state.tasks = sortTasksByStatus(tasks);
      })
      .addCase(updateTaskStatus.fulfilled, (state, action) => {
        const taskId = action.payload;

        if(!taskId) return;

        state.tasks = sortTasksByStatus(setStatus(state.tasks, taskId));
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        const taskId = action.payload;

        if(!taskId) return;

        state.tasks = sortTasksByStatus(removeTask(state.tasks, taskId));
      })
  }
});

export const { addTask } = taskSlice.actions;

export const taskReducer = taskSlice.reducer;