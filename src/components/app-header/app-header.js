import "./app-header.css";
import { Component } from "react";
import PropTypes from "prop-types";
import ItemAdd from "../item-add";

export default class AppHeader extends Component {
  render () {
    return (
      <header className="header">
        <h1>Todos</h1>
        <ItemAdd onItemAdded={ this.props.onAdded }/>
      </header>
    );
  }
}

AppHeader.propTypes = {
  onAdded: PropTypes.func
};