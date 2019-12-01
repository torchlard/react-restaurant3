const dbGet = () => JSON.parse(localStorage.getItem('tables'));

const fn = {
  'updateTables': tables => localStorage.setItem('tables', JSON.stringify(tables)),

  'getAll': dbGet,

  'deleteOne': idx => {
    const tables = dbGet()
    localStorage.setItem('tables', JSON.stringify(tables.filter(i => i.id !== idx)))
  },

  'getNoById': id => {
      if(id === -1) return []
      const table = dbGet().find(i => i.id === Number(id))
      return table === undefined ? [] : table.tableNo
    } 
}

export default fn;




