import AddTask from '../add-task/AddTask';
import Task from '../task/Task';

import './TasksContainer.styles.scss';

const TasksContainer = () => {

  return(
    <div className='tasks-container'>
      <AddTask />
      <Task 
          id='task1'
          name='task1'
        >Lorem ipsum</Task>
        <Task 
          id='task2'
          name='task2'
        >Lorem ipsum dolor sit amet</Task>
    </div>
  )
}

export default TasksContainer;