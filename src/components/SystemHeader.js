import React from "react";
import { withRouter } from "react-router-dom";

import style from '../pages/css/system/SystemHeader.module.css';

class SystemHeader extends React.Component {
    state = {
        New: ''
    }

    render() {
        return (
            <header id={style.SystemHeader}>
                <h1><a href="index.html">보통로고</a></h1>
                <nav>
                    <ul>
                        <li class={style.on}><a href="index.html">서비스신청<span>추가</span></a></li>
                        <li><a href="fee.html">서비스이용료</a></li>
                        <li><a href="member.html">회원정보</a></li>
                    </ul>
                </nav>
                <p className={style.open_menu}><a href="#">메뉴열기</a></p>
                <p className={style.close_menu}><a href="#">메뉴닫기</a></p>
                <div className={style.bgbk}></div>
            </header>
        )
    };
}

export default withRouter(SystemHeader);