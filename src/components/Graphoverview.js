import React, { Component } from "react";
import { connect } from "react-redux";
import { getGraph } from "../actions/graphActions";
import { Item } from "../Item";
import User from "../User";
import { AppWithRouter } from "../App";

class Graphoverview extends Component {
  componentDidMount() {
    this.props.getGraph();
  }

  render() {
    const graph = this.props.graph;
    const users = this.props.users;

    return (
      <main className="x">
        <h3>Graphs</h3>
        <div className="users">
          {users.map((user) => (
            <User
              key={Math.random().toString(36).slice(2)}
              user={user}
              clickItem={() => this.props.handleClick(user)}
            />
          ))}
        </div>
        <div className="graph">
          {graph.map((item) => (
            <Item key={Math.random().toString(36).slice(2)} item={item} />
          ))}
        </div>
      </main>
    );
  }
}

const mapStateToProps = (state) => {
  const graph = state.graph.data;
  const users = state.graph.user;
  console.log(graph);

  return { graph, users };
};

export { AppWithRouter };
export default connect(mapStateToProps, { getGraph })(Graphoverview);
