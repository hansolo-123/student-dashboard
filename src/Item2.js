import React from "react";


function Item2({ item }) {


  return (
    <li
      className="list-item"
      value={item}
      key={item.id}
  
    >
      <div> 
      {item.assignment} {item.difficulty} {item.pleasure}
      </div>{" "}
    </li>
  );
}

export { Item2 };
