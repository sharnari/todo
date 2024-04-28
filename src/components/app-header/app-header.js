import "./app-header.css";

import ItemAdd from "../item-add";

const AppHeader = () => {
  return (
    <header className="header">
      <h1>Todos</h1>
      <ItemAdd />
    </header>
  );
};

export default AppHeader;