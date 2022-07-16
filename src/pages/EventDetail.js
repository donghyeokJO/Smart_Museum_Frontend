import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import DashBoardHeader from "../components/DashBoardHeader";
import { ROOT_API } from "../utils/axios";
import { baseURL } from "../config";
import Button from 'react-bootstrap/Button';

import style from './css/admin/EventDetail.module.css';

function EventDetail() {
    const [Name, setName] = useState('');
    const user_id = localStorage.getItem('user_id');
    const access = localStorage.getItem('access');
    const [event, setevent] = useState([]);

    const params = new URLSearchParams(window.location.search);

    const id = params.get("id");

    useEffect(() => {
        ROOT_API.user_info(user_id, 'JWT ' + access)
            .then((res) => {
                setName({ Name: res.data['username'] });
            })
            .catch((err) => {
                console.log(err)
            })
    }, []);

    useEffect(() => {
        ROOT_API.event_get_by_id('JWT ' + access, id)
            .then((res) => {
                // console.log(res.data);
                setevent(res.data);
            })
    }, []);

    const start = new Date(event['start_dt']).getDay();
    const end = new Date(event['end_dt']).getDay();

    const weekday = [
        '일', '월', '화', '수', '목', '금', '토'
    ]

    return (
        <body className={style.body}>
            <DashBoardHeader event={true}></DashBoardHeader>
            <div className={style.Dashcontainer}>
                <nav className={`${style.DashsubNav} ${style.clearfix}`}>
                    <div className={style.place}>
                        <i className="fas fa-gift"></i>이벤트
                    </div>
                    <div className={style.user}>
                        <ul className={style.clearfix}>
                            <li><i className="fas fa-user"></i>{Name.Name}님</li>
                            <li><a href="#" title="로그아웃하기" onClick={function () { localStorage.clear(); window.location.href = '/' }} ><i className="fas fa-unlock"></i>로그아웃</a></li>
                        </ul>
                    </div>
                </nav>
                <div className={`${style.content} ${style.Event_detail} ${style.WRITEFORM}`}>
                    <div className={style.pageHead}>
                        <h1 className={`${style.tit} ${style.h1}`}>이벤트 상세</h1>
                        <div className={style.Headgroup}>
                            <Button variant="primary" onClick={() => window.location.href = '/event-modify?id=' + event['pk']}>업데이트</Button>{' '}
                        </div>
                    </div>
                    <div className={`${style.rowgroup} ${style.clearfix}`}>
                        <div className={`${style.Form} ${style.Form1}`}>
                            <div className={`${style.thumb} ${style.emptyimg}`}>
                                <img src={baseURL + event['image']} alt="전시관 이미지" />
                            </div>
                        </div>
                        <div className={`${style.Form} ${style.Form2}`}>
                            <div className={style.input1}>
                                <dl className={style.inputgroup}>
                                    <dt>이벤트 이름</dt>
                                    <dd className="fix-width">
                                        <p>{event['name']}</p>
                                    </dd>
                                </dl>
                            </div>
                            <div className={style.input1}>
                                <dl className={style.inputgroup}>
                                    <dt>이벤트 기간</dt>
                                    <dd>
                                        <p>{String(event['start_dt']).substr(0, 10)}({weekday[start]}) ~ {String(event['end_dt']).substr(0, 10)}({weekday[end]})</p>
                                    </dd>
                                </dl>
                            </div>
                            <div className={`${style.input1} ${style.textarea}`}>
                                <dl className={style.inputgroup}>
                                    <dt>상세 설명</dt>
                                    <dd>
                                        <textarea value={event['explanation']} readOnly></textarea>
                                    </dd>
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </body>
    )
}

export default withRouter(EventDetail);