import { createStore, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import rootReducer from "../reducers/index.js";
import { composeWithDevTools } from 'redux-devtools-extension'


const initialState = {};

const middleware = [thunk];

const composedEnhancer = composeWithDevTools(
    // Add whatever middleware you actually want to use here
    applyMiddleware(...middleware))

const store = createStore(
  rootReducer,
  initialState,
  composedEnhancer
 
);

export default store;
