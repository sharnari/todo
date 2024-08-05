import { createRef, useEffect, useState, useRef } from 'react'
import PropTypes from 'prop-types'
import { formatDistanceToNow } from 'date-fns'

import './todo-list-item.css'

const TodoListItem = ({
  id,
  label,
  editing,
  updateLabel,
  onEdit,
  setIsTimerStart,
  setIsTimerStop,
  accumulatedTime,
  onDeleted,
  timer,
  completed,
  onToggleDone,
}) => {
  const [inputValue, setInputValue] = useState(label)
  const inputRef = createRef()
  const prevEditingRef = useRef(editing)

  useEffect(() => {
    if (editing && inputRef.current) {
      this.inputRef.current.focus()
    }
  }, [])

  useEffect(() => {
    if (editing && !prevEditingRef.current) {
      inputRef.current?.focus()
    }
    prevEditingRef.current = editing
  }, [editing])

  const handleChange = (e) => {
    setInputValue(e.target.value)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      const newLabel = inputValue
      updateLabel(id, newLabel)
    } else if (e.key === 'Escape') {
      onEdit(id)
      setInputValue(label)
    }
  }

  const handleBlur = () => {
    onEdit(id)
    if (inputValue !== label) {
      setInputValue(label)
    }
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
  }

  let classNames = ''
  let checkedFlag = ''
  if (completed) {
    classNames += ' completed'
    checkedFlag = true
  }

  const controlView = () => {
    if (!editing) {
      return (
        <>
          <input className="toggle" type="checkbox" onChange={onToggleDone} checked={checkedFlag} />
          <label className="list-item__content">
            <span className="description" onClick={onToggleDone}>
              {label}
            </span>
            <span className="timer">
              <button className="icon icon-play" onClick={setIsTimerStart}></button>
              <button className="icon icon-pause" onClick={setIsTimerStop}></button>
              <span className="time">{formatTime(accumulatedTime)}</span>
            </span>
            <span className="created">{formatDistanceToNow(timer, { addSuffix: true, includeSeconds: true })}</span>
          </label>
          {/*---------------------------warning----------------------------------*/}
          <button type="button" className="icon icon-edit" onClick={onEdit} />
          <button type="button" className="icon icon-destroy" onClick={onDeleted} />
        </>
      )
    } else {
      return (
        <div className="flexing-right">
          <input
            type="text"
            className="editing"
            value={inputValue}
            onBlur={handleBlur}
            ref={inputRef}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
        </div>
      )
    }
  }

  return <div className={`view${classNames}`}>{controlView(editing)}</div>
}

export default TodoListItem

TodoListItem.propTypes = {
  id: PropTypes.number,
  label: PropTypes.string,
  completed: PropTypes.bool,
  onDeleted: PropTypes.func,
  onToggleDone: PropTypes.func,
  timer: PropTypes.instanceOf(Date),
  onEdit: PropTypes.func,
  editing: PropTypes.bool,
  updateLabel: PropTypes.func,
  isTimerStart: PropTypes.bool,
  setIsTimerStart: PropTypes.func,
  setIsTimerStop: PropTypes.func,
  accumulatedTime: PropTypes.number,
}
