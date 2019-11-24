import React, {useRoutes} from 'react'
import {BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Header from './Header'
import ManagementMenu from './manage_menu'
import ReportMenu from './report_menu'

import Table from './Table'
import Order from './Order'
import User from './User'
import Menu from './Menu'


const Home = () => {

  const [state, dispatch] = useContext(GlobalContext)

  return (state.account.role === 'admin') 
    ? ( 
        <div>hi</div>
      // <Router> 
      //   <div>admin home</div>  
      //   <Link to="/management">Management</Link> <br/>
      //   <Link to="/report">Report</Link> <br/>
      //   <Link to="/table">Table</Link>

      //   <Route path="/management" render={() => <ManagementMenu {...props} />} />
      //   <Route path="/report" render={() => <ReportMenu {...props} /> } />
      //   <Route path="/table" render={() => <Table {...props} /> } />

      //   <Route exact path="/management/user" render={() => <User {...props}/>} /> 
      //   <Route exact path="/management/menu" render={() => <Menu {...props}/> }  /> 
      //   <Route exact path="/management/table" render={() => <Table {...props} />}  /> 
      // </Router> 
      )
    : (
        <Router>
          <Header title="Home Page" />
          <Link to="/table">Table</Link>

          <Route path="/home" component={Table} />
          <Route path="/table" component={Table} />
          <Route path="/order/:tableId" component={Order} />

        </Router>
    )
}

export default Home









