import React, {useEffect, useState} from "react";
import { withRouter } from "react-router-dom";
import { ROOT_API } from "../utils/axios";

import style from './css/main/Service.module.css';

function Service() {
    const [name, setName] = useState('');

    useEffect(() => {
        let name = localStorage.getItem('username');
        
        if (name === null) {
            alert('로그인 이후에 사용해 주세요!');
            window.location.href = '/login';
        }

        setName({name: name})
    }, []);

    return (
    <div id="wrap" class={style.contentwrap}>
        <div class={style.content} id={style.service}>
            <p>반갑습니다, {name.name}님<br/>
                <span>‘SEAS 서비스 신청' 을 하시겠습니까?</span>
            </p>
            <div class={style.buttonwrap}>
                <button type="button" class={style.btn1} onclick="location.href='../service02.html'">네, 지금할래요</button>
                <button type="button" class={style.btn2}>아니요, 다음에할래요</button>
            </div>
        </div>
    </div>
    );
}

export default withRouter(Service);