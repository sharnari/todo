import "./todo-list-item.css";
import PropTypes from "prop-types";
import { Component } from "react";


export default class TodoListItem extends Component {
  render() {
    const { label, onDeleted, onToggleDone, completed } = this.props;

    let classNames = '';
    if (completed) {
      classNames += ' completed';
    }
    return (
      <div className={"view" + classNames}>
        <input className="toggle" type="checkbox" />
        <label>
          <span className="description"
          onClick = { onToggleDone }>
            {label}</span>
          <span className="created">created 17 seconds ago</span>
        </label>
        <button className="icon icon-edit"></button>
        <button className="icon icon-destroy"
        onClick={ onDeleted }
        ></button>
      </div>
      
    );
  }
}
  


TodoListItem.propTypes = {
  label: PropTypes.string.isRequired,
  completed: PropTypes.bool,
  onDeleted: PropTypes.func,
  onToggleImportant: PropTypes.func,
  onToggleDone: PropTypes.func, 
};