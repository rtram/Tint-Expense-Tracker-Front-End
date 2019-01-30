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
    case 'POSTED_TRANSACTION':
      return [...state, action.payload]
    default:
      return state
  }
}

const categoryNamesReducer = (state = ["Auto & Transport", "Bills & Utilities", "Education", "Entertainment", "Food & Dining", "Gifts & Donations", "Health & Fitness", "Miscellaneous", "Shopping", "Travel"], action) => {
  return state
}

const rootReducer = combineReducers({
  user: userReducer,
  transactions: transactionsReducer,
  categoryNames: categoryNamesReducer
})


export default rootReducer
