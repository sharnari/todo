import TodoListItem from "../todo-list-item";
import { useContext } from "react";
import TodosContext from "../../provide-context";
import PropTypes from "prop-types";
import "./todo-list.css";



const TodoList = ({onDeleted, onToggleImportant, onToggleDone}) => {
  const todos = useContext(TodosContext);
  const elements = todos.map((item) => {
    const {id, ...itemProps } = item;
    return (
      <li key={id} className="">
        <TodoListItem
        { ... itemProps }
        onDeleted={ () => onDeleted(id)}
        onToggleImportant={() => onToggleImportant(id)}
        onToggleDone={() => onToggleDone(id)} />
        <input type="text" className="edit"></input>
      </li>
    );
  });
  return (
    <ul className="todo-list">
      {elements}
    </ul>
  );
};


TodoList.propTypes = {
  onDeleted: PropTypes.func.isRequired,
  onToggleImportant: PropTypes.func.isRequired,
  onToggleDone: PropTypes.func.isRequired,
};
export default TodoList;