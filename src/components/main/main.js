import TodoList from "../todo-list";
import Footer from "../footer";
import "./main.css";

const AppMain = () => {
  return (
    <section className="main">
      <TodoList />
      <Footer />
    </section>
  );
};

export default AppMain;
