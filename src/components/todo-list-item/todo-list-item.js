import PropTypes from 'prop-types'
import { React, useState, useRef, useEffect } from 'react'
import { formatDistanceToNow } from 'date-fns'
import './todo-list-item.css'

export default function TodoListItem(props) {
  const {
    id,
    label,
    onDeleted,
    onToggleDone,
    completed,
    timer,
    onEdit,
    editing,
    updateLabel,
    timerStarted,
    setTimerStarted,
    accumulatedTime,
    setAccumulatedTime,
  } = props
  const defaultTimer = 600 - accumulatedTime
  const [inputValue, setInputValue] = useState(label)
  const [timerTask, setTimerTask] = useState(defaultTimer)
  const [timerTaskActive, setTimerTaskActive] = useState(false)
  const inputRef = useRef(null)
  const timerId = useRef(null)

  // componentWillUnmount analog
  useEffect(() => {
    if (timerStarted) {
      console.log('помнит, чтобы был нажат start', timerStarted)
      const elapsedTime = Math.floor((new Date() - new Date(timerStarted)) / 1000)
      setTimerTask(defaultTimer - elapsedTime)
      setTimerTaskActive(true)
    } else {
      console.log('не помнит, чтобы был нажат start', timerStarted)
    }
    return () => {
      if (timerTaskActive) {
        setTimerStarted(id, new Date())
        setTimerTaskActive(false)
        console.log('timer deleted')
      }
    }
  }, [])

  useEffect(() => {
    if (timerTaskActive) {
      setAccumulatedTime(id, 1)
      timerId.current = setTimeout(() => {
        setTimerTask((prev) => {
          if (prev > 0) {
            return prev - 1
          }
          return prev
        })
      }, 1000)
    } else {
      clearTimeout(timerId.current)
    }
    return () => clearTimeout(timerId.current)
  }, [timerTask, timerTaskActive])

  // focus at input place
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

  // const diffSecond = (timeMore, timeLess) => {
  //   const timeStampMore = timeMore.getTime()
  //   const timeStampLess = timeLess.getTime()
  //   const differentSeconds = Math.floor((timeStampMore - timeStampLess) / 1000)
  //   return differentSeconds
  // }

  //-------------------------------------------------------------
  const startTimer = () => {
    if (!timerTaskActive) {
      if (!timerStarted) {
        setTimerStarted(id, new Date())
        console.log('timer was start')
      }
      setTimerTaskActive(true)
    }
  }

  const stopTimer = () => {
    if (timerTaskActive) {
      setTimerStarted(id, null)
      setTimerTaskActive(false)
      console.log('timer was stoped')
    }
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
            </span>
            <span className="timer">
              <button className="icon icon-play" onClick={startTimer}></button>
              <button className="icon icon-pause" onClick={stopTimer}></button>
              <span className="time">{formatTime(timerTask)}</span>
            </span>
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
  timerStarted: PropTypes.instanceOf(Date),
  setTimerStarted: PropTypes.func,
  setAccumulatedTime: PropTypes.func,
  accumulatedTime: PropTypes.number,
}
