import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import MainPage from './pages/MainPage';
import LoginPage from "./pages/LoginPage";
import JoinPage from "./pages/JoinPage";
import MyPage from "./pages/MyPage";

import Dashboard from "./pages/Dashboard";
import ExhibitionNew from "./pages/ExhibitionNew";
import ExhibitionAdd from "./pages/ExhibitionAdd";
import ExhibitionModify from "./pages/ExhibitionModify";
import InnerExhibition from "./pages/InnerExhibition";
import InnerExhibitionDetail from "./pages/InnerExhibitionDetail";
import InnerExhibitionAdd from "./pages/InnerExhibitionAdd";
import InnerExhibitionModify from "./pages/InnerExhibitionModify";
import Event from './pages/Event';
import EventAdd from './pages/EventAdd';
import EventDetail from "./pages/EventDetail";
import EventModify from "./pages/EventModify";
import EventMissionAdd from "./pages/EventMissionAdd";
import EventMissionDetail from "./pages/EventMissionDetail";
import EventMissionModify from "./pages/EventMissionModify";
import test from "./pages/test";


import Service from './pages/Service'
import ServiceSelect from "./pages/ServiceSelect";
import System from "./pages/System";
import SystemUser from "./pages/SystemUser";
import SystemUserModify from "./pages/SystemUserModify";

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
            <Route exact path ='/test/' component={test}/>

            <PrivateRoute path='/dashboard' component={Dashboard} />
            <PrivateRoute path='/exhibition' component={ExhibitionNew} />
            <PrivateRoute path='/exhibition-add' component={ExhibitionAdd} />
            <PrivateRoute path='/exhibition-modify' component={ExhibitionModify} />
            <PrivateRoute path='/inner-exhibition' component={InnerExhibition} />
            <PrivateRoute path='/inner-exhibition-detail' component={InnerExhibitionDetail} />
            <PrivateRoute path='/inner-exhibition-add' component={InnerExhibitionAdd} />
            <PrivateRoute path='/inner-exhibition-modify' component={InnerExhibitionModify} />
            <PrivateRoute path='/event' component={Event} />
            <PrivateRoute path='/event-add' component={EventAdd} />
            <PrivateRoute path='/event-detail' component={EventDetail} />
            <PrivateRoute path='/event-modify' component={EventModify} />
            <PrivateRoute path='/event-mission-add' component={EventMissionAdd} />
            <PrivateRoute path='/event-mission-detail' component={EventMissionDetail} />
            <PrivateRoute path='/event-mission-modify' component={EventMissionModify} />


            <PrivateRoute path='/service' component={Service} />
            <PrivateRoute path='/service-select' component={ServiceSelect} />
            <AdminRoute path='/system' component={System} />
            <AdminRoute path='/system-user' component={SystemUser} />
            <AdminRoute path='/system-user-modify' component={SystemUserModify} />
          </Switch>
        </BrowserRouter>
      </>
    );
  }
}

export default App;
