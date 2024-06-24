import PropTypes from 'prop-types'
import { React } from 'react'

import TodoListItem from '../todo-list-item'
import './todo-list.css'

function TodoList({
  onDeleted,
  onToggleDone,
  todos,
  onEdit,
  updateLabel,
  setTimerTaskActive,
  setTimerStarted,
  setAccumulatedTime,
}) {
  const elements = todos.map((item) => {
    const { id, ...itemProps } = item
    return (
      <li key={id} className="">
        <TodoListItem
          id={id}
          {...itemProps}
          onDeleted={() => onDeleted(id)}
          onToggleDone={() => onToggleDone(id)}
          onEdit={() => onEdit(id)}
          updateLabel={updateLabel}
          setTimerTaskActive={setTimerTaskActive}
          setTimerStarted={setTimerStarted}
          setAccumulatedTime={setAccumulatedTime}
        />
        <input type="text" className="edit" />
      </li>
    )
  })
  return <ul className="todo-list">{elements}</ul>
}

TodoList.propTypes = {
  onDeleted: PropTypes.func,
  onEdit: PropTypes.func,
  onToggleDone: PropTypes.func,
  updateLabel: PropTypes.func,
  setTimerTaskActive: PropTypes.func,
  setTimerStarted: PropTypes.func,
  setAccumulatedTime: PropTypes.func,
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
      id: PropTypes.number.isRequired,
      timer: PropTypes.instanceOf(Date),
      editing: PropTypes.bool,
    })
  ),
}

export default TodoList
