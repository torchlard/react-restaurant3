import React, {PureComponent} from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom'
import {table} from './data/table_data'
import {Order} from './order'

let inputProps = {readOnly: false}

class Table extends PureComponent {
  constructor(props){
    super(props)
    this.state = {
      tables: table,
      edit: false
    }
  }

  changeItem(idx, obj){
    this.setState(state => ({
      edit: state.edit,
      tables: state.tables.map( (item,i) => (i === idx )
        ? Object.assign(item, obj)
        : item )
    }) )
  }

  render(){
    if (this.state.edit)
      inputProps.readOnly = false;
    else
      inputProps.readOnly = true;

    return (
      <div>
        {this.props.role === 'admin' ?
          <button onClick={() => this.setState(state => ({
            edit: !state.edit,
            tables: state.tables
          })) }>{this.state.edit ? 'Edit' : 'Read only'}</button>
          : '' }

        <table>
          <thead>
            <tr>
              <th>Table No</th>
              <th>Num Of Seat</th>
              <th>Availability</th>
            </tr>
          </thead>
          <tbody>
            { this.state.tables.map((item, idx) => (
                  <tr key={item.id}>
                    <td><input type="text" name="tableNo" 
                      value={item.tableNo} {...inputProps}
                      onChange={event => this.changeItem(idx, {'tableNo': event.target.value})
                    }/></td>

                    <td><input type="number" name="numOfSeat" 
                      value={item.numOfSeat} {...inputProps} 
                      onChange={event => this.changeItem(idx, {'numOfSeat': event.target.value}) }
                      /></td>

                    <td><button onClick={() => {
                        if (this.state.edit) 
                          this.changeItem(idx, {'available': 1-item.available})
                        }
                    }> {item.available === 1 ? 'Yes' : 'No'}</button></td>

                    { this.props.role === 'admin' ? '' : 
                      <Link to={`/order/${item.id}`}>Go To Table</Link>}

                    {this.state.edit 
                      ? <button onClick={() => 
                        this.setState(state => ({
                          edit: state.edit,
                          tables: state.tables.filter((item,i) => i != idx)
                        })) }>Delete</button> 
                      : '' }
                  </tr>
                )
              )}
          </tbody>
        </table>
      </div>
    )
  }
}

// const TableEx = () => (
//   <Router>
//     <Route path="/home" component={Table} />
//     <Route path=""
//   </Router>
// )


export default Table;












