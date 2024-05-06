import { Component } from "react";
import "./footer.css";
import PropTypes from "prop-types";


export default class Footer extends Component {
  render () {
    const { unDoneCount, clearCompleted, onSelectedFilter,
      selectedFilter } = this.props
    return (
      <footer className="footer">
        <span className="todo-count"> {unDoneCount} items left</span>
        <ul className="filters">
        <li>
            <button className={selectedFilter === "All" ? "selected": ""}
            onClick={() => onSelectedFilter("All")}
            >All</button>
          </li>
          <li>
            <button className={selectedFilter === "Active" ? "selected": ""}
            onClick={() => onSelectedFilter("Active")}
            >Active</button>
          </li>
          <li>
            <button className={selectedFilter === "Completed" ? "selected": ""}
            onClick={() => onSelectedFilter("Completed")}
            >Completed</button>
          </li>
        </ul>
        <button className="clear-completed"
        onClick={clearCompleted}
        >Clear completed</button>
      </footer>
    );
  }
}

Footer.propTypes = {
  unDoneCount: PropTypes.number,
  clearCompleted: PropTypes.func,
  onSelectedFilter: PropTypes.func,
  selectedFilter: PropTypes.string,
};