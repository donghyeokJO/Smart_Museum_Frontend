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

import style from './css/admin/InnerExhibitionModify.module.css';

function InnerExhibitionModify({ match }) {
    const [Name, setName] = useState('');
    // const [floor, setfloor] = useState('전체');

    const params = new URLSearchParams(window.location.search);

    const id = params.get("id");
    const date = params.get("date");

    const [item, setitem] = useState({})

    const user_id = localStorage.getItem('user_id');
    const access = localStorage.getItem('access');

    const [floor, setfloor] = useState('');
    const [beacon, setbeacon] = useState([]);
    const [recent, setRecent] = useState('');

    const [dateval, setdateval] = useState(date === "null" || date === null ? new Date() : new Date(date));
    const [datestr, setdatestr] = useState(date === "null" || date === null ? String(dateval.getFullYear()) + '-' + (dateval.getMonth() <= 10 ? '0' + String(dateval.getMonth() + 1) : '' + String(dateval.getMonth()) + 1 )+ '-' + String(dateval.getDate()) : date);
    
    const [showdata, setshowdata] = useState(new Array(25));
    const [dateidx, setdateidx] = useState(0);

    const [today, settoday] = useState([]);
    const [tabledata, settabledata] = useState([]);

    const [inName, setinName] = useState('');
    const [fileName, setFileName] = useState('');
    const [imgpath, setimgpath] = useState('');
    const [detail, setdetail] = useState('');
    const [imgFile, setimgFile] = useState(null);


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
                setinName(res.data['name']);
                setimgpath(baseURL + res.data['image']);
                setdetail(res.data['explanation']);
            })
    }, []);

    useEffect(() => {
        ROOT_API.inner_exhibition_get('JWT ' + access, id)
            .then((res) => {
                console.log(res.data);
                setitem(res.data);
                setfloor(res.data['exhibition']['floor_ko']);
                setRecent(res.data['beacon'].length >= 1 ? res.data['beacon'][0]['recent_reception'] : null);
                let temp = []
                res.data['beacon'].map(bea => {
                    setbeacon(temp.push(bea.uuid))
                })
                setbeacon(temp.join(','));
            })
    }, []);

    useEffect(() => {
        ROOT_API.today_exhibiton_inner('JWT ' + access, id, datestr)
            .then(res =>{
                console.log(res.data);
                settoday(res.data);
            })

        ROOT_API.time_inner('JWT ' + access, id, datestr)
            .then(res => {
                console.log(res.data);
                let temparr = new Array(25);
                temparr[0] = new Array('시간', '관람객수');
                Object.keys(res.data).forEach(function(k){
                    let temp = new Array(Number(k), res.data[k]);
                    temparr[Number(k) + 1] = temp;
                    setshowdata(temparr);
                })
            })
    }, []);

   
    const changeDate = (date) => {
        setdateval(date);
        let datestr = String(date.getFullYear()) + '-' + (date.getMonth() <= 10 ? '0' + String(date.getMonth() + 1) : '' + String(date.getMonth()) + 1 )+ '-' + String(date.getDate())
        setdatestr(datestr);

        ROOT_API.today_exhibiton_inner('JWT ' + access, id, datestr)
            .then(res =>{
                settoday(res.data);
            })

        ROOT_API.time_inner('JWT ' + access, id, datestr)
            .then(res => {
                console.log(res.data);
                let temparr = new Array(25);
                temparr[0] = new Array('시간', '관람객수');
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

    // const [imgpath, setimgpath] = useState(img);


    const onchangeFile = (e) => {
        const file = e.target.files[0];
        setFileName(file['name']);
        setimgFile(file);

        let rendor = new FileReader();
        rendor.readAsDataURL(file);

        rendor.onload = () => {
            setimgpath(rendor.result)
        }
    };

    const ModifyExhibition = () => {
        // console.log(detail);
        let formdata = new FormData();
        
        // console.log(imgFile)
        formdata.append('name', inName);
        formdata.append('order', item['order']);
        formdata.append('explanation', detail);
        if (imgFile !== null) {
            formdata.append('image', imgFile);   
        }

        ROOT_API.inner_exhibition_put('JWT ' + access, formdata, id)
            .then((res) => {
                if (res.status === 200) {
                    ROOT_API.beacon_del('JWT ' + access, id)
                        .then(res => {
                            ROOT_API.beacon_add('JWT ' + access, id, beacon)
                                .then(res => {
                                    alert('수정되었습니다.');
                                    window.location.href = '/inner-exhibition-detail?id=' + id;
                                })
                                .catch(err => {
                                    alert('이미 존재하는 비컨 uuid입니다.')
                                })
                        })
                }
            })
            .catch((err) => {
                console.log(err);
                // alert('모든 항목을 입력하여 주세요.')
            })
    }

    const colors = ['#5634AD', '#06C273', '#F0D101', '#FA372D', '#0C85FA'];
    const [chartfilter, setchartfilter] = useState('number');

    const NumberChart = () => {
        // console.log(showdata);
        return (
            <div className={style.todayAll}>
                <p>관람객</p>
                <div className={style.iconWrap}>
                    <i></i>
                    <span>{today['audience']}<em>명</em></span>
                </div>
            </div>
        )
    }

    const Agechart = () => {
        const data = [
            ["연령대", "방문객"],
            ["10대", today['age']['10']],
            ["20대", today['age']['20']],
            ["30대", today['age']['30']],
            ["40대", today['age']['40']],
            ["50대 이상", today['age']['50 >= ']]
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
            ["성별", "방문객"],
            ["남성", today['sex']['MALE']],
            ["여성", today['sex']['FEMALE']],
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


    return (
        <body className={style.body}>
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
                <div className={`${style.content} ${style.ManageInfo_detail} ${style.ManageInfo_edit}`}>
                    <div className={style.pageHead}>
                        <h1 className={`${style.h1} ${style.tit}`}><span className={`${style.firstbadge} ${style.badge}`}>{floor}</span>{item['name']}</h1>
                        <div className={style.Headgroup}>
                            <Button variant="secondary" onClick={() => window.location.href = '/inner-exhibition-detail?id=' + item['pk']}>취소</Button>
                            <Button variant="primary" onClick={() => ModifyExhibition()}>등록</Button>
                        </div>
                    </div>
                    <div className={`${style.rowgroup} ${style.clearfix}`}>
                        <div className={style.cont01}>
                            <div className={style.contbody}>
                                <div><img src={imgpath} /></div>
                            </div>
                            <h4 style={{ fontSize: "20px", fontWeight: "500", marginBottom: "5px" }}>도면업로드</h4>
                            {/* <h2 className={`${style.tit} ${style.h2}`}>도면업로드</h2> */}
                            <div className={style.filebox}>
                                <input value={fileName} className={style.uploadname} placeholder="업로드할 파일을 선택하세요." />
                                <label for="file" >파일찾기</label>
                                <input type="file" id="file" onChange={onchangeFile} />
                            </div>
                            <p class="caution">jpg, png, gif 확장자 파일만 업로드 가능합니다.</p>
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
                                <div className={style.contbody}>
                                    {chartfilter === "number" ? NumberChart() : chartfilter === "age" ? Agechart() : Sexchart()}
                                </div>
                            </div>
                        </div>
                        <div className={style.cont03}>
                            <div className={style.conthead}>
                                <h2 className={style.h2}>전시관 설명</h2>
                            </div>
                            <div className={style.contbody}>
                                <div className={style.input1}>
                                    <d1 className={style.inputgroup}>
                                        <dt>제목</dt>
                                        <dd>
                                            <input type="text" value={inName} onChange={(e) => setinName(e.target.value)} />
                                        </dd>
                                    </d1>
                                </div>
                                <div class={`${style.input1} ${style.textarea}`}>
                                    <dl class={style.inputgroup}>
                                        <dt>내용</dt>
                                        <dd>
                                            <textarea value={detail} onChange={(e) => setdetail(e.target.value)}>{item['detail']}

                                            </textarea>
                                        </dd>
                                    </dl>
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
                                    {/* <div>
                                        <h5>ID</h5>
                                        <p>{beacon}</p>
                                    </div> */}
                                    <d1 className={style.inputgroup}>
                                        <dt>ID</dt>
                                        <dd>
                                            <input type="text" value={beacon} onChange={(e) => setbeacon(e.target.value)} />
                                        </dd>
                                    </d1>
                                    <div>
                                        <h5>최근 수신</h5>
                                        <p>{recent !== null ? recent.substring(0,10) + ' ' + recent.substring(11,19) : ''}</p>
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

export default withRouter(InnerExhibitionModify);