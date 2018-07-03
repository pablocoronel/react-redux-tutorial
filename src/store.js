import {createStore, applyMiddleware} from 'redux';

const reducer = (state, action) => {
	if (action.type === "ADD_TO_CART") {
		return {
			...state,
			cart : state.cart.concat(action.product)
		}
	}else if (action.type === "REMOVE_FROM_CART") {
		return {
			...state,
			cart : state.cart.filter(prod => prod.id !== action.product.id)
		}
	}

	return state;
}


// Middleware
const logger = store => next => action => {
  console.log('dispatching', action)
  let result = next(action)
  console.log('next state', store.getState())
  return result
}

export default createStore(reducer, { cart: [] }, applyMiddleware(logger));