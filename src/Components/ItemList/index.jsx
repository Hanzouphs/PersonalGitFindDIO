import React from 'react'
import './style.css';

function ItemList({title, description}) {
  return (
    <div className="Item-list">
        <strong>{title}</strong>
        <p>{description}</p>
        <hr/>
    </div>
  )
}

export default ItemList;