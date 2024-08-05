import { useState } from 'react'
import PropTypes from 'prop-types'

import './item-add.css'

const ItemAdd = ({ onItemAdded }) => {
  const [label, setLabel] = useState('')
  const [min, setMin] = useState('')
  const [sec, setSec] = useState('')

  const onLabelChange = (e) => {
    setLabel(e.target.value)
  }

  const isOnlyNumber = (value) => {
    return /^\d+$/.test(value)
  }

  const onMinutesChange = (e) => {
    if (isOnlyNumber(e.target.value) || e.target.value === '') {
      setMin(e.target.value)
    }
  }

  const onSecondsChange = (e) => {
    if (isOnlyNumber(e.target.value) || e.target.value === '') {
      setSec(e.target.value)
    }
  }

  const onSubmit = (e) => {
    e.preventDefault()
    if (label !== '' && (!/\s+/.test(label) || /\S+/.test(label))) {
      onItemAdded(label, Number(min) * 60 + Number(sec))
    }
    setLabel('')
    setMin('')
    setSec('')
  }

  const addText = 'Click to add a task'
  const addMinutes = 'Min'
  const addSeconds = 'Sec'
  return (
    <form className="item-add-form" onSubmit={onSubmit}>
      <input type="text" className="new-todo main" onChange={onLabelChange} placeholder={addText} value={label} />
      <input type="text" className="new-todo small" onChange={onMinutesChange} value={min} placeholder={addMinutes} />
      <input type="text" className="new-todo small" onChange={onSecondsChange} value={sec} placeholder={addSeconds} />
      <button type="submit"></button> {/*Кнопа отправки формы сделана для того, чтобы сработал input*/}
    </form>
  )
}

ItemAdd.propTypes = {
  onItemAdded: PropTypes.func,
}

export default ItemAdd
