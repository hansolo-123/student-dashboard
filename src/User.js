import React from "react";


function User({ user, state, clickItem }) {
  if (state === undefined) {
    return (
      <li className="list-item" value={user} key={user}>
        <div>
          <input type="checkbox" onClick={() => clickItem(user)} />
          {user}
        </div>{" "}
      </li>
    );
  } else {
    return (
      <li className="list-item" value={user} key={user}>
        <div>
          <input
            type="checkbox"
            defaultChecked={user.includes(state)}
            onClick={() => clickItem(user)}
          />
          {user}
        </div>{" "}
      </li>
    );
  }
}
export default User;
