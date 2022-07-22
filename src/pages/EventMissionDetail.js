import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import DashBoardHeader from "../components/DashBoardHeader";
import { ROOT_API } from "../utils/axios";
import { baseURL } from "../config";
import Button from 'react-bootstrap/Button';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';

import style from './css/admin/EventMissionDetail.module.css';

function EventMissionDetail() {
    const [Name, setName] = useState('');
    const user_id = localStorage.getItem('user_id');
    const access = localStorage.getItem('access');
    const [event, setevent] = useState([]);

    const params = new URLSearchParams(window.location.search);

    const id = params.get("id");

    const [inner, setinner] = useState([]);
    const [current, setCurrent] = useState([]);

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
                console.log(res.data);
                setevent(res.data);
                setinner(res.data['inner_exhibition']);
                setCurrent(res.data['inner_exhibition']);
            })
    }, []);

    const [floor, setfloor] = useState('전체');
    const [floorpk, setfloorpk] = useState('');
    const [ExhibitionList, setExhibitionList] = useState([]);

    useEffect(() => {
        // console.log('ss');
        ROOT_API.museum_list('JWT ' + access, user_id)
            .then((res) => {
                setExhibitionList(res.data);
                // setfloor(res.data[0]['floor_ko']);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const onChangeFloor = floor => {
        // console.log(floor);
        if (floor === "전체") {
            setCurrent(inner);
            return
        }

        setCurrent(inner.filter(item => item['exhibition']['floor_ko'] === floor));
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
                <div class={`${style.content} ${style.mEvent_detail} ${style.mEvent_write} ${style.WRITEFORM}`}>
                    <div class={style.pageHead}>
                        <h1 class={`${style.tit} ${style.h1}`}>미션 이벤트 상세</h1>
                        <div class={style.Headgroup}>
                            <Button variant="primary" onClick={() => window.location.href = '/event-mission-modify?id=' + event['pk']}>업데이트</Button>{' '}
                        </div>
                    </div>
                    <div class={`${style.rowgroup} ${style.clearfix}`}>
                        <div class={`${style.Form} ${style.Form1}`}>
                            <div class={`${style.thumb} ${style.emptyimg}`}>
                                <img src={baseURL + event['image']} alt="전시관 이미지" />
                            </div>
                        </div>
                        <div class={`${style.Form} ${style.Form2}`}>
                            <div class={style.input1}>
                                <dl class={style.inputgroup}>
                                    <dt>이벤트 이름</dt>
                                    <dd class="fix-width">
                                        <p>{event['name']}</p>
                                    </dd>
                                </dl>
                            </div>
                            <div class={style.input1}>
                                <dl class={style.inputgroup}>
                                    <dt>구분</dt>
                                    <dd class={style.clearfix}>
                                        <DropdownButton id="dropdown-variants-Secondary" key="Secondary" variant="secondary" title={floor} >
                                            <Dropdown.Item onClick={() => { setfloor("전체"); onChangeFloor("전체") }}>전체</Dropdown.Item>
                                            {ExhibitionList.map((exhibition) => {
                                                let pk = exhibition['pk'];
                                                // console.log(exhibition);
                                                return (
                                                    <Dropdown.Item onClick={() => { setfloor(exhibition['floor_ko']); onChangeFloor(exhibition['floor_ko']) }}>{exhibition['floor_ko']}</Dropdown.Item>
                                                )
                                            })}
                                        </DropdownButton>
                                    </dd>
                                </dl>
                            </div>
                            <div>
                                <ul class={style.ListExhibition}>
                                    {current.map((inn, idx) => {
                                        return (
                                            <li class={style.edit}>
                                                <div class={style.info}>
                                                    <span class={style.num}>{idx+1}</span>
                                                    <span class={style.txt}>{inn['name']}</span>
                                                </div>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </body >
    );

}

export default withRouter(EventMissionDetail);