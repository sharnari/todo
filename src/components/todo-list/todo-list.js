import TodoListItem from "../todo-list-item";
import { useContext } from "react";
import TodosContext from "../../provide-context";
import "./todo-list.css";



const TodoList = () => {
  const todos = useContext(TodosContext);
  // const onDeleted = useContext(TodosContext.onDeleted);
  const elements = todos.map((item) => {
    const {id, ...itemProps } = item;
    return (
      <li key={id} className="">
        <TodoListItem
        { ... itemProps }
        onDeleted={ (id) => console.log(id)} />
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

export default TodoList;