import { Component } from 'react';
import AppHeader from "../app-header";
import TodoList from "../todo-list";
import Footer from "../footer";
import TodosContext from "../../provide-context";
import PropTypes from "prop-types";
import "./app.css";
import "./normalize.css";


export default class App extends Component {
  maxId = 100;
  state = {
    todoData: [
      this.createTodoItem("Drink Coffee"),
      this.createTodoItem("Make Awesome App"),
      this.createTodoItem("Спать режим"),
    ]
  };

  createTodoItem(label) {
    return {
      label,
      important: false,
      completed: false,
      id: this.maxId++
    };
  }
  deleteItem = (id) => {
    this.setState(({ todoData }) => {
       const index = todoData.findIndex((el) => el.id === id);
       const before = todoData.slice(0, index);
       const after = todoData.slice(index + 1);
       const newArray = [...before, ...after];
       return {
        todoData: newArray
       };
     });
   };

   addItem = (text) => {
    // generate id
    const newItem = this.createTodoItem(text);
    this.setState(({ todoData }) => {
      const newArr = [
        ...todoData,
        newItem
      ];
      return{
        todoData: newArr
      }
    });
   };

  onToggleProperty(arr, id, propName) {
    const index = arr.findIndex((el) => el.id === id);
    const oldItem = arr[index];
    const newItem = {...oldItem,
                   [propName]: !oldItem[propName]}
    // 2. construct arr
    const before = arr.slice(0, index);
    const after = arr.slice(index + 1);
    return [...before, newItem, ...after];
  }
   
   onToggleImportant = (id) => {
    console.log("Toggle important", id);
   };

   onToggleDone = (id) => {
    this.setState(( {todoData} ) => {
      return {
        todoData: this.onToggleProperty(todoData, id, "completed")
      };
    })
   };

  render () {
    const { todoData : todoData } = this.state;
    // лишнее-----------------------------------------------------------------------
    const completedCount = todoData.filter((el) => el.completed).length;
    const todoCount = todoData.length - completedCount; 
    //------------------------------------------------------------------------------
    return (
      <TodosContext.Provider value={todoData}>
      <section className="todoapp">
      <AppHeader onAdded={ this.addItem } />
      <section className="main">
        <TodoList
        todos={todoData}
        onDeleted={ this.deleteItem }
        onToggleImportant={this.onToggleImportant}
        onToggleDone={this.onToggleDone}/>
        <Footer />
      </section>
    </section>
    </TodosContext.Provider>
    );
  }
}

App.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      important: PropTypes.bool.isRequired,
      id: PropTypes.number.isRequired
    }))
};
