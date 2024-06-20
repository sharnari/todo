import PropTypes from 'prop-types'
import { React, useState, useRef, useEffect } from 'react'
import { formatDistanceToNow } from 'date-fns'
import './todo-list-item.css'

export default function TodoListItem(props) {
  const { id, label, onDeleted, onToggleDone, completed, timer, onEdit, editing, updateLabel } = props
  const [inputValue, setInputValue] = useState(label)
  const [timerTask, setTimerTask] = useState(600)
  const [timerTaskActive, setTimerTaskActive] = useState(false)
  const inputRef = useRef(null)
  const timerId = useRef(null)

  useEffect(() => {
    if (timerTaskActive) {
      timerId.current = setTimeout(() => {
        setTimerTask((prev) => {
          if (prev > 0) {
            return prev - 1
          }
          setTimerTaskActive(false)
          return prev
        })
      }, 1000)
    } else {
      clearTimeout(timerId.current)
    }
    return () => clearTimeout(timerId.current)
  }, [timerTask, timerTaskActive])

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus()
    }
  }, [editing])

  useEffect(() => {
    return () => {
      clearTimeout(timerId.current)
    }
  }, [])

  let classNames = ''
  let checkedFlag = ''
  if (completed) {
    classNames += ' completed'
    checkedFlag = true
  }

  const handleChange = (e) => {
    setInputValue(e.target.value)
  }

  // не меняется editing так как onEdit не может запуститься из-за updateLabel
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

  const startTimer = () => {
    if (!timerTaskActive) {
      setTimerTaskActive(true)
    }
  }

  const stopTimer = () => {
    setTimerTaskActive(false)
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
  }

  const controlView = (editing) => {
    if (!editing) {
      return (
        <>
          <input className="toggle" type="checkbox" onChange={onToggleDone} checked={checkedFlag} />
          <label className="list-item__content">
            <span className="description" onClick={onToggleDone}>
              {label}
              {/* {timerTask} сек. */}
            </span>
            <span className="timer">
              <button className="icon icon-play" onClick={startTimer}></button>
              <button className="icon icon-pause" onClick={stopTimer}></button>
              <span className="time">{formatTime(timerTask)}</span>
            </span>
            {/* <button type="button" className="icon icon-timer" onClick={startTimer}>S</button>
            <button type="button" className="icon icon-stop-timer" onClick={stopTimer}>St</button> */}
            <span className="created">{formatDistanceToNow(timer, { addSuffix: true, includeSeconds: true })}</span>
          </label>
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

TodoListItem.propTypes = {
  id: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  completed: PropTypes.bool,
  onDeleted: PropTypes.func,
  onToggleDone: PropTypes.func,
  timer: PropTypes.instanceOf(Date),
  onEdit: PropTypes.func,
  editing: PropTypes.bool,
  updateLabel: PropTypes.func,
}
