import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import DashBoardHeader from "../components/DashBoardHeader";
import { ROOT_API } from "../utils/axios";
import { baseURL } from "../config";
import Button from 'react-bootstrap/Button';
import EventPost from "../utils/EventPost";
import Pagination from "../utils/pagination";

import style from './css/admin/Event.module.css';

function Event() {
    const [Name, setName] = useState('');
    const user_id = localStorage.getItem('user_id');
    const access = localStorage.getItem('access');

    const [event, setEvent] = useState('전체');
    const [eventList, seteventList] = useState([]);
    const [items, setitems] = useState([]);

    const params = new URLSearchParams(window.location.search);
    const page = params.get("page");
    const type = params.get("type");

    const [postsPerPage, setPostsPerPage] = useState(6);
    const [TotalLength, setTotalLength] = useState(0);

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
        ROOT_API.event_pagination('JWT ' + access, page, type)
            .then((res) => {
                // console.log(res.data);
                seteventList(res.data['results']);
                setitems(res.data['results']);
                setTotalLength(res.data['count'])
            })
    }, []);

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
                        <h1 className={`${style.h1} ${style.tit}`}>이벤트</h1>
                        <div className={style.Headgroup}>
                            <Button variant="primary" onClick={() => window.location.href = '/event-mission-add'}>미션이벤트 등록<i className="fas fa-plus"></i></Button>{' '}
                            <Button variant="success" onClick={() => window.location.href = '/event-add'}>새 이벤트 등록&nbsp;&nbsp;<i className="fas fa-plus"></i></Button>{' '}
                        </div>
                    </div>
                    <ul id={style.tabul}>
                        <li className={type === null ? style.on : null} onClick={() => {window.location.href = '/event' }}>전체</li>
                        <li className={type === "2" ? style.on : null} onClick={() => {window.location.href = '/event?type=2'   }}>미션이벤트</li>
                        <li className={type === "1" ? style.on : null} onClick={() => {  window.location.href = '/event?type=1' }}>이벤트</li>
                    </ul>
                    <div className={`${style.tabcont} ${style.clearfix}`}>
                        <div className={`${style.all} ${style.clearfix}`}>
                            <EventPost Events={items}></EventPost>
                        </div>
                    </div>
                    {/* pagination */}
                    <Pagination
                        postsPerPage={postsPerPage}
                        totalPosts={TotalLength}
                        link={type !== null ? '/event?type=' + type + '&page=' : '/event?page='}
                    ></Pagination>
                </div>
            </div>
        </body>
    )
}

export default withRouter(Event);