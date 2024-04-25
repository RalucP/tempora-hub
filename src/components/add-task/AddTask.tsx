import { ChangeEvent, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd } from '@fortawesome/free-solid-svg-icons';
import Button from '../button/Button';

import './AddTask.styles.scss';
import { useDispatch } from 'react-redux';
import { addTask } from '../../store/tasks/tasks.reducer';
import { addTaskDocumentToUser } from '../../utils/firebase';

const defaultInputValues = {
  createdAt: new Date(),
  task: ''
};

const AddTask = () => {
  const [ inputValues, setInputValues ] = useState(defaultInputValues);
  const { task } = inputValues;

  const dispatch = useDispatch();

  const handleTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setInputValues({...inputValues, task: value});
  }

  const resetInputValues = () => {
    setInputValues(defaultInputValues);
  }

  const handleAddTask = async () => {
    setInputValues({...inputValues, createdAt: new Date()})

    await addTaskDocumentToUser(inputValues);
    dispatch(addTask(task));
    resetInputValues();
  }

  return(
    <div className='add-task-container'>
      <FontAwesomeIcon className='icon' icon={faAdd} />
      <input 
        className='add-task-input' 
        name='task' 
        value={task} 
        onChange={handleTextChange}
        placeholder='Add new task...' 
        type="text" />
      <Button onClick={handleAddTask}>Add</Button>
    </div>
  )
}

export default AddTask;