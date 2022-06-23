import React from "react";
import { withRouter } from "react-router-dom";

// import '../pages/css/main/reset.module.css';
import style from '../pages/css/main/Header.module.css';
class Header extends React.Component {
    state = {
        Name: "",
        museum_name: 0,
        IsAuth: false,
    };

    componentDidMount() {
        this.setState({
            Name: localStorage.getItem('userName'),
            museum_name: localStorage.getItem('museumName'),
            IsAuth: (localStorage.getItem('access') === null ? false : true)
        });
    };

    render() {
        // console.log(this.state)
        return (
            <header id = {style.Mainheader}>
                <div className={`${style.inner} ${style.clearfix}`}>
                    <a href="/">
                        <img src='img/logo.png' alt="seas로고" />
                    </a>
                    <div className={style.utill}>
                        <ul>
                            {this.state.IsAuth === true ? <li class = {style.Mainli}>{this.state.Name}님</li> : <li class = {style.Mainli}><a class = {style.Maina} href='/login'>Login</a></li>}
                            {this.state.IsAuth === true ? null : <li class = {style.Mainli}><a class = {style.Maina} href='/join'>Join</a></li>}
                            {/* <li class = {style.Mainli}><a class = {style.Maina} href='/join'>Join</a></li> */}
                            {this.state.IsAuth === true ? <li class = {style.Mainli}><a class = {style.Maina} href='/mypage'>Mypage</a></li> : null}
                            {/* <li class = {style.Mainli}><a class = {style.Maina} href='/mypage'>Mypage</a></li> */}
                            {/* <li class = {style.Mainli}><a class = {style.Maina} href='/#'>관리자시스템</a></li> */}
                            {this.state.IsAuth === true ? <li class = {style.Mainli}><a class = {style.Maina} href = '#' onClick={function () { localStorage.clear(); window.location.href = '/' }}>Logout</a></li> : null}
                        </ul>
                    </div>
                </div>
            </header>
        );
    }
}
export default withRouter(Header);