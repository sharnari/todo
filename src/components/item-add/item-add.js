import { Component } from "react";
import PropTypes from "prop-types";
import "./item-add.css";

export default class ItemAdd extends Component {
  state = {
    label: ""
  }
  onLabelChange = (e) => {
    this.setState({
      label: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.props.onItemAdded(this.state.label);
    this.setState({
      label: "",
    });
  };

  render () {
    const addText = 'Click to add a task';
    return (
      <form className="item-add-form"
      onSubmit={this.onSubmit}>
        <input
        type="text"
        className='new-todo'
        onChange={this.onLabelChange}
        placeholder={addText}
        value={this.state.label}
        />
      </form>
    );
  }
}

ItemAdd.propTypes = {
  onItemAdded: PropTypes.func 
};