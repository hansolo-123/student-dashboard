import { GET_GRAPH, ADJUST_GRAPH } from "../actions/types";

export default function reducer(state = { data: [], user: [], userFilter: [] }, action) {
  switch (action.type) {
    case GET_GRAPH:
      return Object.assign({}, state, {
        user: action.payload
          .map((item) => item.name)
          .filter((n) => n)
          .filter((value, index, self) => self.indexOf(value) === index),
        data: action.payload
      });
    default: // Do nothing}
      return state;

    case ADJUST_GRAPH: { return {
      ...state,
      userFilter: action.UserSelect,
    };
  }
}
};

//}
 //     return Object.assign({}, state, {
   //     data: action.payload.filter(function (user) {
     //     return user.name === user;
       // }),
     // });
 // }
//}
