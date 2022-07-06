import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import DashBoardHeader from "../components/DashBoardHeader";
import { ROOT_API } from "../utils/axios";
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import { Chart } from "react-google-charts";
import Calendar from 'react-calendar';
import { baseURL } from "../config";

import 'react-calendar/dist/Calendar.css';
import style from './css/admin/Dashboard.module.css';
import './css/admin/calender.css';


function Dashboard() {
    const [Name, setName] = useState('');
    const [Location, setLocation] = useState('');
    const [MuseumName, setMuseumName] = useState('');
    const [imgSrc, setimgSrc] = useState('');
    const [Floor, setFloor] = useState('');

    const [dateval, setdateval] = useState(new Date());
    // const [datestr, setdatestr] = useState(dateval.format('YYYY-MM-DD'));
    const [datestr, setdatestr] = useState(String(dateval.getFullYear()) + '-' + String(dateval.getMonth() + 1) + '-' + String(dateval.getDate()));
    // console.log(dateval.format('YYYY-MM-DD'));

    const changeDate = (date) => {
        setdateval(date);
        setdatestr(String(dateval.getFullYear()) + '-' + String(dateval.getMonth() + 1) + '-' + String(dateval.getDate()))
        // console.log(date);
        // console.log(dateval);
    }

    const [ExhibitionList, setExhibitionList] = useState([]);

    const user_id = localStorage.getItem('user_id');
    const access = localStorage.getItem('access');

    useEffect(() => {
        ROOT_API.user_info(user_id, 'JWT ' + access)
            .then((res) => {
                setName({ Name: res.data['username'] });
                setLocation({ Location: res.data['museum_location'] });
                setMuseumName({ MuseumName: res.data['museum_name'] });
            })
            .catch((err) => {
                console.log(err)
            })
    }, []);

    useEffect(() => {
        console.log('ss');
        ROOT_API.museum_list('JWT ' + access, user_id)
            .then((res) => {
                setExhibitionList(res.data);
                setFloor(res.data[0]['floor']);
                setimgSrc(res.data[0]['drawing_image']);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const data = [
        ["시간", "관람객수"],
        [9, 10],
        [10, 50],
        [11, 70],
        [12, 90],
        [13, 5],
        [14, 70],
        [15, 128],
        [16, 135],
        [17, 105],
        [18, 12]
    ];

    const options = {
        width: '100%',
        height: 320,
        hAxis: {
            title: "시간 (시)",
            gridlines: {
                color: 'transparent',
                interval: [1, 2, 3, 4, 5, 6, 7]
            },

        },
        series: {
            0: { color: '#6219FF' }
        },
        legend: { position: "none" },
    };

    return (
        <body className={style.Dashboardclearfix}>
            <DashBoardHeader main={true}></DashBoardHeader>
            <div className={style.Dashcontainer}>
                <nav className={`${style.DashsubNav} ${style.clearfix}`}>
                    <div className={style.place}><i className="fas fa-home"></i>대시보드</div>
                    <div className={style.user}>
                        <ul className={style.clearfix}>
                            <li><i className="fas fa-user"></i>{Name.Name}님</li>
                            <li><a href="#" title="로그아웃하기" onClick={function () { localStorage.clear(); window.location.href = '/' }} ><i className="fas fa-unlock"></i>로그아웃</a></li>
                        </ul>
                    </div>
                </nav>
                <div className={`${style.content} ${style.dashboard}`}>
                    <div className={`${style.rowgroup} ${style.clearfix}`}>
                        <div className={style.cont01}>
                            <div className={`${style.conthead} ${style.clearfix}`}>
                                <h2 className={`${style.h2} ${style.tit}`}>방문객 이동 경로</h2>
                                <DropdownButton id="dropdown-variants-Secondary" key="Secondary" variant="secondary" title={Floor} style={{ float: 'right' }}>
                                    {ExhibitionList.map((exhibition) => {
                                        // console.log(exhibition);
                                        return (
                                            <Dropdown.Item onClick={() => { setimgSrc(baseURL + exhibition['drawing_image']); setFloor(exhibition['floor_ko']) }}>{exhibition['floor_ko']}</Dropdown.Item>
                                        )
                                    })}
                                    {/* <Dropdown.Item onClick={() => { setimgSrc('./img/sub/dashboard_img01.png'); setFloor('1층') }}>1층</Dropdown.Item>
                                    <Dropdown.Item onClick={() => { setimgSrc('./img/sub/dashboard_img02.png'); setFloor('2층') }}>2층</Dropdown.Item>
                                    <Dropdown.Item onClick={() => { setimgSrc('./img/sub/dashboard_img03.png'); setFloor('지하1층') }}>지하1층</Dropdown.Item> */}
                                </DropdownButton>
                            </div>
                            <div className={style.contbody}>
                                <div><img src={imgSrc} /></div>
                            </div>
                        </div>
                        <div className={style.cont02}>
                            <div className={`${style.conthead} ${style.clearfix}`}>
                                {/* <div id="datepicker"></div> */}
                                <h2 className={style.h2}>날짜 선택</h2>
                                {/* <div className={style.contbody}> */}
                                <div>
                                    <Calendar onChange={changeDate} value={dateval} nextLabel=">" prevLabel="<" />
                                </div>
                                {/* </div> */}

                            </div>
                        </div>
                    </div>
                    <div className={`${style.rowgroup} ${style.clearfix}`}>
                        <div className={style.cont03}>
                            <div className={style.conthead}>
                                <h2>인기전시관</h2>
                            </div>
                            <div className={style.contbody}>
                                <div className={style.tablewrap}>
                                    <table className={style.tabledetail}>
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

                        <div className={style.cont04}>
                            <div className={style.conthead}>
                                <h2>관람시간</h2>
                            </div>

                            <div className={style.contbody}>
                                <Chart
                                    chartType="LineChart"
                                    data={data}
                                    options={options}
                                // legendToggle
                                />
                                <div id="linechart_material"></div>
                            </div>

                        </div>
                        <div className={style.cont05}>
                            <div className={`${style.conthead} ${style.clearfix}`}>
                                <h2 className={style.tit}>Today</h2>
                                {/* <div className="select">
                                    <a href="#">전체</a>
                                    <ul>
                                        <li>전체</li>
                                        <li>연령별</li>
                                        <li>성별</li>
                                    </ul>
                                </div> */}
                                <DropdownButton id="dropdown-variants-Secondary" key="Secondary" variant="secondary" title="필터 선택" style={{ float: 'right' }}>
                                    <Dropdown.Item href="#/action-1">전체</Dropdown.Item>
                                    <Dropdown.Item href="#/action-2">연령별</Dropdown.Item>
                                    <Dropdown.Item href="#/action-3">성별</Dropdown.Item>
                                </DropdownButton>
                            </div>
                            <div className={style.contbody}>
                                <div className={style.todayAll}>
                                    <p>관람객</p>
                                    <div className={style.iconWrap}>
                                        <i></i>
                                        <span>19<em>명</em></span>
                                    </div>
                                </div>
                                <div className={style.todayAge} style={{ display: 'none' }}>
                                    <div id="piechart" style={{ width: '100%', height: 'auto' }}></div>
                                </div>
                                <div className={style.todayGender} style={{ display: 'none' }}>
                                    <div id="piechart2" style={{ width: '100%', height: 'auto' }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </body >
    );
}

export default withRouter(Dashboard);