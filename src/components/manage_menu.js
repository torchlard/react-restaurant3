import React, {useContext} from 'react'
import {Route,Link} from 'react-router-dom'
import {GlobalContext} from '../GlobalContext'

import User from './User'
import Table from './Table'
import Menu from './Menu'


export default () => {
  const {state} = useContext(GlobalContext)

  return <div>
    {state.account.username}
    <Link to="/management/user">Edit user</Link>
    <Link to="/management/menu">Edit menu</Link>
    <Link to="/management/table">Edit table</Link>

    <Route exact path="/management/user" component={User} />
    <Route exact path="/management/menu" component={Menu} />
    <Route exact path="/management/table" component={Table}  />
  </div>
}








