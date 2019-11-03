import React, {useReducer} from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom'
import {table} from './data/table_data'
import {Order} from './order'

const reducer = (o,n)=>({...o,...n});
const Table = props => {

  const [state, setState] = useReducer(reducer, {tables: table, edit: false})

  const changeItem = (idx, obj) => setState({
      tables: state.tables.map( (item,i) => (i === idx )
        ? Object.assign(item, obj) : item )
    });

  return (
    <div>
      {props.permit.edit ?
        <button onClick={() => setState({edit: !state.edit })}>
          {state.edit ? 'Edit' : 'Read only'}</button> : '' }

      <table>
        <thead>
          <tr>
            <th>Table No</th>
            <th>Num Of Seat</th>
            <th>Availability</th>
          </tr>
        </thead>
        <tbody>
          { state.tables.map((item, idx) => (
                <tr key={item.id}>
                  <td><input type="text" name="tableNo" 
                    value={item.tableNo} 
                    onChange={event => changeItem(idx, {'tableNo': event.target.value})
                  }/></td>

                  <td><input type="number" name="numOfSeat" 
                    value={item.numOfSeat} 
                    onChange={event => changeItem(idx, {'numOfSeat': event.target.value}) }
                    /></td>

                  <td><button onClick={() => {
                      if (state.edit) changeItem(idx, {'available': 1-item.available})
                      }
                  }> {item.available === 1 ? 'Yes' : 'No'}</button></td>

                  { props.account.role === 'admin' ? '' : <Link to={`/order/${item.id}`}>Go To Table</Link>}

                  {state.edit ? <button onClick={() => setState({ 
                      tables: state.tables.filter((item,i) => i != idx) }) }>Delete</button> 
                    : '' }
                </tr>
              )
            )}
        </tbody>
      </table>
    </div>
  )

  }

// const TableEx = () => (
//   <Router>
//     <Route path="/home" component={Table} />
//     <Route path=""
//   </Router>
// )


export default Table;












