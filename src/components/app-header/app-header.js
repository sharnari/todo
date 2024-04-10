import "./app-header.css";
import SearchPanel from "../search-panel";

const AppHeader = () => {
  return (
    <header className="header">
      <h1>Todos</h1>
      <SearchPanel />
    </header>
  );
};

export default AppHeader;