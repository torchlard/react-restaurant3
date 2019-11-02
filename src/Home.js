import React from 'react'
// import {BrowserRouter as Router, Route, Link } from 'react-router-dom'
// import Header from './Header'
// import ManagementMenu from './manage_menu'
// import ReportMenu from './report_menu'

// import Table from './Table'
// import Order from './order'
// import User from './User'
// import Menu from './Menu'


const Home = (props) => {
  // if(props.account.role === 'admin'){
  //   return (
  //     <Router>
  //       <Header {...props} title="Home Page" />
  //       <Link to="/management">Management</Link>
  //       <Link to="/report">Report</Link>

  //       <Route path="/management" component={ManagementMenu} />
  //       <Route path="/report" component={ReportMenu} />

  //       <Route exact path="/management/user" render={() => <User {...props}/>}  />
  //       <Route exact path="/management/menu" render={() => <Menu {...props}/> }  />
  //       <Route exact path="/management/table" render={() => <Table {...props}/>}  />

  //     </Router>  
  //   )
  // } else {
  //   return (
  //     <div>
  //       <Router>
  //         <Header {...props} title="Home Page" />
  //         <Route path="/home" component={Table} {...props}/>
  //         <Route path="/order/:tableId" component={Order} />

  //       </Router>
  //     </div> 
  //   )
  // }
  
  return (props.account.role === 'admin') ? <div>admin home</div> : <div>worker home</div>
}

export default Home









