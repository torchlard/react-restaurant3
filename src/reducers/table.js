import {TABLE_EDIT, TABLE_INIT, TABLE_DELETE, TABLE_CHANGE} from '../constants/actionTypes'
import tableFn from '../server/server_table'

export default (state, action, dispatch) => {
  switch(action.type){
    case TABLE_INIT:
      console.log('table init')
      return {...state, tables: tableFn.getAll(), edit: {table: false}}

    case TABLE_EDIT:
      return {...state, edit: {table: !state.edit.table} }

    case TABLE_DELETE:
      tableFn.deleteOne(action.data.idx)
      return {...state, tables: state.tables.filter(i => i.id !== action.data.idx) } 

    case TABLE_CHANGE:
      return {...state, tables: state.tables.map( (item,i) => (i === action.data.idx )
        ? Object.assign(item, action.data.obj) : item ) }

  }
}







