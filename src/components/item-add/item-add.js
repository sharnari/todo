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
    onItemAdded(label)
    this.setState({
      label: '',
    })
  }

  render() {
    const addText = 'Click to add a task'
    const { label } = this.state
    return (
      <form className="item-add-form" onSubmit={this.onSubmit}>
        <input type="text" className="new-todo" onChange={this.onLabelChange} placeholder={addText} value={label} />
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
