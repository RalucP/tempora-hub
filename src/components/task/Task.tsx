import { FC, InputHTMLAttributes, LabelHTMLAttributes, useState } from 'react';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { deleteTask, updateTaskStatus } from '../../store/tasks/tasks.reducer';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

import './Task.styles.scss'

export type TaskProps = InputHTMLAttributes<HTMLInputElement> 
& LabelHTMLAttributes<HTMLLabelElement>

const Task: FC<TaskProps> = ({ id, children, checked, ...otherProps }) => {
  const [ status, setStatus ] = useState(checked);
  const dispatch = useAppDispatch();

  const onCheckboxChange = async () => {
    if(!id || !children) return;

    const newStatus = !status;
    setStatus(newStatus);

    const payload = {
      id,
      status: newStatus
    }

    dispatch(updateTaskStatus(payload));
  }

  const onDeleteTask = async () => {
    if(!id) return;

    const payload = {
      id
    }

    dispatch(deleteTask(payload));
  }

  return (
    <div className='task-container'>
      <input 
        type="checkbox" 
        className='task-checkbox' 
        id={id} 
        onChange={onCheckboxChange} 
        checked={status}
        {...otherProps} 
      />
      <label htmlFor={id} className='task-label'>
        {children}
      </label>
      <FontAwesomeIcon onClick={onDeleteTask} className='icon' icon={faTrash}/>
    </div>
  )
}

export default Task;