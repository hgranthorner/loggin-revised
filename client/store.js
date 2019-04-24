import axios from 'axios'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import loggerMiddleware from 'redux-logger'
import thunkMiddleware from 'redux-thunk'

const GET_USER = Symbol('redux get user')

const getUserActionCreator = (user) => ({ type: GET_USER, user })

const userReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_USER:
      console.log(action.user)
      return action.user
  }
  return state
}

const reducer = combineReducers({
  user: userReducer
})

// thunks

const login = (email, password) => {
  return dispatch => {
    return axios.post('/auth', { email, password })
      .then(res => res.data)
      .then(user => {
        dispatch(getUserActionCreator(user))
      })
  }
}

export default createStore(reducer, applyMiddleware(thunkMiddleware, loggerMiddleware))
export { login }