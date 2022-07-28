import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import DashBoardHeader from "../components/DashBoardHeader";
import { ROOT_API } from "../utils/axios";
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import { Chart } from "react-google-charts";
import Calendar from 'react-calendar';
import { baseURL } from "../config";
import ImageMarker from 'react-image-marker';
import Lineto, {Line} from 'react-lineto';

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

    const [ExhibitionList, setExhibitionList] = useState([]);
    const [showdata, setshowdata] = useState([]);
    const [dateidx, setdateidx] = useState(0);

    const user_id = localStorage.getItem('user_id');
    const access = localStorage.getItem('access');

    const root_img_path = ['/img/root_01.png', '/img/root_02.png', '/img/root_03.png'];

    const [markers, setMarkers] = useState([]);

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
        let marks = [];
        ROOT_API.museum_list('JWT ' + access, user_id)
            .then((res) => {
                setExhibitionList(res.data);
                console.log(res.data)
                setFloor(res.data[0]['floor_ko']);
                setimgSrc(baseURL + res.data[0]['drawing_image']);
                res.data[0]['inner_exhibition'].map(item => {
                    let temp = {
                        left: item['x_coordinate'],
                        top: item['y_coordinate']
                    }
                    if (temp.left !== null && temp.left !== "") {
                        marks = [...marks, temp];
                    }
                })
                setMarkers(marks)
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const changeMarker = idx => {
        let marks = [];
        ExhibitionList[idx]['inner_exhibition'].map(item => {
            let temp = {
                left: item['x_coordinate'],
                top: item['y_coordinate']
            }
            if (temp.left !== null && temp.left !== "") {
                marks = [...marks, temp];
            }
        })
        setMarkers(marks);
    };

    const markerStyle = {
        width: "25px", 
        height: "25px",
        backgroundColor: "brown",
        borderRadius: "50%",
        color: "white",
        textAlign: "center",
    }

    const CustomMarker = (props) => {
        return (
            <div className={"marker" + props.itemNumber} style={markerStyle}>{props.itemNumber + 1}</div>
        )
    };

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
        [14, 200],
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

    const [visitor, setvisitor] = useState(600);
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
        setvisitor(getRandom(600, 700));

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
        <body className={style.body}>
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
                                    {ExhibitionList.map((exhibition, idx) => {
                                        return (
                                            // <Dropdown.Item onClick={() => { setimgSrc(root_img_path[idx]); setFloor(exhibition['floor_ko']) }}>{exhibition['floor_ko']}</Dropdown.Item>
                                            <Dropdown.Item onClick={() => { setimgSrc(baseURL + exhibition['drawing_image']); setFloor(exhibition['floor_ko']); changeMarker(idx) }}>{exhibition['floor_ko']}</Dropdown.Item>
                                        )
                                    })}
                                </DropdownButton>
                            </div>
                           
                            {/* <div className={style.contbody}>
                                <div><img src={imgSrc} /></div>
                            </div> */}
                            <ImageMarker className={style.contbody} src={imgSrc} markers={markers} alt="전시관 도면" markerComponent={CustomMarker}/>
                            <Lineto from="marker0" to="marker1" delay={10} borderWidth={5} style={{position: "relative"}}/>
                            
                        </div>
                        <div className={style.cont02}>
                            <div className={`${style.conthead} ${style.clearfix}`}>
                                <h2 className={style.h2}>날짜 선택</h2>
                                <div>
                                    <Calendar onChange={changeDate} value={dateval} nextLabel=">" prevLabel="<" />
                                </div>
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
                                            {tabledata.map((table) => {
                                                return (
                                                    <tr>
                                                        <td>{table[0]}</td>
                                                        <td>{table[1]}</td>
                                                        <td>{table[2]}</td>
                                                        <td>{table[3]}</td>
                                                    </tr>
                                                )
                                            })}
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
                                    data={showdata}
                                    options={options}
                                // legendToggle
                                />
                                <div id="linechart_material"></div>
                            </div>

                        </div>
                        <div className={style.cont05}>
                            <div className={`${style.conthead} ${style.clearfix}`}>
                                <h2 className={style.tit}>Today</h2>
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
                    </div>
                </div>
            </div>
        </body >
    );
}

export default withRouter(Dashboard);