import React from "react";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { getGraph } from "../actions/graphActions";
import { connect } from "react-redux";
import { Item } from "../Item";
import User from "../User";

const Graphspecific = React.memo((props) => {
  const location = useLocation();
  const [UserSelect, setUserSelect] = useState("");

  useEffect(() => {
    props.getGraph();
    setUserSelect(location.state.user);
    console.log(UserSelect);
  }, []);
  const graph = props.graph;
  const users = props.users;
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
            clickItem={() => console.log('not operational')}
          />
        ))}
      </div>
    </main>
  );
});


const mapStateToProps = (state) => {
  const graph = state.graph.data;
  const users = state.graph.user;

  return { graph, users };
};


export default connect(mapStateToProps, { getGraph })(Graphspecific);
