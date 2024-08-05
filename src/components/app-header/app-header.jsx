import './app-header.css'
import PropTypes from 'prop-types'

import ItemAdd from '../item-add'

const AppHeader = ({ onAdded }) => {
  return (
    <header className="header">
      <h1>Todos</h1>
      <ItemAdd onItemAdded={onAdded} />
    </header>
  )
}

AppHeader.propTypes = {
  onAdded: PropTypes.func,
}

export default AppHeader
