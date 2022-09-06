import { GET_GRAPH, ADJUST_GRAPH } from '../actions/types'

const initialState = {
    data: [],
}

export default function(state = initialState, action){
switch (action.type) {
    case GET_GRAPH:
        console.log('reducer')
              return {
            ...state,
        data: action.payload
        }
    default:
        return state;
    
}
}