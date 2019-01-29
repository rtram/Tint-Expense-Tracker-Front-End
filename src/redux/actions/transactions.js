const URL = 'http://localhost:3001/users/'

const fetchedTransactions = data => {
  return {
    type: 'FETCHED_TRANSACTIONS',
    payload: data
  }
}

const fetchingTransactions = userId => {
  return dispatch => {
    fetch(`${URL}${userId}`)
      .then(res => res.json())
      .then(data =>
        dispatch(fetchedTransactions(data))
      )
  }
}

export { fetchingTransactions }
