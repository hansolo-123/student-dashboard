import React from "react";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { getGraph, adjustGraph } from "../actions/graphActions";
import { connect } from "react-redux";
import { Item } from "../Item";
import User from "../User";

const Graphspecific = React.memo((props) => {
  const location = useLocation();
  const [UserSelect, setUserSelect] = useState("");

  useEffect(() => {
    props.getGraph();
    setUserSelect(location.state.user);
  }, []);
  props.adjustGraph(UserSelect);
  const graph = props.graph;
  const users = props.users;
  const userFilter = props.userFilter;
  const filteredUser = graph.filter(function (user) {
    return user.name === userFilter;
  });
  console.log(filteredUser);

  return (
    <main className="x">
      <h3>{UserSelect}</h3>
      <div className="users">
        {users.map((user, name) => (
          <User
            name={name}
            key={Math.random().toString(36).slice(2)}
            user={user}
            state={UserSelect}
            userArray={users}
            clickItem={() => console.log("not operational")}
          />
        ))}
      </div>
      <div className="graph">
          {filteredUser.map((item) => (
            <Item key={Math.random().toString(36).slice(2)} item={item} />
          ))}
          </div>
    </main>
  );
});

const mapStateToProps = (state) => {
  const graph = state.graph.data;
  const users = state.graph.user;
  const userFilter = state.graph.userFilter;

  return { graph, users, userFilter };
};

export default connect(mapStateToProps, { getGraph, adjustGraph })(
  Graphspecific
);
