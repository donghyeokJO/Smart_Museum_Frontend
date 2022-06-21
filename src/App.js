import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import MainPage from './pages/MainPage';
import LoginPage from "./pages/LoginPage";
import JoinPage from "./pages/JoinPage";
import MyPage from "./pages/MyPage";
import Dashboard from "./pages/Dashboard";

import PrivateRoute from "./utils/private_route";

class App extends React.Component {
  state = {
    userName: "null",
    user_id: 0,
    museumName: 0,
    isAuth: false,
  };

  componentDidMount() {
    //로컬 스토리지에 이것저것 저장되어있습니다.
    const museumName = localStorage.getItem("museumName");
    const userName = localStorage.getItem("userName");
    const user_id = localStorage.getItem("user_id");
    const access = localStorage.getItem('access');
    const isAuth = (access === null ? false : true)
    this.setState({
      userName: userName,
      user_id: user_id,
      museumName: museumName,
      access: access,
      isAuth: isAuth
    });
  }

  render() {
    const museumName = localStorage.getItem("museumName");
    const name = localStorage.getItem("userName");
    const user_id = localStorage.getItem("user_id");
    const isAuth = localStorage.getItem("isAuth");
    const access = localStorage.getItem('access');

    return (
      <>
        <BrowserRouter>
          <Switch>
            <Route exact path='/' component={MainPage} />
            <Route exact path="/login">
              {!isAuth ? (
                <LoginPage
                  onSubmit={function (data) {
                    const { user_name, museum_name, user_id } = data;
                    this.setState({
                      museumName: museum_name,
                      userName: user_name,
                      user_id: user_id,
                    });
                    alert(user_name + " 님 안녕하세요");
                    localStorage.setItem("museumName", museum_name);
                    localStorage.setItem("userName", user_name);
                    localStorage.setItem("user_id", user_id);
                    window.location.href = "/";
                  }.bind(this)}
                ></LoginPage>
              ) : (
                <Redirect to="/" />
              )}
            </Route>
            <Route path='/join' component={JoinPage} />
            <PrivateRoute path='/mypage' component={MyPage} />
            <PrivateRoute path='/dashboard' component={Dashboard} />
          </Switch>
        </BrowserRouter>
      </>
    );
  }
}

export default App;
