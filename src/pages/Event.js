import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import DashBoardHeader from "../components/DashBoardHeader";
import { ROOT_API } from "../utils/axios";
import { baseURL } from "../config";
import Button from 'react-bootstrap/Button'

import style from './css/admin/Event.module.css';

function Event() {
    const [Name, setName] = useState('');
    const user_id = localStorage.getItem('user_id');
    const access = localStorage.getItem('access');

    const [event, setEvent] = useState('전체');
    const [eventList, seteventList] = useState([]);
    const [items, setitems] = useState([]);

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
        ROOT_API.event_get('JWT ' + access)
            .then((res) => {
                console.log(res.data);
                seteventList(res.data);
                setitems(res.data);
            })
    }, []);

    const currentEvent = event => {
        if (event === "전체") {
            setitems(eventList);
            return
        }

        // setitems(originalitems);
        setitems(eventList.filter(item => item['type'] === event));
    }

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
                <div className={`${style.content} ${style.Event}`}>
                    <div className={style.pageHead}>
                        <h1 className={`${style.tit} ${style.h1}`}>이벤트</h1>
                        <div className={style.Headgroup}>
                            <Button variant="primary" onClick={() => window.location.href = '#'}>미션이벤트 등록&nbsp;&nbsp;<i className="fas fa-plus"></i></Button>{' '}
                            <Button variant="primary" onClick={() => window.location.href = '#'}>새 이벤트 등록&nbsp;&nbsp;<i className="fas fa-plus"></i></Button>{' '}
                        </div>
                    </div>
                    <ul id={style.tabul}>
                        {/* <li className={style.on}>전체</li> */}
                        <li className={event === "전체" ? style.on : null} onClick={() => { setEvent('전체'); currentEvent("전체") }}>전체</li>
                        <li className={event === "Mission" ? style.on : null} onClick={() => { setEvent('Mission'); currentEvent("Mission") }}>미션이벤트</li>
                        <li className={event === "Normal" ? style.on : null} onClick={() => { setEvent('Normal'); currentEvent("Normal") }}>이벤트</li>
                    </ul>
                    <div className={`${style.tabcont} ${style.clearfix}`}>
                        <div className={`${style.all} ${style.clearfix}`}>
                            {items.map((item) => {
                                let cls = item['type'] === "Mission" ? `${style.division} ${style.mission}` : `${style.division} ${style.normal}`;
                                let evt_txt = item['type'] === "Mission" ? "미션 이벤트" : "이벤트";
                                let img_src = baseURL + item['image'];
                                let url = item['type'] === "Mission" ? "/event-mission-detail?id=" + item['pk'] : "/event-detail?id=" + item['pk'];
                                return (
                                    <div className={style.imgcont}>
                                        <a href={url}>
                                            <div className={style.thumb}>
                                                <img src={img_src} alt={item['name']} />
                                            </div>
                                            <div className={style.text}>
                                                <div className={style.detail}>
                                                    <span className={cls}>{evt_txt}</span>
                                                    <div className={style.title}>
                                                        <span className={style.txt}>{item['name']}</span>
                                                    </div>
                                                    <div className={style.etcBtn}>
                                                        <a href="#" className={style.morebtn}></a>
                                                        <ul className={style.etcGroup}>
                                                            <li>삭제</li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    {/* pagination */}
                </div>
            </div>
        </body>
    )
}

export default withRouter(Event);