import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './reducer/counterSlice';
import userRegisterLoginReducer from './reducer/loginReducer';
//import { thunk } from 'redux-thunk';
//import counterReducer from './reducer/counterSlice';


export default configureStore({
    reducer: {
        counter: counterReducer,
        userRegisterLogin: userRegisterLoginReducer,
    }
})

/* const reducer = combineReducer({
    cart: counterReducer
}) */
/* 
const counterReducer = (state = {value: 0}, action) => {
    switch(action.type) {
    case 'ADD' :
        return { value: state.vlue +1 + action.someValue};
    default:
        return state;
    }
    

}

const store = createStore(counterReducer, { value: 0}, composeWithDevTools(applyMiddleware(...middleware)));

store.dispatch({
type: "ADD",
someValue: 10,
})

console.log(store.getState());
export default store; 
*/