const dbGet = () => JSON.parse(localStorage.getItem('tables'));

const fn = {
  'updateTables': tables => localStorage.setItem('tables', tables),

  'getAll': () => dbGet(),

  'deleteOne': idx => {
    const tables = dbGet()
    localStorage.setItem('tables', tables.filter(i => i.id !== idx))
  },

  'getNoById': id => dbGet().find(i => i.id===id).tableNo
}

export default fn;




