import TodoListItem from "../todo-list-item";
import { useContext } from "react";
import TodosContext from "../../provide-context";
import "./todo-list.css";



const TodoList = () => {
  const todos = useContext(TodosContext);
  const elements = todos.map((item) => {
    return (
      <li key={item.id} className="">
        <TodoListItem {...item} />
        <input type="text" className="edit" value="Editing task"></input>
      </li>
    );
  });
  return (
    <ul className="todo-list">
      {elements}
    </ul>
  );
};

export default TodoList;