import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import MainPage from './pages/MainPage';
import LoginPage from "./pages/LoginPage";
import JoinPage from "./pages/JoinPage";
import MyPage from "./pages/MyPage";

import Dashboard from "./pages/Dashboard";
import Exhibition from "./pages/Exhibition";
import ExhibitionNew from "./pages/ExhibitionNew";
import ExhibitionAdd from "./pages/ExhibitionAdd";
import InnerExhibition from "./pages/InnerExhibition";
import InnerExhibitionDetail from "./pages/InnerExhibitionDetail";
import InnerExhibitionAdd from "./pages/InnerExhibitionAdd";

import Service from './pages/Service'
import ServiceSelect from "./pages/ServiceSelect";
import System from "./pages/System";
import SystemUser from "./pages/SystemUser";

import PrivateRoute from "./utils/private_route";
import AdminRoute from "./utils/AdminRoute";

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
            <Route exact path='/login' component={LoginPage} />
            <Route exact path='/join' component={JoinPage} />
            <PrivateRoute path='/mypage' component={MyPage} />


            <PrivateRoute path='/dashboard' component={Dashboard} />
            {/* <PrivateRoute path='/exhibition' component={Exhibition} /> */}
            <PrivateRoute path='/exhibition' component={ExhibitionNew} />
            <PrivateRoute path='/exhibition-add' component={ExhibitionAdd} />
            <PrivateRoute path='/inner-exhibition' component={InnerExhibition} />
            <PrivateRoute path='/inner-exhibition-detail' component={InnerExhibitionDetail} />
            <PrivateRoute path='/inner-exhibition-add' component={InnerExhibitionAdd} />


            <PrivateRoute path='/service' component={Service} />
            <PrivateRoute path='/service-select' component={ServiceSelect} />
            <AdminRoute path='/system' component={System} />
            <AdminRoute path='/system-user' component={SystemUser} />
          </Switch>
        </BrowserRouter>
      </>
    );
  }
}

export default App;
