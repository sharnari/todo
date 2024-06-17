import PropTypes from 'prop-types'
import { React } from 'react'
import { formatDistanceToNow } from 'date-fns'
import './todo-list-item.css'

export default function TodoListItem(props) {
  const { label, onDeleted, onToggleDone, completed, timer, onEdit } = props

  let classNames = ''
  let checkedFlag = ''
  if (completed) {
    classNames += ' completed'
    checkedFlag = true
  }
  return (
    <div className={`view${classNames}`}>
      <input className="toggle" type="checkbox" onChange={onToggleDone} checked={checkedFlag} />
      <label>
        <span className="description" onClick={onToggleDone}>
          {label}
        </span>
        <span className="created">{formatDistanceToNow(timer, { addSuffix: true, includeSeconds: true })}</span>
      </label>
      <button type="button" className="icon icon-edit" onClick={onEdit} />
      <button type="button" className="icon icon-destroy" onClick={onDeleted} />
    </div>
  )
}

TodoListItem.propTypes = {
  label: PropTypes.string.isRequired,
  completed: PropTypes.bool,
  onDeleted: PropTypes.func,
  onToggleDone: PropTypes.func,
  timer: PropTypes.instanceOf(Date),
  onEdit: PropTypes.func,
}
