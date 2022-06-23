import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";

import style from './css/main/Service.module.css';

function Service() {
    function toSelect(e) {
        e.preventDefault();
        window.location.replace('/service-select');
    }

    function toIndex(e) {
        e.preventDefault();
        window.location.replace('/');
    }


    return (
        <div id="wrap" className={style.contentwrap}>
            <div className={style.content} id={style.service}>
                <p>반갑습니다, {localStorage.getItem('userName')}님<br />
                    <span>‘SEAS 서비스 신청' 을 하시겠습니까?</span>
                </p>
                <div className={style.buttonwrap}>
                    <button type="button" className={style.btn1} onClick={toSelect}>네, 지금할래요</button>
                    <button type="button" className={style.btn2} onClick={toIndex}>아니요, 다음에할래요</button>
                </div>
            </div>
        </div>
    );
}

export default withRouter(Service);