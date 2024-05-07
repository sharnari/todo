import TodoListItem from "../todo-list-item";
import PropTypes from "prop-types";
import "./todo-list.css";



const TodoList = ({onDeleted, onToggleDone, todos}) => {
  const elements = todos.map((item) => {
    const {id, ...itemProps } = item;
    return (
      <li key={id} className="">
        <TodoListItem
        { ...itemProps }
        onDeleted={ () => onDeleted(id)}
        onToggleDone={() => onToggleDone(id)}
        />
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
  onToggleDone: PropTypes.func.isRequired,
  todos: PropTypes.array,
};
export default TodoList;