import { Component, React } from 'react'
import PropTypes from 'prop-types'
import './item-add.css'

export default class ItemAdd extends Component {
  constructor(props) {
    super(props)
    this.state = {
      label: '',
    }
  }

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value,
    })
  }

  onSubmit = (e) => {
    e.preventDefault()
    const { label } = this.state
    const { onItemAdded } = this.props
    if (label !== '' && (!/\s+/.test(label) || /\S+/.test(label))) {
      onItemAdded(label)
    }
    this.setState({
      label: '',
    })
  }

  render() {
    const addText = 'Click to add a task'
    const addMinutes = 'Min'
    const addSeconds = 'Sec'
    const { label } = this.state
    return (
      <form className="item-add-form" onSubmit={this.onSubmit}>
        <input
          type="text"
          className="new-todo main"
          onChange={this.onLabelChange}
          placeholder={addText}
          value={label}
        />
        <input type="text" className="new-todo small" placeholder={addMinutes} />
        <input type="text" className="new-todo small" placeholder={addSeconds} />
        <button type="submit"></button> {/*Кнопа отправки формы сделана для того, чтобы сработал input*/}
      </form>
    )
  }
}

ItemAdd.defaultProps = {
  onItemAdded: () => {},
}

ItemAdd.propTypes = {
  onItemAdded: PropTypes.func,
}
