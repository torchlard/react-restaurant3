import React, {useReducer} from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom'
import tableFn from '../server/server_table'

const reducer = (o,n)=>({...o,...n});
const Table = props => {

  const [state, setState] = useReducer(reducer, {tables: tableFn.getAll(), edit: false})

  const changeItem = (idx, obj) => {
    setState({
      tables: state.tables.map( (item,i) => (i === idx )
        ? Object.assign(item, obj) : item ) });
  }

  const deleteTable = idx => {
    setState({ tables: state.tables.filter(i => i.id !== idx) });
    tableFn.deleteOne(idx)
  }
      

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
                  <td>{!state.edit ? <span>{item.tableNo}</span> 
                    : <input type="text" name="tableNo" 
                    value={item.tableNo} readOnly={!state.edit}
                    onChange={event => changeItem(idx, {'tableNo': event.target.value})
                    }/>}</td>

                  <td>{!state.edit ? <span>{item.numOfSeat}</span> 
                    : <input type="number" name="numOfSeat" 
                    value={item.numOfSeat} readOnly={!state.edit}
                    onChange={event => changeItem(idx, {'numOfSeat': event.target.value}) }
                  />}</td>
                  <td><button onClick={() => {
                      if (state.edit) changeItem(idx, {'available': 1-item.available})
                      }
                  }> {item.available === 1 ? 'Yes' : 'No'}</button></td>

                  { props.account.role === 'admin' ? null 
                    : <td><Link to={`/order/${item.id}`}>Go To Table</Link></td>}
                  {state.edit ? <td><button onClick={() => tableFn.deleteOne(item.id) }>Delete</button></td>
                    : null }
                </tr>
              )
            )}
        </tbody>
      </table>

      <button onClick={tableFn.updateTables(state.tables)}>update</button>
    </div>
  )

}


export default Table;












