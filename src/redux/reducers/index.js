import { combineReducers } from 'redux'

const userReducer = (state = {}, action) => {
  switch(action.type) {
    case 'FETCHED_TRANSACTIONS':
      return {
        id: action.payload.id,
        first_name: action.payload.first_name,
        last_name: action.payload.last_name
      }
    default:
      return state
  }
}

const transactionsReducer = (state = [], action) => {
  switch (action.type) {
    case 'FETCHED_TRANSACTIONS':
      return action.payload.transactions
    default:
      return state
  }
}

const rootReducer = combineReducers({
  user: userReducer,
  transactions: transactionsReducer
})


export default rootReducer
