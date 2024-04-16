import "./todo-list-item.css";
import PropTypes from "prop-types";
import { Component } from "react";


export default class TodoListItem extends Component {
  state = {
    completed: false
  };
  onLabelClick = () => {
      this.setState(({completed}) => {
        return {
          completed: !completed
        }
      });
    };
  render() {
    const { label } = this.props;
    const { completed } = this.state;
    let classNames = '';
    if (completed) {
      classNames += ' completed';
    }
    return (
      <div className={"view" + classNames}>
        <input className="toggle" type="checkbox" />
        <label>
          <span className="description"
          onClick = { this.onLabelClick }>
            {label}</span>
          <span className="created">created 17 seconds ago</span>
        </label>
        <button className="icon icon-edit"></button>
        <button className="icon icon-destroy"></button>
      </div>
      
    );
  }
}
  


TodoListItem.propTypes = {
  label: PropTypes.string.isRequired,
  important: PropTypes.bool.isRequired
};