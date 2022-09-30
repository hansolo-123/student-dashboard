import React from "react";


function Item({ item }) {


  return (
    <li
      className="list-item"
      value={item}
      key={item.id}
  
    >
      <div> 
      {item} 
      </div>{" "}
    </li>
  );
}

export { Item };
