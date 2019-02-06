const URL = 'https://tint-expense-tracker-backend.herokuapp.com'

const fetchedTransactions = data => {
  return {
    type: 'FETCHED_TRANSACTIONS',
    payload: data
  }
}

const fetchingTransactions = userId => {
  return dispatch => {
    fetch(`${URL}/users/${userId}`)
      .then(res => res.json())
      .then(data =>
        dispatch(fetchedTransactions(data))
      )
  }
}

const postedTransaction = data => {
  return {
    type: 'POSTED_TRANSACTION',
    payload: data
  }
}

const postingTransaction = object => {
  return dispatch => {
    fetch(`${URL}/transactions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(object)
    })
      .then(res => res.json())
      .then(data =>
        dispatch(postedTransaction(data))
      )
  }
}

const updatedTransaction = data => {
  return {
    type: 'UPDATED_TRANSACTION',
    payload: data
  }
}

const updatingTransaction = object => {
  return dispatch => {
    fetch(`${URL}/transactions/${object.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(object)
    })
      .then(res => res.json())
      .then(data =>
        dispatch(updatedTransaction(data))
      )
  }
}

const deletedTransaction = data => {
  return {
    type: 'DELETED_TRANSACTION',
    payload: data
  }
}

const deletingTransaction = object => {
  return dispatch => {
    dispatch(deletedTransaction(object))
    fetch(`${URL}/transactions/${object.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(object)
    })
  }
}

export { fetchingTransactions, postingTransaction, updatingTransaction, deletingTransaction }
