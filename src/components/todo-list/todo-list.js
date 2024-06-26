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
  setIsTimerStart,
  setAccumulatedTime,
  setDateUnmount,
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
          setIsTimerStart={setIsTimerStart}
          setAccumulatedTime={setAccumulatedTime}
          setDateUnmount={setDateUnmount}
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
  setIsTimerStart: PropTypes.func,
  setAccumulatedTime: PropTypes.func,
  setDateUnmount: PropTypes.func,
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
      id: PropTypes.number.isRequired,
      timer: PropTypes.instanceOf(Date),
      editing: PropTypes.bool,
      seconds: PropTypes.number,
    })
  ),
}

export default TodoList
