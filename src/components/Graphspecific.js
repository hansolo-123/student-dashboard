import React from "react";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { getGraph, adjustGraph } from "../actions/graphActions";
import { connect } from "react-redux";
import User from "../User";
import {
  VictoryChart,
  VictoryBar,
  VictoryAxis,
  VictoryContainer,
  VictoryLabel,
  VictoryTooltip,
  VictoryGroup,
  VictoryLegend,
  VictoryLine,
  Bar,
} from "victory";

const Graphspecific = React.memo((props) => {
  const location = useLocation();
  const [UserSelect, setUserSelect] = useState("");
  const [ViewToggle, setViewToggle] = useState(false);

  const handleToggle = () => {
    setViewToggle(!ViewToggle);
    console.log(ViewToggle);
  };

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
  let data = [];

  for (var i = 0; i < filteredUser.length; i++) {
    data.push({
      assignment: filteredUser[i].assignment,
      difficulty: filteredUser[i].difficulty,
      pleasure: filteredUser[i].pleasure,
    });
  }

  const executeBar = () => {
    return (
      <VictoryChart
        containerComponent={
          <VictoryContainer responsive={false} height={535} />
        }
        height={400}
        width={1300}
        domain={{ y: [0, 5] }}
        domainPadding={0}
      >
        <VictoryAxis
          dependentAxis={true}
          style={{
            grid: { stroke: "grey" },
          }}
        />
        <VictoryLegend
          x={520}
          y={10}
          centerTitle
          orientation="horizontal"
          gutter={50}
          style={{ title: { fontSize: 20 } }}
          data={[
            { name: "difficulty", symbol: { fill: "#c43a31" } },
            { name: "pleasure", symbol: { fill: "#0000FF" } },
          ]}
        />
        <VictoryGroup vertical offset={10} style={{ data: { width: 8 } }}>
          <VictoryBar
            style={{ data: { fill: "#c43a31" } }}
            alignment="start"
            data={data}
            x="assignment"
            y="difficulty"
            labels={({ datum }) => `difficulty: ${datum.difficulty}`}
            labelComponent={<VictoryTooltip />}
            dataComponent={
              <Bar
                tabIndex={50}
                ariaLabel={({ datum }) => `x: ${datum.difficulty}`}
              />
            }
          />

          <VictoryBar
            style={{ data: { fill: "#0000FF" } }}
            alignment="start"
            data={data}
            x="assignment"
            y="pleasure"
            labels={({ datum }) => `pleasure: ${datum.pleasure}`}
            labelComponent={<VictoryTooltip />}
            dataComponent={
              <Bar
                tabIndex={50}
                ariaLabel={({ datum }) => `x: ${datum.pleasure}`}
              />
            }
          />
        </VictoryGroup>

        <VictoryAxis
          tickLabelComponent={
            <VictoryLabel
              dx={8}
              style={{ textAnchor: "end", fontSize: 12 }}
              angle={-75}
            />
          }
        />
      </VictoryChart>
    );
  };

  const executeLine = () => {
    return (
      <VictoryChart
      containerComponent={
        <VictoryContainer responsive={false} height={535} />
      }
      height={400}
      width={1300}
      domain={{ y: [0, 5] }}
      domainPadding={0}
    >
       <VictoryAxis
          dependentAxis={true}
          style={{
            grid: { stroke: "grey" },
          }}
        />
       <VictoryLegend
          x={520}
          y={10}
          centerTitle
          orientation="horizontal"
          gutter={50}
          style={{ title: { fontSize: 20 } }}
          data={[
            { name: "difficulty", symbol: { fill: "#c43a31" } },
            { name: "pleasure", symbol: { fill: "#0000FF" } },
          ]}
        />
        <VictoryLine
          style={{
            data: { stroke: "#c43a31" },
            parent: { border: "1px solid #ccc" },
          }}
         data={data}
         x="assignment"
         y="difficulty"
        />
         <VictoryLine
          style={{
            data: { stroke: "#0000FF"  },
            parent: { border: "1px solid #ccc" },
          }}
         data={data}
         x="assignment"
         y="pleasure"
        />
          <VictoryAxis
          tickLabelComponent={
            <VictoryLabel
              dx={8}
              style={{ textAnchor: "end", fontSize: 12 }}
              angle={-75}
            />
          }
        />
      </VictoryChart>
    );
  };

  return (
    <main className="x">
      <h3>{UserSelect}</h3>
      <div className="container">
        <div className="users">
          {users.map((user, name) => (
            <User
              name={name}
              key={Math.random().toString(36).slice(2)}
              user={user}
              state={UserSelect}
              userArray={users}
              clickItem={() => setUserSelect(user)}
            />
          ))}
        </div>
        {ViewToggle ? executeLine() : executeBar()}
      </div>
      <button className="menu_btn" onClick={() => handleToggle()}>
        ToggleView
      </button>
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
