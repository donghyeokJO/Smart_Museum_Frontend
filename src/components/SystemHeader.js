import React from "react";
import { withRouter } from "react-router-dom";

import style from '../pages/css/system/SystemHeader.module.css';
import { ROOT_API } from "../utils/axios";

class SystemHeader extends React.Component {
    // const SystemHeader = ({active}) => {
    state = {
        New: '',
    };

    componentDidMount() {
        let access = localStorage.getItem('access');

        ROOT_API.account_list2('JWT ' + access)
            .then((res) => {
                let cnt = 0;
                for (let i = 0; i < res.data.length; i++) {
                    if (res.data[i]['payment_state'] !== 3) {
                        cnt++;
                    }
                }
                this.setState({ New: cnt });
            })
    }

    render() {
        return (
            <header id={style.SystemHeader}>
                <h1><a href="/">보통로고</a></h1>
                <nav>
                    <ul>
                        <li className={this.props.Service ? style.on : null}><a href="/system">서비스이용료<span>{this.state.New}</span></a></li>
                        {/* <li><a href="fee.html">서비스이용료</a></li> */}
                        <li className={this.props.Member ? style.on : null}><a href="/system-user">회원정보</a></li>
                    </ul>
                </nav>
                <p className={style.open_menu}><a href="#">메뉴열기</a></p>
                <p className={style.close_menu}><a href="#">메뉴닫기</a></p>
                <div className={style.bgbk}></div>
            </header>
        );
    };
}

export default withRouter(SystemHeader);
// export default SystemHeader;