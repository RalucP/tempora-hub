import { ChangeEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd } from '@fortawesome/free-solid-svg-icons';
import Button from '../button/Button';

import './AddTask.styles.scss';
import { addTask } from '../../store/tasks/tasks.reducer';
import { addTaskDocumentToUser } from '../../utils/firebase';

import { Task } from '../../store/tasks/task.types';

const defaultInputValues: Task = {
  id: '',
  content: ''
};

const AddTask = () => {
  const [ inputValues, setInputValues ] = useState(defaultInputValues);
  const { content } = inputValues;

  const dispatch = useDispatch();

  const handleTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setInputValues({...inputValues, content: value});
  }

  const resetInputValues = () => {
    setInputValues(defaultInputValues);
  }

  const handleAddTask = async () => {
    const taskId = uuidv4();
    const newTask = { ...inputValues, id: taskId };

    await addTaskDocumentToUser(newTask);
    dispatch(addTask(newTask));
    resetInputValues();
  }

  return(
    <div className='add-task-container'>
      <FontAwesomeIcon className='icon' icon={faAdd} />
      <input 
        className='add-task-input' 
        name='task' 
        value={content} 
        onChange={handleTextChange}
        placeholder='Add new task...' 
        type="text" />
      <Button onClick={handleAddTask}>Add</Button>
    </div>
  )
}

export default AddTask;