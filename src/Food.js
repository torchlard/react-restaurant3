import React, {useState, useEffect} from 'react'
import foodFn from './server/server_food'

const Food = props => {

  const categories = foodFn.getAllCategory();
  const [currentCat, setCat] = useState(categories[0])
  const [foods, setFoods] = useState([])

  useEffect(() => {
    setFoods(foodFn.getAll())
  }, [])

  return (
    <div>
      <ul style={{listStyleType: 'none' }}>
        {categories.map((item,idx) => 
          <li key={idx} style={{float: 'left'}} >
            <button onClick={() => setCat(item)}>{item}</button>  
          </li>
        )}
      </ul>
      <table>
        <thead><tr>
          <th>Food Name</th>
          <th>Price($)</th>
          <th>Quantity</th>
          <th>Category</th>
        </tr></thead>
        
        <tbody>
          { foods
              .filter(i => i.category === currentCat)
              .map((item, idx) => (
                <tr key={item.id} onClick={() => props.addOrder(item.id, item.name, item.price)} >
                  <td> {item.name} </td>
                  <td> {item.price} </td>
                  <td> {item.quantity} </td>
                  <td> {item.category} </td>
                </tr>
              )) }
        </tbody>
      </table>
    </div>
  )
  
}

export default Food



















