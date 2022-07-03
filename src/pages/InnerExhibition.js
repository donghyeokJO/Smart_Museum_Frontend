import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import DashBoardHeader from "../components/DashBoardHeader";
import { ROOT_API } from "../utils/axios";
import Button from 'react-bootstrap/Button'

import style from './css/admin/InnerExhibition.module.css'

function InnerExhibition() {
    const [Name, setName] = useState('');
    const [floor, setfloor] = useState('전체');

    const originalitems = [
        { floor: "1층", num: "1", txt: "고래와 바다이야기", src: "./img/sub/exhibition01.jpg", id: "1" },
        { floor: "1층", num: "2", txt: "고래와 바다이야기2", src: "./img/sub/exhibition02.jpg", id: "2" },
        { floor: "1층", num: "3", txt: "수산생물의 진화로 보는 바다의 시간", src: "./img/sub/exhibition03.jpg", id: "3" },
        { floor: "2층", num: "1", txt: "수산과학과 수산자원", src: "./img/sub/exhibition04.jpg", id: "4" },
        { floor: "2층", num: "2", txt: "어업기술의 발전", src: "./img/sub/exhibition05.jpg", id: "5" },
        { floor: "지하1층", num: "1", txt: "물고기 문화 예술품 전시실", src: "./img/sub/exhibition06.jpg", id: "6" }
    ];


    const [items, setitems] = useState([]);

    const floors = ['1층', '2층', '지하1층'];

    useEffect(() => {
        let user_id = localStorage.getItem('user_id');
        let access = localStorage.getItem('access');

        setitems(originalitems);

        ROOT_API.user_info(user_id, 'JWT ' + access)
            .then((res) => {
                setName({ Name: res.data['username'] });
            })
            .catch((err) => {
                console.log(err)
            })
    }, []);

    const currentFloor = floor => {
        if (floor === "전체") {
            // console.log('sex')
            setitems(originalitems);
            return
        }

        // setitems(originalitems);
        setitems(originalitems.filter(item => item.floor === floor));
    }

    return (
        <body className={style.Dashboardclearfix}>
            <DashBoardHeader exhibition={true}></DashBoardHeader>
            <div className={style.Dashcontainer}>
                <nav className={`${style.DashsubNav} ${style.clearfix}`}>
                    <div className={style.place}>
                        <i className="far fa-edit"></i>전시관 관리
                        <span><i className="fas fa-angle-right"></i>전시관 정보 관리</span>
                    </div>
                    <div className={style.user}>
                        <ul className={style.clearfix}>
                            <li><i className="fas fa-user"></i>{Name.Name}님</li>
                            <li><a href="#" title="로그아웃하기" onClick={function () { localStorage.clear(); window.location.href = '/' }} ><i className="fas fa-unlock"></i>로그아웃</a></li>
                        </ul>
                    </div>
                </nav>
                <div className={`${style.content} ${style.ManageInfo}`}>
                    <div className={style.pageHead}>
                        <h1 className={`${style.h1} ${style.tit}`}>전시관 정보 관리</h1>
                        <div className={style.Headgroup}>
                            <Button variant="primary" onClick={() => window.location.href = '#'}>새 전시관 등록&nbsp;&nbsp;<i className="fas fa-plus"></i></Button>{' '}
                        </div>
                    </div>
                    <ul id={style.tabul}>
                        <li className={floor === "전체" ? style.on : null} onClick={() => { setfloor('전체'); currentFloor("전체") }}>전체</li>
                        <li className={floor === "1층" ? style.on : null} onClick={() => { setfloor('1층'); currentFloor("1층") }}>1층</li>
                        <li className={floor === "2층" ? style.on : null} onClick={() => { setfloor('2층'); currentFloor("2층") }}>2층</li>
                        <li className={floor === "지하1층" ? style.on : null} onClick={() => { setfloor('지하1층'); currentFloor("지하1층") }}>지하1층</li>
                    </ul>


                    <div className={`${style.tabcont} ${style.clearfix}`}>
                        <div className={`${style.all} ${style.clearfix}`}>
                            {items.map(item => {
                                let cls = item.floor === floors[0] ? `${style.division} ${style.first}` : item.floor === floors[1] ? `${style.division} ${style.second}` : `${style.division} ${style.under}`;
                                let url = '/inner-exhibition-detail/' + item.id
                                return (
                                    <div className={style.imgcont}>
                                        <a href={url} item={item}>

                                            <div className={style.thumb}>
                                                <img src={item.src} alt="전시관1" />
                                            </div>
                                            <div className={style.text}>
                                                <span className={cls}>{item.floor}</span>
                                                <div className={style.detail}>
                                                    <div className={style.title}>
                                                        <span className={style.num}>{item.num}</span>
                                                        <span className={style.txt}>{item.txt}</span>
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
                                );
                            })}
                        </div>
                    </div>
                    {/* pagenation */}
                </div>
            </div>
        </body>
    );

}

export default withRouter(InnerExhibition);