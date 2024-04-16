import AppHeader from "../app-header";
import AppMain from "../main";
import TodosContext from "../../provide-context";
import PropTypes from "prop-types";
import "./app.css";


const App = () => {
  const todoData = [
    {label: "Drink coffee", important: false, id: 1},
    {label: "Make Awesome App", important: true, id: 2},
    {label: "Спать режим", important: false, id: 3},
  ]
  return (
    <TodosContext.Provider value={todoData}>
    <section className="todoapp">
    <AppHeader />
    <AppMain todos={todoData}
    onDeleted={(id)=>console.log(id)}/>
  </section>
  </TodosContext.Provider>
  );
};

App.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      important: PropTypes.bool.isRequired,
      id: PropTypes.number.isRequired
    }))
};

export default App;