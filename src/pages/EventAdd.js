import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import DashBoardHeader from "../components/DashBoardHeader";
import { ROOT_API } from "../utils/axios";
import Button from 'react-bootstrap/Button';
import DatePicker from "react-datepicker";

import img from './css/admin/img/sub/emptyimg.jpg';
import style from './css/admin/EventAdd.module.css';

import "react-datepicker/dist/react-datepicker.css";

function EventAdd(){
    const [Name, setName] = useState('');
    const user_id = localStorage.getItem('user_id');
    const access = localStorage.getItem('access');

    const [imgpath, setimgpath] = useState(img);
    const [fileName, setFileName] = useState('');
    const [imgFile, setimgFile] = useState(null);

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const [detail, setDetail] = useState('');
    const [eventName, setEventName] = useState('');

    useEffect(() => {
        ROOT_API.user_info(user_id, 'JWT ' + access)
            .then((res) => {
                setName({ Name: res.data['username'] });
            })
            .catch((err) => {
                console.log(err)
            })
    }, []);

    const onchangeFile = async (e) => {
        const file = e.target.files[0];
        setFileName(file['name']);

        setimgFile(file);

        let rendor = new FileReader();
        rendor.readAsDataURL(file);

        rendor.onload = () => {
            setimgpath(rendor.result)
        }
    };

    const addEvent = () => {
        if (eventName === "" || detail === ""){
            alert('모든 항목을 입력해주세요');
            return;
        }

        let formdata = new FormData();

        formdata.append('name', eventName);
        formdata.append('type', 1);
        formdata.append('explanation', detail);
        formdata.append('start_dt', startDate.toISOString().slice(0, 10));
        formdata.append('end_dt', endDate.toISOString().slice(0,10));
        formdata.append('image', imgFile);

        console.log(startDate);
        console.log(endDate);

        // console.log(formdata);
        ROOT_API.event_add('JWT ' + access, formdata)
            .then((res) => {
                console.log(res.data);
                window.location.href = '/event';
            })
            .catch((err) => {
                console.log(err);
                alert('모든 항목을 입력하여 주세요.')
            })
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
                <div className={`${style.content} ${style.Event_write} ${style.WRITEFORM}`}>
                    <div className={style.pageHead}>
                        <h1 className={`${style.h1} ${style.tit}`}>새 이벤트 등록</h1>
                        <div className={style.Headgroup}>
                            <Button variant="secondary" onClick={() => window.location.href = '/event'}>취소</Button>
                            <Button variant="primary" onClick={() => addEvent()}>등록</Button>
                        </div>
                    </div>
                    <div className={`${style.rowgroup} ${style.clearfix}`}>
                        <div className={`${style.Form1} ${style.Form}`}>
                            <div className={style.thumb}>
                                <img src={imgpath}></img>
                            </div>
                            <div>
                                <h4 className={style.h4}>대표이미지</h4>
                                <div className={style.filebox}>
                                    <input value={fileName} className={style.uploadname} placeholder="업로드할 파일을 선택하세요." />
                                    <label for="file" >파일찾기</label>
                                    <input type="file" id="file" onChange={onchangeFile} />
                                </div>
                                <p className={style.caution}>jpg, png, gif 확장자 파일만 업로드 가능합니다.</p>
                            </div>
                        </div>
                        <div className={`${style.Form2} ${style.Form}`}>
                            <div className={style.input1}>
                                <dl className={style.inputgroup}>
                                    <dt>이벤트 이름</dt>
                                    <dd className="fix-width">
                                        <input type="text" value={eventName} onChange={(e) => setEventName(e.target.value)} placeholder="이벤트 이름을 입력하세요."/>
                                    </dd>
                                </dl>
                            </div>
                            <div className={style.input1}>
                                <dl className={style.inputgroup}>
                                    <dt>이벤트 기간</dt>
                                    <dd className={style.pickdate}>
                                        <div className={style.datewrap}>
                                            <DatePicker selected={startDate} onChange={(date) => setStartDate(date)}/>
                                            <span><i className="fas fa-calendar-alt"></i></span>
                                        </div>
                                        <p>-</p>
                                        <div className={style.datewrap}>
                                            <DatePicker selected={endDate} onChange={(date) => setEndDate(date)}/>
                                            <span><i className="fas fa-calendar-alt"></i></span>
                                        </div>
                                    </dd>
                                </dl>
                            </div>
                            <div className={`${style.input1} ${style.textarea}`}>
                                <dl className={style.inputgroup}>
                                    <dt>상세 설명</dt>
                                    <dd>
                                        <textarea placeholder="이벤트 상세 설명을 입력하세요." value={detail} onChange={(e) => setDetail(e.target.value)}></textarea>
                                    </dd>
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </body>
    )

}

export default withRouter(EventAdd);