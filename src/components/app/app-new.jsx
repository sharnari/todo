import { useLayoutEffect, useState } from 'react'

import AppHeader from '../app-header'
import TodoList from '../todo-list'
import Footer from '../footer'
import './app.css'
import './normalize.css'

export default function App() {
  const [todoData, setTodoData] = useState([])
  const [classFilter, setClassFilter] = useState('All')
  const [maxId, setMaxId] = useState(0)
  const [timerInterval, setTimerInterval] = useState(null)

  const createTodoItem = (label, accumulatedTime = 600) => {
    setMaxId((prevMaxId) => prevMaxId + 1)
    return {
      label,
      completed: false,
      id: maxId,
      timer: new Date(),
      editing: false,
      isTimerStart: false,
      accumulatedTime,
    }
  }

  useLayoutEffect(() => {
    return () => clearTimerInterval()
  }, [createTodoItem, maxId])

  const startTimerInterval = () => {
    if (!timerInterval) {
      const intervalId = setInterval(setAccumulatedTime, 1000)
      setTimerInterval(intervalId)
    }
  }

  const clearTimerInterval = () => {
    if (timerInterval) {
      clearInterval(timerInterval)
      setTimerInterval(null)
    }
  }

  const setAccumulatedTime = () => {
    setTodoData((prevTodoData) =>
      prevTodoData.map((item) =>
        item.isTimerStart && item.accumulatedTime > 0 ? { ...item, accumulatedTime: item.accumulatedTime - 1 } : item
      )
    )
  }

  const addItem = (text, seconds) => {
    const newItem = createTodoItem(text, seconds)
    setTodoData((prevTodoData) => [...prevTodoData, newItem])
  }

  const clearCompleted = () => {
    setTodoData((prevTodoData) => prevTodoData.filter((el) => el.completed))
  }

  const deleteItem = (id) => {
    setTodoData((prevTodoData) => {
      const newArray = prevTodoData.filter((el) => el.id !== id)
      if (!newArray.some((item) => item.isTimerStart)) {
        clearTimerInterval()
      }
      return newArray
    })
  }

  const onToggleDone = (id) => {
    setTodoData((prevTodoData) => toggleProperty(prevTodoData, id, 'completed'))
  }

  const toggleProperty = (arr, id, propName) => {
    const index = arr.findIndex((el) => el.id === id)
    const oldItem = arr[index]
    const newItem = {
      ...oldItem,
      [propName]: !oldItem[propName],
    }
    return [...arr.slice(0, index), newItem, ...arr.slice(index + 1)]
  }

  const setIsTimerStart = (id) => {
    setTodoData((prevTodoData) => {
      const newArray = toggleProperty(prevTodoData, id, 'isTimerStart')
      startTimerInterval()
      return newArray
    })
  }

  const setIsTimerStop = (id) => {
    setTodoData((prevTodoData) => {
      const newArray = toggleProperty(prevTodoData, id, 'isTimerStart')
      if (!newArray.some((item) => item.isTimerStart)) {
        clearTimerInterval()
      }
      return newArray
    })
  }

  const onEdit = (id) => {
    setTodoData((prevTodoData) => {
      const index = prevTodoData.findIndex((el) => el.id === id)
      const oldItem = prevTodoData[index]
      const newItem = {
        ...oldItem,
        editing: !oldItem.editing,
      }
      return [...prevTodoData.slice(0, index), newItem, ...prevTodoData.slice(index + 1)]
    })
  }

  const updateLabel = (id, newLabel) => {
    setTodoData((prevTodoData) => {
      const index = prevTodoData.findIndex((el) => el.id === id)
      const oldItem = prevTodoData[index]
      const newItem = {
        ...oldItem,
        label: newLabel,
        editing: !oldItem.editing,
      }
      return [...prevTodoData.slice(0, index), newItem, ...prevTodoData.slice(index + 1)]
    })
  }

  const onSelectedFilter = (filter) => {
    setClassFilter(filter)
  }

  const filterData = (data, filterName) => {
    if (filterName === 'All') {
      return data
    }
    if (filterName === 'Active') {
      return data.filter((el) => !el.completed)
    }
    return data.filter((el) => el.completed)
  }

  const unDoneCount = todoData.filter((el) => !el.completed).length

  return (
    <section className="todoapp">
      <AppHeader onAdded={addItem} />
      <section className="main">
        <TodoList
          todos={filterData(todoData, classFilter)}
          onDeleted={deleteItem}
          onToggleDone={onToggleDone}
          onEdit={onEdit}
          updateLabel={updateLabel}
          setIsTimerStart={setIsTimerStart}
          setIsTimerStop={setIsTimerStop}
        />
        <Footer
          unDoneCount={unDoneCount}
          clearCompleted={clearCompleted}
          onSelectedFilter={onSelectedFilter}
          selectedFilter={classFilter}
        />
      </section>
    </section>
  )
}
