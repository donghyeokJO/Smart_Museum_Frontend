import React from "react";
import { withRouter } from "react-router-dom";
import { ROOT_API } from "../utils/axios";
import jwt from "jsonwebtoken";


// import './css/main/index.css';
// import './css/main/reset.css';
import style from './css/main/LoginPage.module.css';

class LoginPage extends React.Component {
    state = {
        Name: "",
        Password: "",
        Id: 0,
        museum_name: 0,
        IsAuth: false,
    };

    onNameHandler = (e) => {
        this.setState({
            Name: e.target.value,
        });
    };

    onPasswordHandler = (e) => {
        this.setState({
            Password: e.target.value,
        });
    };

    onSubmitHandler = (e) => {
        // console.log(this.state);
        e.preventDefault();
        ROOT_API.token_auth(this.state.Name, this.state.Password)
            .then((res) => {
                // console.log(res)
                if (res.data === null) {
                    alert("계정 정보가 올바르지 않습니다.");
                }
                // console.log(res.data['access'])
                localStorage.clear();
                localStorage.setItem('access', res.data['access']);
                localStorage.setItem('refresh', res.data['refresh']);

                let access = res.data['access'];
                let refresh = res.data['refresh'];

                let user_info = jwt.decode(access);
                let user_id = user_info['user_id'];
                // console.log(user_id)


                ROOT_API.user_info(user_id, 'JWT ' + access)
                    .then((res) => {
                        console.log(res.data)
                        if (res.data === null) {
                            alert("계정 정보가 올바르지 않습니다.");
                        }

                        // console.log(res.data)
                        let user_name = res.data['username'];
                        let museum_name = res.data['museum_name'];
                        let museum_location = res.data['museum_location'];

                        localStorage.setItem('museumLocation', museum_location);


                        let data = { user_name, museum_name, user_id }
                        console.log(data)
                        this.props.onSubmit(data)
                        this.props.history.push("/");
                    })
                    .catch((err) => {
                        console.log(err)
                    })

            })
            .catch((err) => {
                alert('올바르지 않은 정보입니다.')
                console.log(err)
            });
    };


    render() {
        return (
            <div id="wrap" className={style.contentwrap}>
                <div className={style.content}>
                    <form onSubmit={this.onSubmitHandler}>
                        <div>
                            <input type="text"
                                value={this.state.Name}
                                onChange={this.onNameHandler}
                                placeholder="ID를 입력해주세요." />
                        </div>
                        <div>
                            <input type="password"
                                value={this.state.Password}
                                onChange={this.onPasswordHandler}
                                placeholder="비밀번호를 입력해주세요." />
                        </div>
                        <div className={style.buttonwrap}>
                            <button type="submit" className={style.mint}>Login</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default withRouter(LoginPage);