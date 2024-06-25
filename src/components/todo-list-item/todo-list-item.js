import PropTypes from 'prop-types'
import { React, Component, createRef } from 'react'
import { formatDistanceToNow } from 'date-fns'
import './todo-list-item.css'

export default class TodoListItem extends Component {
  constructor(props) {
    super(props)
    const defaultTimer = 600 /* - this.props.accumulatedTime*/
    this.state = {
      inputValue: this.props.label,
      timerTask: defaultTimer,
      timerTaskActive: false,
    }
    this.inputRef = createRef()
    this.timerId = null
  }

  componentDidMount() {
    this.setState({ timerTask: this.state.timerTask })
    // if (this.props.setTimerStarted) {
    //   const elapledTime = this.defaultTimer
    //   this.setState({ timerTask: this.state.timerTask - elapledTime, timerTaskActive: true })
    // }
    // if (this.props.editing && this.inputRef.current) {
    //   this.inputRef.current.focus()
    // }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.timerTaskActive && !prevState.timerTaskActive) {
      this.props.setAccumulatedTime(this.props.id, 1)
      this.timerId = setInterval(() => {
        this.setState((prevState) => {
          if (prevState.timerTask > 0) {
            return { timerTask: prevState.timerTask - 1 }
          }
          return prevState
        })
      }, 1000)
    } else if (!this.state.timerTaskActive && prevState.timerTaskActive) {
      clearInterval(this.timerId)
    }
    if (this.props.editing && !prevProps.editing && this.inputRef.current) {
      this.inputRef.current.focus()
    }
  }

  componentWillUnmount() {
    if (this.state.timerTaskActive) {
      this.props.setTimerStarted(this.props.id, new Date())
      this.setState({ timerTaskActive: false })
    }
    clearInterval(this.timerId)
  }

  handleChange = (e) => {
    this.setState({ inputValue: e.target.value })
  }

  handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      const newLabel = this.state.inputValue
      this.props.updateLabel(this.props.id, newLabel)
    } else if (e.key === 'Escape') {
      this.props.onEdit(this.props.id)
      this.setState({ inputValue: this.props.label })
    }
  }

  handleBlur = () => {
    this.props.onEdit(this.props.id)
    if (this.state.inputValue !== this.props.label) {
      this.setState({ inputValue: this.props.label })
    }
  }

  startTimer = () => {
    if (!this.state.timerTaskActive) {
      if (!this.props.timerStarted) {
        this.props.setTimerStarted(this.props.id, new Date())
      }
      this.setState({ timerTaskActive: true })
    }
  }

  stopTimer = () => {
    if (this.state.timerTaskActive) {
      this.props.setTimerStarted(this.props.id, null)
      this.setState({ timerTaskActive: false })
    }
  }

  formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
  }

  render() {
    const { label, onDeleted, onToggleDone, completed, timer, onEdit, editing } = this.props
    const { inputValue, timerTask } = this.state
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
                <button className="icon icon-play" onClick={this.startTimer}></button>
                <button className="icon icon-pause" onClick={this.stopTimer}></button>
                <span className="time">{this.formatTime(timerTask)}</span>
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
              onBlur={this.handleBlur}
              ref={this.inputRef}
              onChange={this.handleChange}
              onKeyDown={this.handleKeyDown}
            />
          </div>
        )
      }
    }
    return <div className={`view${classNames}`}>{controlView(editing)}</div>
  }
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

// const diffSecond = (timeMore, timeLess) => {
//   const timeStampMore = timeMore.getTime()
//   const timeStampLess = timeLess.getTime()
//   const differentSeconds = Math.floor((timeStampMore - timeStampLess) / 1000)
//   return differentSeconds
// }
