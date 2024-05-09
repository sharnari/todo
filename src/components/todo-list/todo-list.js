import PropTypes from 'prop-types'
import { React } from 'react'

import TodoListItem from '../todo-list-item'
import './todo-list.css'

function TodoList({ onDeleted, onToggleDone, todos }) {
  const elements = todos.map((item) => {
    const { id, ...itemProps } = item
    const { label, completed, timer } = itemProps
    return (
      <li key={id} className="">
        <TodoListItem
          label={label}
          completed={completed}
          timer={timer}
          onDeleted={() => onDeleted(id)}
          onToggleDone={() => onToggleDone(id)}
        />
        <input type="text" className="edit" />
      </li>
    )
  })
  return <ul className="todo-list">{elements}</ul>
}

TodoList.defaultProps = {
  onDeleted: () => {},
  onToggleDone: () => {},
  todos: [],
}

TodoList.propTypes = {
  onDeleted: PropTypes.func,
  onToggleDone: PropTypes.func,
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
      id: PropTypes.number.isRequired,
      timer: PropTypes.instanceOf(Date),
    })
  ),
}

export default TodoList
