import React from "react";
import { withRouter } from "react-router-dom";

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

            <header>
                <div class="inner clearfix">
                    <a href="/">
                        <img src='img/logo.png' alt="seas로고" />
                    </a>
                    <div class="utill">
                        <ul>
                            {this.state.IsAuth === true ? <li>{this.state.Name}님</li> : <li><a href='/login'>Login</a></li>}
                            {this.state.IsAuth === true ? null : <li><a href='/join'>Join</a></li>}
                            {/* <li><a href='/join'>Join</a></li> */}
                            {this.state.IsAuth === true ? <li><a href='/mypage'>Mypage</a></li> : null}
                            {/* <li><a href='/mypage'>Mypage</a></li> */}
                            {/* <li><a href='/#'>관리자시스템</a></li> */}
                            {this.state.IsAuth === true ? <li class='li_btn' onClick={function () { localStorage.clear(); window.location.href = '/' }}>Logout</li> : null}
                        </ul>
                    </div>
                </div>
            </header>
        );
    }
}
export default withRouter(Header);