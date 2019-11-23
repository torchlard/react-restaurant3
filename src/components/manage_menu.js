import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from 'react-router-dom'

import User from './User'
import Table from './Table'
import Menu from './Menu'


const ManageMenu = props => (
  <div>
    {props.account.username}
    <Link to="/management/user">Edit user</Link>
    <Link to="/management/menu">Edit menu</Link>
    <Link to="/management/table">Edit table</Link>

    <Route exact path="/management/user" render={() => <User {...props} />} />
    <Route exact path="/management/menu" render={() => <Menu {...props} />} />
    <Route exact path="/management/table" render={() => <Table {...props} />} />
  </div>
)

export default ManageMenu







