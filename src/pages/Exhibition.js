import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import DashBoardHeader from "../components/DashBoardHeader";
import { ROOT_API } from "../utils/axios";
import Button from 'react-bootstrap/Button'

import style from './css/admin/Exhibition.module.css'

function Exhibition() {
    const [Name, setName] = useState('');

    useEffect(() => {
        let user_id = localStorage.getItem('user_id');
        let access = localStorage.getItem('access');

        ROOT_API.user_info(user_id, 'JWT ' + access)
            .then((res) => {
                setName({ Name: res.data['username'] });
            })
            .catch((err) => {
                console.log(err)
            })
    }, []);


    return (
        <body className={style.Dashboardclearfix}>
            <DashBoardHeader exhibition={true}></DashBoardHeader>
            <div className={style.Dashcontainer}>
                <nav className={`${style.DashsubNav} ${style.clearfix}`}>
                    <div className={style.place}>
                        <i className="far fa-edit"></i>전시관 관리
                        <span><i className="fas fa-angle-right"></i>전시관 도면 관리</span>
                    </div>
                    {/* <div className={style.place}><i className="fas fa-home"></i>대시보드</div> */}
                    <div className={style.user}>
                        <ul className={style.clearfix}>
                            <li><i className="fas fa-user"></i>{Name.Name}님</li>
                            <li><a href="#" title="로그아웃하기" onClick={function () { localStorage.clear(); window.location.href = '/' }} ><i className="fas fa-unlock"></i>로그아웃</a></li>
                        </ul>
                    </div>
                </nav>
                <div className={`${style.content} ${style.ManageDrawing}`}>
                    <div className={style.pageHead}>
                        <h1 className={`${style.h1} ${style.tit}`}>전시관 도면 관리</h1>
                        <div className={style.Headgroup}>
                            <Button variant="primary" onClick={() => window.location.href = '/exhibition-add'}>새 도면 등록&nbsp;&nbsp;<i className="fas fa-plus"></i></Button>{' '}
                            {/* <button onclick="location.href='ManageDrawing_write.html'" className="btn btn-blue">새 도면 등록<i className="fas fa-plus"></i></button> */}
                        </div>
                    </div>
                    <div className={style.rowgroup}>
                        <div className={`${style.DrawingList} ${style.clearfix}`}>
                            <div className={style.cont}>
                                <div className={`${style.conthead} ${style.clearfix}`}>
                                    <h2 className={`${style.h2} ${style.tit}`}>1층<span className={style.eng}>1F</span></h2>
                                    <div className={style.etcBtn}>
                                        <a href="#" className={style.morebtn}></a>
                                        <ul className={style.etcGroup}>
                                            <li>삭제</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className={style.contbody}>
                                    <div className={style.thumb}><img src="./img/sub/dashboard_img01.png" /></div>
                                    <div className={style.listwrap}>
                                        <ul className={style.list}>
                                            <li>
                                                <span className={style.num}>1</span>
                                                <span className={style.txt}>고래와 바다이야기</span>
                                            </li>
                                            <li>
                                                <span className={style.num}>2</span>
                                                <span className={style.txt}>고래와 바다이야기</span>
                                            </li>
                                            <li>
                                                <span className={style.num}>3</span>
                                                <span className={style.txt}>수산생물의 진화로 보는 바다의 시간</span>
                                            </li>
                                            <li>
                                                <span className={style.num}>4</span>
                                                <span className={style.txt}>우리나라 수산생물</span>
                                            </li>
                                            <li>
                                                <span className={style.num}>5</span>
                                                <span className={style.txt}>수족관</span>
                                            </li>
                                            <li>
                                                <span className={style.num}>6</span>
                                                <span className={style.txt}>참여의 장</span>
                                            </li>
                                            <li>
                                                <span className={style.num}>7</span>
                                                <span className={style.txt}>돔영상관</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className={style.cont}>
                                <div className={`${style.conthead} ${style.clearfix}`}>
                                    <h2 className={`${style.h2} ${style.tit}`}>2층<span className={style.eng}>2F</span></h2>
                                    <div className={style.etcBtn}>
                                        <a href="#" className={style.morebtn}></a>
                                        <ul className={style.etcGroup}>
                                            <li>삭제</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className={style.contbody}>
                                    <div className={style.thumb}><img src="./img/sub/dashboard_img01.png" /></div>
                                    <div className={style.listwrap}>
                                        <ul className={style.list}>
                                            <li>
                                                <span className={style.num}>1</span>
                                                <span className={style.txt}>고래와 바다이야기</span>
                                            </li>
                                            <li>
                                                <span className={style.num}>2</span>
                                                <span className={style.txt}>고래와 바다이야기</span>
                                            </li>
                                            <li>
                                                <span className={style.num}>3</span>
                                                <span className={style.txt}>수산생물의 진화로 보는 바다의 시간</span>
                                            </li>
                                            <li>
                                                <span className={style.num}>4</span>
                                                <span className={style.txt}>우리나라 수산생물</span>
                                            </li>
                                            <li>
                                                <span className={style.num}>5</span>
                                                <span className={style.txt}>수족관</span>
                                            </li>
                                            <li>
                                                <span className={style.num}>6</span>
                                                <span className={style.txt}>참여의 장</span>
                                            </li>
                                            <li>
                                                <span className={style.num}>7</span>
                                                <span className={style.txt}>돔영상관</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className={style.cont}>
                                <div className={`${style.conthead} ${style.clearfix}`}>
                                    <h2 className={`${style.h2} ${style.tit}`}>3층<span className={style.eng}>3F</span></h2>
                                    <div className={style.etcBtn}>
                                        <a href="#" className={style.morebtn}></a>
                                        <ul className={style.etcGroup}>
                                            <li>삭제</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className={style.contbody}>
                                    <div className={style.thumb}><img src="./img/sub/dashboard_img01.png" /></div>
                                    <div className={style.listwrap}>
                                        <ul className={style.list}>
                                            <li>
                                                <span className={style.num}>1</span>
                                                <span className={style.txt}>고래와 바다이야기</span>
                                            </li>
                                            <li>
                                                <span className={style.num}>2</span>
                                                <span className={style.txt}>고래와 바다이야기</span>
                                            </li>
                                            <li>
                                                <span className={style.num}>3</span>
                                                <span className={style.txt}>수산생물의 진화로 보는 바다의 시간</span>
                                            </li>
                                            <li>
                                                <span className={style.num}>4</span>
                                                <span className={style.txt}>우리나라 수산생물</span>
                                            </li>
                                            <li>
                                                <span className={style.num}>5</span>
                                                <span className={style.txt}>수족관</span>
                                            </li>
                                            <li>
                                                <span className={style.num}>6</span>
                                                <span className={style.txt}>참여의 장</span>
                                            </li>
                                            <li>
                                                <span className={style.num}>7</span>
                                                <span className={style.txt}>돔영상관</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* pagenation */}
                </div>
            </div>
        </body>
    );
}

export default withRouter(Exhibition);