import React, { Component } from "react";
import { connect } from "react-redux";
import { getGraph } from "../actions/graphActions";
import User from "../User";
import { AppWithRouter } from "../App";
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

class Graphoverview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggle: true,
    };
  }
  componentDidMount() {
    this.props.getGraph();
  }

  render() {
    const handleToggle = () => {
      this.setState((prevState) => ({
        toggle: !prevState.toggle,
      }));
    };

    const graph = this.props.graph;
    const users = this.props.users;
    const filteredGraph = graph
      .map((item) => item.assignment)
      .filter((n) => n)
      .filter((value, index, self) => self.indexOf(value) === index);

    var filteredArray = [];

    for (var i = 0; i < filteredGraph.length; i++) {
      for (var j = 0; j < graph.length; j++) {
        if (graph[j].assignment === filteredGraph[i]) {
          filteredArray.push({
            assignment: graph[j].assignment,
            difficulty: graph[j].difficulty / users.length,
            pleasure: graph[j].pleasure / users.length,
          });
        }
      }
    }
    const test = filteredArray.reduce((items, item) => {
      const { assignment, difficulty, pleasure } = item;
      const itemIndex = items.findIndex(
        (item) => item.assignment === assignment
      );
      if (itemIndex === -1) {
        items.push(item);
      } else {
        items[itemIndex].difficulty += difficulty;
        items[itemIndex].pleasure += pleasure;
      }

      return items;
    }, []);
    console.log(test);

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
              data={test}
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
              data={test}
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
            data={test}
            x="assignment"
            y="difficulty"
            
            
          />
          <VictoryLine
            style={{
              data: { stroke: "#0000FF" },
              parent: { border: "1px solid #ccc" },
            }}
            data={test}
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
        <h3>Graph totals</h3>
        <div className="container">
          <div className="users">
            {users.map((user) => (
              <User
                key={Math.random().toString(36).slice(2)}
                user={user}
                clickItem={() => this.props.handleClick(user)}
              />
            ))}
          </div>
          {this.state.toggle ? executeLine() : executeBar()}
        </div>
        <nav>
          <button className="menu_btn" onClick={() => handleToggle()}>
            ToggleView
          </button>
        </nav>
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
