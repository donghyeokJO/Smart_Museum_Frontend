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
    const [floorpk, setFloorpk] = useState('');

    const params = new URLSearchParams(window.location.search);
    const date = params.get("date");

    const [dateval, setdateval] = useState(date === "null" || date === null ? new Date() : new Date(date));
    // const [datestr, setdatestr] = useState(dateval.format('YYYY-MM-DD'));
    const [datestr, setdatestr] = useState(date === "null" || date === null ? String(dateval.getFullYear()) + '-' + (dateval.getMonth() <= 10 ? '0' + String(dateval.getMonth() + 1) : '' + String(dateval.getMonth()) + 1 )+ '-' + String(dateval.getDate()) : date);
    // console.log(dateval.format('YYYY-MM-DD'));

    const [ExhibitionList, setExhibitionList] = useState([]);
    const [showdata, setshowdata] = useState(new Array(25));
    const [dateidx, setdateidx] = useState(0);

    const user_id = localStorage.getItem('user_id');
    const access = localStorage.getItem('access');

    const [markers, setMarkers] = useState([]);
    const [today, settoday] = useState([]);
    const [tabledata, settabledata] = useState([]);

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
                setFloorpk(res.data[0]['pk']);
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
                setMarkers(marks);
                ROOT_API.today_exhibiton('JWT ' + access, res.data[0]['pk'], datestr)
                .then(res =>{
                    console.log(res.data);
                    settoday(res.data);
                })

                ROOT_API.popularity('JWT ' + access, res.data[0]['pk'])
                .then(res => {
                    console.log(res.data);
                    settabledata(res.data);
                })

                ROOT_API.time('JWT ' + access, res.data[0]['pk'], datestr)
                    .then(res => {
                        console.log(res.data);
                        let temparr = new Array(25);
                        temparr[0] = new Array('??????', '????????????');
                        Object.keys(res.data).forEach(function(k){
                            let temp = new Array(Number(k), res.data[k]);
                            temparr[Number(k) + 1] = temp;
                            setshowdata(temparr);
                        })
                })

                ROOT_API.footprint('JWT ' + access, res.data[0]['pk'], datestr)
                    .then(res => {
                        console.log(res.data);
                    })
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    useEffect(() => {
        function handleResize() {
            console.log('resized to: ', window.innerWidth, 'x', window.innerHeight)
            window.location.href =  '/dashboard?date=' + datestr;
        }
        window.addEventListener('resize', handleResize)
    });

    

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

    const changeFloorpk = pk => {
        ROOT_API.today_exhibiton('JWT ' + access, pk, datestr)
        .then(res =>{
            console.log(res.data);
            settoday(res.data);
        })

        ROOT_API.popularity('JWT ' + access, pk)
        .then(res => {
            console.log(res.data);
            settabledata(res.data);
        })
        
        ROOT_API.time('JWT ' + access, pk, datestr)
            .then(res => {
                console.log(res.data);
                let temparr = new Array(25);
                temparr[0] = new Array('??????', '????????????');
                Object.keys(res.data).forEach(function(k){
                    let temp = new Array(Number(k), res.data[k]);
                    temparr[Number(k) + 1] = temp;
                    setshowdata(temparr);
                })
            })
    }

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

    const colors = ['#5634AD', '#06C273', '#F0D101', '#FA372D', '#0C85FA'];
    const [chartfilter, setchartfilter] = useState('number');

    const NumberChart = () => {
        // console.log(showdata);
        return (
            <div className={style.todayAll}>
                <p>?????????</p>
                <div className={style.iconWrap}>
                    <i></i>
                    <span>{today['audience']}<em>???</em></span>
                </div>
            </div>
        )
    }

    const Agechart = () => {
        const data = [
            ["?????????", "?????????"],
            ["10???", today['age']['10']],
            ["20???", today['age']['20']],
            ["30???", today['age']['30']],
            ["40???", today['age']['40']],
            ["50??? ??????", today['age']['50 >= ']]
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
        const data = [
            ["??????", "?????????"],
            ["??????", today['sex']['MALE']],
            ["??????", today['sex']['FEMALE']],
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
        let datestr = String(date.getFullYear()) + '-' + (date.getMonth() <= 10 ? '0' + String(date.getMonth() + 1) : '' + String(date.getMonth()) + 1 )+ '-' + String(date.getDate())
        setdatestr(datestr);

        ROOT_API.today_exhibiton('JWT ' + access, floorpk, datestr)
            .then(res =>{
                settoday(res.data);
            })

        ROOT_API.time('JWT ' + access, floorpk, datestr)
            .then(res => {
                console.log(res.data);
                let temparr = new Array(25);
                temparr[0] = new Array('??????', '????????????');
                Object.keys(res.data).forEach(function(k){
                    let temp = new Array(Number(k), res.data[k]);
                    temparr[Number(k) + 1] = temp;
                    setshowdata(temparr);
                })
            })
    }

    const options = {
        width: '100%',
        height: 320,
        hAxis: {
            title: "?????? (???)",
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

    const age_group = {
        '10': '10???',
        '20': '20???',
        '30': '30???',
        '40': '40???',
        '50': '50???',
        '50 >= ' : '50??? ??????',
    }

    return (
        <body className={style.body}>
            <DashBoardHeader main={true}></DashBoardHeader>
            <div className={style.Dashcontainer}>
                <nav className={`${style.DashsubNav} ${style.clearfix}`}>
                    <div className={style.place}><i className="fas fa-home"></i>????????????</div>
                    <div className={style.user}>
                        <ul className={style.clearfix}>
                            <li><i className="fas fa-user"></i>{Name.Name}???</li>
                            <li><a href="#" title="??????????????????" onClick={function () { localStorage.clear(); window.location.href = '/' }} ><i className="fas fa-unlock"></i>????????????</a></li>
                        </ul>
                    </div>
                </nav>
                <div className={`${style.content} ${style.dashboard}`}>
                    <div className={`${style.rowgroup} ${style.clearfix}`}>
                        <div className={style.cont01}>
                            <div className={`${style.conthead} ${style.clearfix}`}>
                                <h2 className={`${style.h2} ${style.tit}`}>????????? ?????? ??????</h2>
                                <DropdownButton id="dropdown-variants-Secondary" key="Secondary" variant="secondary" title={Floor} style={{ float: 'right' }}>
                                    {ExhibitionList.map((exhibition, idx) => {
                                        return (
                                            // <Dropdown.Item onClick={() => { setimgSrc(root_img_path[idx]); setFloor(exhibition['floor_ko']) }}>{exhibition['floor_ko']}</Dropdown.Item>
                                            <Dropdown.Item onClick={() => { setimgSrc(baseURL + exhibition['drawing_image']); setFloor(exhibition['floor_ko']); changeMarker(idx); setFloorpk(exhibition['pk']); changeFloorpk(exhibition['pk']) }}>{exhibition['floor_ko']}</Dropdown.Item>
                                        )
                                    })}
                                </DropdownButton>
                            </div>
                           
                            <ImageMarker className={style.contbody} src={imgSrc} markers={markers} alt="????????? ??????" markerComponent={CustomMarker}/>
                            {/* <Lineto from="marker0" to="marker1" delay={10} borderWidth={5} style={{position: "relative"}}/> */}
                            
                        </div>
                        <div className={style.cont02}>
                            <div className={`${style.conthead} ${style.clearfix}`}>
                                <h2 className={style.h2}>?????? ??????</h2>
                                <div>
                                    <Calendar onChange={changeDate} value={dateval} nextLabel=">" prevLabel="<" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={`${style.rowgroup} ${style.clearfix}`}>
                        <div className={style.cont03}>
                            <div className={style.conthead}>
                                <h2>???????????????</h2>
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
                                                <th>??????</th>
                                                <th>?????????</th>
                                                <th>??????</th>
                                                <th>???????????????</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {tabledata.slice(0,5).map((table) => {
                                                return (
                                                    <tr>
                                                        <td>{table['rank']}</td>
                                                        <td>{table['name']}</td>
                                                        <td>{age_group[table['age_group']]}</td>
                                                        <td>{table['count']}</td>
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
                                <h2>????????????</h2>
                            </div>

                            <div className={style.contbody}>
                                <Chart
                                    chartType="LineChart"
                                    data={showdata}
                                    options={options}
                                />
                                <div id="linechart_material"></div>
                            </div>

                        </div>
                        <div className={style.cont05}>
                            <div className={`${style.conthead} ${style.clearfix}`}>
                                <h2 className={style.tit}>Today</h2>
                                <DropdownButton id="dropdown-variants-Secondary" key="Secondary" variant="secondary" title="?????? ??????" style={{ float: 'right' }}>
                                    <Dropdown.Item onClick={() => setchartfilter('number')}>??????</Dropdown.Item>
                                    <Dropdown.Item onClick={() => setchartfilter('age')}>?????????</Dropdown.Item>
                                    <Dropdown.Item onClick={() => setchartfilter('sex')}>??????</Dropdown.Item>
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