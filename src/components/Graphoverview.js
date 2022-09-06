import  React, {Component} from 'react';
import { connect } from 'react-redux';
import { getGraph } from '../actions/graphActions';
import { Item } from '../Item'

class Graphoverview extends Component {
    componentWillMount(){
        this.props.getGraph();
    }
render(){
const graph = this.props.graph
  


console.log(graph["0"])
return (
    <div className='x'>
        <h3>Graphs</h3>
        {graph.map((item) => (
              <Item
                key={Math.random().toString(36).slice(2)}
                item={item}
              />
            ))} 


    </div>
)
}

}



const mapStateToProps = state => ({
    graph: state.graph.data
})

export default connect (mapStateToProps, {getGraph})(Graphoverview)