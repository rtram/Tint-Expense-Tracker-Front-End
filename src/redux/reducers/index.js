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
    case 'UPDATED_TRANSACTION':
      let originalTransaction = state.find(transactionObject => (
        transactionObject.id === action.payload.id
      ))
      let index = state.indexOf(originalTransaction)
      let copyState = state.slice()
      copyState.splice(index, 1, action.payload)
      return copyState
    case 'DELETED_TRANSACTION':
      originalTransaction = state.find(transactionObject => (
        transactionObject.id === action.payload.id
      ))
      index = state.indexOf(originalTransaction)
      copyState = state.slice()
      copyState.splice(index, 1)
      return copyState
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
