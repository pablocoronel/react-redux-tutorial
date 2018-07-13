import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';

const initialState = [
 { "id": 1, "name": "Hipster Ultimate", "price": 299, "image": "https://s3.amazonaws.com/makeitreal/projects/e-commerce/camiseta-1.jpg" },
];

const productsReductor = (state = initialState, action) => {
	if (action.type === "REPLACE_PRODUCTS") {
		return action.products;

	}else{
		return state;
	}

}

const cartReductor = (state = initialState, action) => {
	if (action.type === "ADD_TO_CART") {
		return state.concat(action.product);

	}else if (action.type === "REMOVE_FROM_CART") {
		return state.filter(prod => prod.id !== action.product.id);

	}else{
		return state;
	}

}


// Middleware
const logger = store => next => action => {
  console.log('dispatching', action)
  let result = next(action)
  console.log('next state', store.getState())
  return result
}

export default createStore(combineReducers({products : productsReductor, cart : cartReductor}), applyMiddleware(logger, thunk));