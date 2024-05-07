import PropTypes from "prop-types";
import { Component } from "react";
import { formatDistanceToNow } from "date-fns";
import "./todo-list-item.css";

export default class TodoListItem extends Component {
  
  static defaultProps = {
    label: "default task",
  }

  render() {
    const { label, onDeleted, onToggleDone, completed, timer, } = this.props;

    let classNames = '';
    let checkedFlag = "";
    if (completed) {
      classNames += ' completed';
      checkedFlag = true;

    }
    return (
      <div className={"view" + classNames}>
        <input className="toggle" type="checkbox"
         onChange = { onToggleDone } checked={checkedFlag} />
        <label>
          <span className="description"
          onClick = { onToggleDone }>
            {label}</span>
          <span className="created">{ formatDistanceToNow(timer, { addSuffix: true, includeSeconds: true }) }</span>
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
  onToggleDone: PropTypes.func,
  timer: PropTypes.instanceOf(Date),
};