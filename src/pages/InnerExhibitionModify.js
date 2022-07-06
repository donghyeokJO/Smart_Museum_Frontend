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

    // console.log(id);

    const [item, setitem] = useState({})

    const user_id = localStorage.getItem('user_id');
    const access = localStorage.getItem('access');

    const [floor, setfloor] = useState('');
    const [inName, setinName] = useState('');
    const [imgpath, setimgpath] = useState('');
    const [fileName, setFileName] = useState();
    const [imgFile, setimgFile] = useState(null);


    const [beacon, setBeacon] = useState('');
    const [detail, setdetail] = useState('');


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

    const [dateval, setdateval] = useState(new Date());
    const [datestr, setdatestr] = useState(String(dateval.getFullYear()) + '-' + String(dateval.getMonth() + 1) + '-' + String(dateval.getDate()));

    const changeDate = (date) => {
        setdateval(date);
        setdatestr(String(dateval.getFullYear()) + '-' + String(dateval.getMonth() + 1) + '-' + String(dateval.getDate()))
    };

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

        formdata.append('name', inName);
        formdata.append('order', item['order']);
        formdata.append('explanation', detail);
        if (imgFile !== null) {
            formdata.append('image', imgFile);
        }

        ROOT_API.inner_exhibition_put('JWT ' + access, formdata, id)
            .then((res) => {
                if (res.status === 200) {
                    // console.log(res.data)
                    window.location.href = '/inner-exhibition-detail?id=' + id;
                }
            })
            .catch((err) => {
                console.log(err);
                // alert('모든 항목을 입력하여 주세요.')
            })
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
                                    data={data}
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

export default withRouter(InnerExhibitionModify);