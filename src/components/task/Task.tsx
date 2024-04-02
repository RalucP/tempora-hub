import { FC, InputHTMLAttributes, LabelHTMLAttributes } from 'react'
import './Task.styles.scss'

export type TaskProps = {
  status: boolean
} & InputHTMLAttributes<HTMLInputElement> 
& LabelHTMLAttributes<HTMLLabelElement>

const Task: FC<TaskProps> = ({ status, id, children, ...otherProps }) => {
  return (
    <div className='task-container'>
      <input type="checkbox" className='task-checkbox' id={id} {...otherProps} checked={status}/>
      <label htmlFor={id} className='task-label'>{children}</label>
    </div>
  )
}

export default Task;