import React, {useContext, useEffect, useRef} from 'react'
import {Link} from 'react-router-dom'
import tableFn from '../server/server_table'
import { TABLE_INIT, TABLE_EDIT, TABLE_CHANGE, TABLE_DELETE } from '../constants/actionTypes'
import {GlobalContext} from '../GlobalContext'

const Table = () => {

  const {state, dispatch} = useContext(GlobalContext)
  // const dispatch = useRef(_dispatch)

  useEffect(() => dispatch(TABLE_INIT), [])
  useEffect(() => tableFn.updateTables(state.tables), [state.tables])

  const edit = state.edit.table      

  return (
    <div>
      {state.permit.edit &&
        <button onClick={() => dispatch(TABLE_EDIT) }>{edit ? 'Edit' : 'Read only'}</button> }

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
              value={item.tableNo} readOnly={!edit}
              onChange={evt => dispatch({
                type: TABLE_CHANGE, data: {idx, obj: {'tableNo': evt.target.value}} }) }
              />}</td>

            <td>{!state.edit ? <span>{item.numOfSeat}</span> 
              : <input type="number" name="numOfSeat" 
              value={item.numOfSeat} readOnly={!state.edit}
              onChange={evt => dispatch({
                type: TABLE_CHANGE, data: {idx, obj: {'numOfSeat': evt.target.value}} }) }
            />}</td>
            <td><button onClick={() => {
              if(edit) dispatch({
                  type: TABLE_CHANGE, data: {idx, obj: {'available': 1-item.available}} 
                }) }
            }> {item.available === 1 ? 'Yes' : 'No'}</button></td>

            { state.account.role !== 'admin' && 
              <td><Link to={`/order/${item.id}`}>Go To Table</Link></td>}
            {edit ? <td><button onClick={() => dispatch({type: TABLE_DELETE, data: item.id}) }>Delete</button></td>
              : null }
          </tr>
          )
        )}
        </tbody>
      </table>

      {/* <button onClick={tableFn.updateTables(state.tables)}>update</button> */}
    </div>
  )

}


export default Table;












