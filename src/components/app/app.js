import { Component } from 'react';
import AppHeader from "../app-header";
import TodoList from "../todo-list";
import Footer from "../footer";
import PropTypes from "prop-types";
import "./app.css";
import "./normalize.css";

export default class App extends Component {
  maxId = 100;
  state = {
    todoData: [
      this.createTodoItem("Filter"),
      this.createTodoItem("Feature change tasks"),
      this.createTodoItem("Clear completed"),
      this.createTodoItem("Create timer of task"),
    ],
    classFilter: "All",
  };
  
  createTodoItem(label) {
    return {
      label,
      completed: false,
      id: this.maxId++,
      timer: new Date(),
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

   // Deletes all completed tasks
   clearCompleted = () => {
    const listCompleted = this.state.todoData.filter(el => el.completed);
    listCompleted.forEach((element) => {
      this.deleteItem(element.id);
    });
   }


   addItem = (text) => {
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

   onSelectedFilter = (filter) => {
    this.setState(() => {
      return {
        classFilter: filter,
      };
    });
   }



  onToggleProperty(arr, id, propName) {
    const index = arr.findIndex((el) => el.id === id);
    const oldItem = arr[index];
    const newItem = {...oldItem,
                    [propName]: !oldItem[propName]}
    const before = arr.slice(0, index);
    const after = arr.slice(index + 1);
    return [...before, newItem, ...after];
  }

  onToggleDone = (id) => {
    this.setState(( {todoData} ) => {
      return {
        todoData: this.onToggleProperty(todoData, id, "completed")
      };
    })
  };

  filterData = (data, filterName) => {
      if (filterName === "All") {
        return data;
      } else if (filterName === "Active") {
        return data.filter(el => !el.completed);
      }
      return data.filter(el => el.completed);
  };

  render () {
    const { todoData : todoData } = this.state;
    const unDoneCount = todoData.filter(el => !el.completed).length;
    return (
      <section className="todoapp">
      <AppHeader onAdded={ this.addItem } />
      <section className="main">
        <TodoList
        todos={ this.filterData(todoData, this.state.classFilter) }
        onDeleted={ this.deleteItem }
        onToggleDone={ this.onToggleDone } />
        <Footer 
        unDoneCount={ unDoneCount }
        clearCompleted={ this.clearCompleted }
        onSelectedFilter={ this.onSelectedFilter }
        selectedFilter={ this.state.classFilter }/>
      </section>
    </section>
    );
  }
}

App.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired
    }))
};
