import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {Provider, connect} from 'react-redux'
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom'
import store, { loginCheck } from './store'
import Login from './login'
import UserPage from './user-page'



class _Main extends Component {

  componentDidMount () {
    this.props.requestLoginCheck()
  }

  render () {
    const { isLoggedIn } = this.props;
    return (
      <Switch>
        {
          isLoggedIn && (<Route path='/home' component={UserPage} />)
        }
        {
          !isLoggedIn && (
            <Route component={Login} />
          )
        }
        <Redirect to='/home' />
      </Switch>
    )
  }
};

const mapStateToProps = ({ user }) => {
  console.log(user)
  return {
    isLoggedIn: !!user.id
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    requestLoginCheck: () => dispatch(loginCheck())
  }
}

const Main = connect(mapStateToProps, mapDispatchToProps)(_Main);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Main />
    </Router>
  </Provider>,
  document.getElementById('app')
)
