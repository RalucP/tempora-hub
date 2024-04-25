import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { TaskState } from "./tasks.reducer";

export const selectTasksReducer = ( state: RootState ): TaskState => state.task;

export const selectTasks = createSelector(
  selectTasksReducer,
  (task) => task.tasks
)