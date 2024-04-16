import "./search-panel.css";

const SearchPanel = () => {
  const searchText = 'Click to add a task';
  return (
    <input
    className='new-todo'
    placeholder={searchText} defaultValue=""/>
  );
};

export default SearchPanel;