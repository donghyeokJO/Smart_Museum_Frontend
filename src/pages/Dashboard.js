import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import DashBoardHeader from "../components/DashBoardHeader";
import { ROOT_API } from "../utils/axios";
import jwt from "jsonwebtoken";

// import './css/admin/common.css';
// import './css/admin/datepicker-custom.css';
// import './css/admin/datepicker.css';
// import './css/admin/datepicker.min.css';
// import './css/admin/fontawesome.min.css';
// import './css/admin/reset.css';
// import './css/admin/styles.css';
import style from './css/admin/DashboardHeader.module.css';


function Dashboard() {
    return (
        <body className={style.Dashboardclearfix}>
            <DashBoardHeader></DashBoardHeader>
            {/* <div id="container">
                <nav id="subNav" className="clearfix">
                    <div className="place"><i className="fas fa-home"></i>대시보드</div>
                    <div className="user">
                        <ul className="clearfix">
                            <li><i className="fas fa-user"></i>김홍삼님</li>
                            <li><a href="#" title="로그아웃하기"><i className="fas fa-unlock"></i>로그아웃</a></li>
                        </ul>
                    </div>
                </nav>
                <div className="content dashboard">
                    <div className="rowgroup clearfix">
                        <div className="cont01">
                            <div className="cont-head clearfix">
                                <h2 className="tit">방문객 이동 경로</h2>
                                <div className="select">
                                    <a href="#">1층</a>
                                    <ul className="select-btn">
                                        <li className="on">1층</li>
                                        <li>2층</li>
                                        <li>지하1층</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="cont-body">
                                <div><img src="./img/sub/dashboard_img01.png" /></div>
                            </div>
                        </div>
                        <div className="cont02">
                            <div className="cont-head clearfix">
                                <div id="datepicker"></div>
                            </div>
                        </div>
                    </div>
                    <div className="rowgroup clearfix">
                        <div className="cont03">
                            <div className="cont-head">
                                <h2>인기전시관</h2>
                            </div>
                            <div className="cont-body">
                                <div className="table-wrap">
                                    <table className="table-detail">
                                        <colgroup>
                                            <col width="15%" />
                                            <col width="30%" />
                                            <col width="*" />
                                            <col width="30%" />
                                        </colgroup>
                                        <thead>
                                            <tr>
                                                <th>순위</th>
                                                <th>전시관</th>
                                                <th>연령</th>
                                                <th>누적관람객</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>1</td>
                                                <td>참여의 장</td>
                                                <td>10대</td>
                                                <td>3,880명</td>
                                            </tr>
                                            <tr>
                                                <td>2</td>
                                                <td>돔영상관</td>
                                                <td>10대</td>
                                                <td>3,580명</td>
                                            </tr>
                                            <tr>
                                                <td>3</td>
                                                <td>수족관</td>
                                                <td>10대</td>
                                                <td>3,380명</td>
                                            </tr>
                                            <tr>
                                                <td>4</td>
                                                <td>고래와 바다이야기</td>
                                                <td>10대</td>
                                                <td>3,180명</td>
                                            </tr>
                                            <tr>
                                                <td>5</td>
                                                <td>수산식품이용가공</td>
                                                <td>10대</td>
                                                <td>2,980명</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div className="cont04">
                            <div className="cont-head">
                                <h2>관람시간</h2>
                            </div>
                            <div className="cont-body">
                                <div id="linechart_material"></div>
                            </div>
                        </div>
                        <div className="cont05">
                            <div className="cont-head clearfix">
                                <h2 className="tit">Today</h2>
                                <div className="select">
                                    <a href="#">전체</a>
                                    <ul>
                                        <li>전체</li>
                                        <li>연령별</li>
                                        <li>성별</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="cont-body">
                                <div className="todayAll">
                                    <p>관람객</p>
                                    <div className="iconWrap">
                                        <i></i>
                                        <span>19<em>명</em></span>
                                    </div>
                                </div>
                                <div className="todayAge" style={{ display: 'none' }}>
                                    <div id="piechart" style={{ width: '100%', height: 'auto' }}></div>
                                </div>
                                <div className="todayGender" style={{ display: 'none' }}>
                                    <div id="piechart2" style={{ width: '100%', height: 'auto' }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
        </body>
    );
}

export default withRouter(Dashboard)