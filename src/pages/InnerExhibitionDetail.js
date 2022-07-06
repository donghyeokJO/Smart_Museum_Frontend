import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import DashBoardHeader from "../components/DashBoardHeader";
import { ROOT_API } from "../utils/axios";
import Button from 'react-bootstrap/Button'
import DropdownButton from 'react-bootstrap/DropdownButton';
import { baseURL } from "../config";
import Dropdown from 'react-bootstrap/Dropdown';
import { Chart } from "react-google-charts";
import Calendar from 'react-calendar';

import 'react-calendar/dist/Calendar.css';
import './css/admin/calender.css';

import style from './css/admin/InnerExhibitionDetail.module.css';

function InnerExhibitionDetail({ match }) {
    const [Name, setName] = useState('');
    // const [floor, setfloor] = useState('전체');

    const params = new URLSearchParams(window.location.search);

    const id = params.get("id");

    // console.log(id);

    const [item, setitem] = useState({})

    const user_id = localStorage.getItem('user_id');
    const access = localStorage.getItem('access');

    const [floor, setfloor] = useState('');


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
        ROOT_API.inner_exhibition_get('JWT ' + access, id)
            .then((res) => {
                console.log(res.data);
                setitem(res.data);
                setfloor(res.data['exhibition']['floor_ko']);
            })

    }, []);

    const [dateval, setdateval] = useState(new Date());
    const [datestr, setdatestr] = useState(String(dateval.getFullYear()) + '-' + String(dateval.getMonth() + 1) + '-' + String(dateval.getDate()));
    const [showdata, setshowdata] = useState([]);
    const [dateidx, setdateidx] = useState(0);

    const data = [[
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
    ], [
        ["시간", "관람객수"],
        [9, 80],
        [10, 70],
        [11, 100],
        [12, 90],
        [13, 40],
        [14, 600],
        [15, 18],
        [16, 13],
        [17, 10],
        [18, 120]
    ], [
        ["시간", "관람객수"],
        [9, 100],
        [10, 120],
        [11, 60],
        [12, 90],
        [13, 50],
        [14, 7],
        [15, 28],
        [16, 35],
        [17, 5],
        [18, 20]
    ]];

    useEffect(() => {
        setshowdata(data[dateidx]);
    }, []);

    const [tabledata, settabledata] = useState([]);

    const table = [[
        [1, "참여의 장", "10대", "3,880명"],
        [2, "동영상관", "10대", "3,580명"],
        [3, "수족관", "10대", "3,380명"],
        [4, "고래와 바다이야기", "10대", "3,180명"],
        [5, "수산식품이용가공", "10대", "2,980명"]
    ], [
        [1, "수족관", "10대", "4,380명"],
        [2, "고래와 바다이야기", "10대", "4,180명"],
        [3, "참여의 장", "10대", "2,880명"],
        [4, "동영상관", "10대", "2,580명"],
        [5, "수산식품이용가공", "10대", "1,980명"]
    ], [
        [1, "참여의 장", "10대", "2,880명"],
        [2, "수족관", "10대", "2,380명"],
        [3, "수산식품이용가공", "10대", "1,980명"],
        [4, "동영상관", "10대", "1,580명"],
        [5, "고래와 바다이야기", "10대", "1,180명"],
    ]
    ]

    useEffect(() => {
        settabledata(table[dateidx]);
    }, []);

    const [visitor, setvisitor] = useState(19);
    const getRandom = (min, max) => Math.floor(Math.random() * (max - min) + min);

    const colors = ['#5634AD', '#06C273', '#F0D101', '#FA372D', '#0C85FA'];
    const [chartfilter, setchartfilter] = useState('number');

    const NumberChart = () => {
        return (
            <div className={style.todayAll}>
                <p>관람객</p>
                <div className={style.iconWrap}>
                    <i></i>
                    <span>{visitor}<em>명</em></span>
                </div>
            </div>
        )
    }

    const Agechart = () => {
        let max = Math.floor(visitor / 5);
        let val1 = getRandom(1, max);
        let val2 = getRandom(1, max);
        let val3 = getRandom(1, max);
        let val4 = getRandom(1, max);
        let val5 = visitor - (val1 + val2 + val3 + val4);

        const data = [
            ["연령대", "방문객"],
            ["10대", val5],
            ["20대", val4],
            ["30대", val3],
            ["40대", val2],
            ["50대 이상", val1]
        ];

        return (
            <Chart
                chartType="PieChart"
                data={data}
                width={"100%"}
                height={"320px"}
            />
        );
    }

    const Sexchart = () => {
        let max = Math.floor(visitor / 2);
        let val1 = getRandom(1, max);
        let val2 = visitor - val1

        const data = [
            ["성별", "방문객"],
            ["남성", val2],
            ["여성", val1],
        ];


        return (
            <Chart
                chartType="PieChart"
                data={data}
                width={"100%"}
                height={"320px"}
            />
        );
    }


    const changeDate = (date) => {
        setdateval(date);
        setdatestr(String(dateval.getFullYear()) + '-' + String(dateval.getMonth() + 1) + '-' + String(dateval.getDate()));
        setshowdata(dateidx === 2 ? data[0] : data[dateidx + 1]);
        settabledata(dateidx === 2 ? table[0] : table[dateidx + 1]);
        setvisitor(getRandom(1, 100));

        setdateidx(dateidx === 2 ? 0 : dateidx + 1);

    }

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
            <DashBoardHeader exhibition={true} ex2={true}></DashBoardHeader>
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
                <div className={`${style.content} ${style.ManageInfo_detail}`}>
                    <div className={style.pageHead}>
                        <h1 className={`${style.h1} ${style.tit}`}><span className={`${style.firstbadge} ${style.badge}`}>{floor}</span>{item['name']}</h1>
                        <div className={style.Headgroup}>
                            <Button variant="primary" onClick={() => window.location.href = '/inner-exhibition-modify?id=' + item['pk']}>수정하기&nbsp;&nbsp;</Button>{' '}
                        </div>
                    </div>
                    <div className={`${style.rowgroup} ${style.clearfix}`}>
                        <div className={style.cont01}>
                            <div className={style.contbody}>
                                <div>
                                    <img src={baseURL + item['image']} />
                                </div>
                            </div>
                        </div>
                        <div className={style.cont02}>
                            <div className={`${style.conthead} ${style.clearfix}`}>
                                <div>
                                    <Calendar onChange={changeDate} value={dateval} nextLabel=">" prevLabel="<" />
                                </div>
                            </div>
                        </div>
                        <div className={style.cont05}>
                            <div className={`${style.conthead} ${style.clearfix}`}>
                                <h2 className={`${style.tit} ${style.h2}`}>Today</h2>
                                <DropdownButton id="dropdown-variants-Secondary" key="Secondary" variant="secondary" title="필터 선택" style={{ float: 'right' }}>
                                    <Dropdown.Item onClick={() => setchartfilter('number')}>전체</Dropdown.Item>
                                    <Dropdown.Item onClick={() => setchartfilter('age')}>연령별</Dropdown.Item>
                                    <Dropdown.Item onClick={() => setchartfilter('sex')}>성별</Dropdown.Item>
                                </DropdownButton>
                            </div>
                            <div className={style.contbody}>
                                {chartfilter === "number" ? NumberChart() : chartfilter === "age" ? Agechart() : Sexchart()}
                            </div>
                        </div>
                        <div className={style.cont03}>
                            <div className={style.conthead}>
                                <h2 className={style.h2}>전시관 설명</h2>
                            </div>
                            <div className={style.contbody}>
                                <div className={style.detailtxt}>
                                    <h6 className={style.h6}>{item.txt}</h6>
                                    <p className={style.p}>
                                        {item['explanation']}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className={style.cont04}>
                            <div className={style.conthead}>
                                <h2 className={style.h2}>관람시간</h2>
                            </div>

                            <div className={style.contbody}>
                                <Chart
                                    chartType="LineChart"
                                    data={showdata}
                                    options={options}
                                // legendToggle
                                />
                                <div id="linechart_material"></div>
                            </div>
                        </div>
                        <div className={style.cont06}>
                            <div className={style.conthead}>
                                <h2 className={style.h2}>비컨 정보</h2>
                            </div>
                            <div className={style.contbody}>
                                <div className={style.beacon}>
                                    <div>
                                        <h5>ID</h5>
                                        {/* <p>{item['beacon']}</p> */}
                                        <p>123456</p>
                                    </div>
                                    <div>
                                        <h5>최근 수신</h5>
                                        <p>2022. 07. 05 13 : 15 : 24</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </body>
    );
}

export default withRouter(InnerExhibitionDetail);