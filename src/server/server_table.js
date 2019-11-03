const fn = {
  updateTables: tables => localStorage.setItem(tables, tables),

  getAll: () => localStorage.getItem(tables),

  deleteOne: idx => {
    const tables = localStorage.getItem(tables)
    localStorage.setItem(tables, tables.filter(i => i.id !== idx))
  },

  getNoById: id => localStorage.getItem(tables).find(i => i.id===id).tableNo
}

export default fn;




