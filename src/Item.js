import React from "react";

function Item({ item }) {
  console.log(item)
  return (
    <li
 
      className="x-item"
      value={item}
     // onClick={clickItem}
    >
      <div className="x-1">
        <p>{item[0]}</p>
      </div>{" "}
      <div className="x-2">
        <p>{item[1]}</p>
      </div >{" "}
      <div className="x-3">
        <p>{item[2]}</p>
      </div >{" "}
      <div className="x-4">
        <p> {item[3]}</p>
      </div>{" "}
      
    </li>
  );
}

export { Item };
