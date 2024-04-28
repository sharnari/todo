import { Component } from "react";
import "./item-add.css";

export default class ItemAdd extends Component {
  render () {
    const addText = 'Click to add a task';
    return (
      <>
        <input
        className='new-todo'
        placeholder={addText} defaultValue=""/>
        <button>Add</button>
      </>
    );
  }
}
