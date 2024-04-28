import { Component } from 'react';
import AppHeader from "../app-header";
import TodoList from "../todo-list";
import Footer from "../footer";
import TodosContext from "../../provide-context";
import PropTypes from "prop-types";
import "./app.css";


export default class App extends Component {
  state = {
    todoData: [
      {label: "Drink coffee", important: false, id: 1},
      {label: "Make Awesome App", important: true, id: 2},
      {label: "Спать режим", important: false, id: 3},
    ]
  };

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
    console.log(text);
   }

  render () {
    return (
      <TodosContext.Provider value={this.state.todoData}>
      <section className="todoapp">
      <AppHeader onAdded={this.addItem}/>
      <section className="main">
        <TodoList
        todos={this.state.todoData}
        onDeleted={ this.deleteItem }/>
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
