import { Component, React } from 'react'

import AppHeader from '../app-header'
import TodoList from '../todo-list'
import Footer from '../footer'
import './app.css'
import './normalize.css'

export default class App extends Component {
  static filterData = (data, filterName) => {
    if (filterName === 'All') {
      return data
    }
    if (filterName === 'Active') {
      return data.filter((el) => !el.completed)
    }
    return data.filter((el) => el.completed)
  }

  maxId = 0

  constructor(props) {
    super(props)
    this.state = {
      todoData: [],
      classFilter: 'All',
    }
  }

  componentDidMount() {
    this.setState(() => {
      return {
        todoData: [
          this.createTodoItem('Filter'),
          this.createTodoItem('Feature change tasks'),
          this.createTodoItem('Clear completed'),
          this.createTodoItem('Create timer of task'),
        ],
      }
    })
  }

  onSelectedFilter = (filter) => {
    this.setState(() => ({
      classFilter: filter,
    }))
  }

  static onToggleProperty(arr, id, propName) {
    const index = arr.findIndex((el) => el.id === id)
    const oldItem = arr[index]
    const newItem = {
      ...oldItem,
      [propName]: !oldItem[propName],
    }
    const before = arr.slice(0, index)
    const after = arr.slice(index + 1)
    return [...before, newItem, ...after]
  }

  addItem = (text) => {
    const newItem = this.createTodoItem(text)
    this.setState(({ todoData }) => {
      const newArr = [...todoData, newItem]
      return {
        todoData: newArr,
      }
    })
  }

  // Deletes all completed tasks
  clearCompleted = () => {
    const { todoData } = this.state
    const listCompleted = todoData.filter((el) => el.completed)
    listCompleted.forEach((element) => {
      this.deleteItem(element.id)
    })
  }

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const index = todoData.findIndex((el) => el.id === id)
      const before = todoData.slice(0, index)
      const after = todoData.slice(index + 1)
      const newArray = [...before, ...after]
      return {
        todoData: newArray,
      }
    })
  }

  onToggleDone = (id) => {
    this.setState(({ todoData }) => ({
      todoData: App.onToggleProperty(todoData, id, 'completed'),
    }))
  }

  createTodoItem(label) {
    this.maxId += 1
    return {
      label,
      completed: false,
      id: this.maxId,
      timer: new Date(),
      editing: false,
      timerStarted: null,
      accumulatedTime: 0,
    }
  }

  setAccumulatedTime = (id, newTimeSec) => {
    const { todoData } = this.state
    const index = todoData.findIndex((el) => el.id === id)
    const oldItem = todoData[index]
    const newItem = {
      ...oldItem,
      accumulatedTime: oldItem.accumulatedTime + newTimeSec,
    }
    const before = todoData.slice(0, index)
    const after = todoData.slice(index + 1)
    this.setState(() => ({
      todoData: [...before, newItem, ...after],
    }))
  }

  setTimerStarted = (id, newValue) => {
    const { todoData } = this.state
    const index = todoData.findIndex((el) => el.id === id)
    const oldItem = todoData[index]
    const newItem = {
      ...oldItem,
      timerStarted: newValue,
    }
    const before = todoData.slice(0, index)
    const after = todoData.slice(index + 1)
    this.setState(() => ({
      todoData: [...before, newItem, ...after],
    }))
  }

  /*
   * reverses the editing flag
   */
  onEdit = (id) => {
    const { todoData } = this.state
    const index = todoData.findIndex((el) => el.id === id)
    const oldItem = todoData[index]
    const newItem = {
      ...oldItem,
      editing: !oldItem.editing,
    }
    const before = todoData.slice(0, index)
    const after = todoData.slice(index + 1)
    this.setState(() => ({
      todoData: [...before, newItem, ...after],
    }))
  }

  updateLabel = (id, newLabel) => {
    const { todoData } = this.state
    const index = todoData.findIndex((el) => el.id === id)
    const oldItem = todoData[index]
    const newItem = {
      ...oldItem,
      label: newLabel,
      editing: !oldItem.editing,
    }
    const before = todoData.slice(0, index)
    const after = todoData.slice(index + 1)
    this.setState(() => ({
      todoData: [...before, newItem, ...after],
    }))
  }

  render() {
    const { todoData, classFilter } = this.state
    const unDoneCount = todoData.filter((el) => !el.completed).length
    return (
      <section className="todoapp">
        <AppHeader onAdded={this.addItem} />
        <section className="main">
          <TodoList
            todos={App.filterData(todoData, classFilter)}
            onDeleted={this.deleteItem}
            onToggleDone={this.onToggleDone}
            onEdit={this.onEdit}
            updateLabel={this.updateLabel}
            setTimerStarted={this.setTimerStarted}
            setAccumulatedTime={this.setAccumulatedTime}
          />
          <Footer
            unDoneCount={unDoneCount}
            clearCompleted={this.clearCompleted}
            onSelectedFilter={this.onSelectedFilter}
            selectedFilter={classFilter}
          />
        </section>
      </section>
    )
  }
}
