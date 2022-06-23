import React, {useEffect} from "react";
import { withRouter, useHistory } from "react-router-dom";
import { ROOT_API } from "../utils/axios";

// import './css/main/index.css';
import style from './css/main/JoinPage.module.css';

class JoinPage extends React.Component {
    state = {
        Name: "",
        Password: "",
        location: "",
        museum_name: "",
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

    onLocationHandler = (e) => {
        this.setState({
            location: e.target.value,
        });
    }

    onMuseumNameHandler = (e) => {
        this.setState({
            museum_name: e.target.value,
        });
    }

    onSubmitHandler = (e) => {
        // console.log(this.state)
        e.preventDefault();
        if (this.state.Password.length < 5){
            alert('비밀번호는 5글자 이상이어야 합니다.');
            return
        }

        var token = localStorage.getItem('access')

        ROOT_API.account(this.state.Name, this.state.Password, this.state.location, this.state.museum_name, token)
            .then((res) => {
                if (res.status === 200){
                    alert('정상적으로 가입 되었습니다!');
                    localStorage.setItem('username', res.data['username']);
                    window.location.href = '/service';
                }
            })
            .catch((err) => {
                alert('이미 사용 중인 아이디 입니다!');
                console.log(err)
                return 
            })
    }

    render() {
        return (
            <div id="wrap" className={style.contentwrap}>
                <div className={style.content}>
                    <form onSubmit={this.onSubmitHandler}>
                        <div>
                            <label>ID</label>
                            <input type="text" value={this.state.Name} onChange={this.onNameHandler} placeholder="아이디를 입력해주세요" />
                        </div>
                        <div>
                            <label>Password</label>
                            <input type="password" value={this.state.Password} onChange={this.onPasswordHandler} placeholder="비밀번호를 입력해주세요" />
                        </div>
                        <div>
                            <label>지역</label>
                            <select value={this.state.location} onChange={this.onLocationHandler}>
                                <option hidden>지역을 선택해주세요.</option>
                                <option>서울</option>
                                <option>부산</option>
                            </select>
                        </div>
                        <div>
                            <label>과학관이름</label>
                            <input type="text" value={this.state.museum_name} onChange={this.onMuseumNameHandler} placeholder="과학관 이름을 입력해주세요" />
                        </div>
                        <div className={style.buttonwrap}>
                            <button type="submit" className={style.mint}>Join</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default withRouter(JoinPage);