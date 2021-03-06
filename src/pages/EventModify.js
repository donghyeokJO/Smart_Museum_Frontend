import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import DashBoardHeader from "../components/DashBoardHeader";
import { ROOT_API } from "../utils/axios";
import Button from 'react-bootstrap/Button';
import DatePicker from "react-datepicker";
import { baseURL } from "../config";

import img from './css/admin/img/sub/emptyimg.jpg';
import style from './css/admin/EventModify.module.css';

import "react-datepicker/dist/react-datepicker.css";

function EventModify() {
    const [Name, setName] = useState('');
    const user_id = localStorage.getItem('user_id');
    const access = localStorage.getItem('access');

    const [event, setevent] = useState([]);

    const params = new URLSearchParams(window.location.search);

    const id = params.get("id");

    const [imgpath, setimgpath] = useState(img);
    const [fileName, setFileName] = useState('');
    const [imgFile, setimgFile] = useState(null);

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const [detail, setDetail] = useState('');
    const [eventName, setEventName] = useState('');

    useEffect(() => {
        ROOT_API.event_get_by_id('JWT ' + access, id)
            .then((res) => {
                console.log(res);
                setevent(res.data);
                setimgpath(baseURL + res.data['image']);
                setStartDate(new Date(res.data['start_dt']));
                setEndDate(new Date(res.data['end_dt']));
                setDetail(res.data['explanation']);
                setEventName(res.data['name']);
            })
    }, []);

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

    const modifyEvent = () => {
        if (eventName === "" || detail === "") {
            alert('?????? ????????? ??????????????????');
            return;
        }

        let formdata = new FormData();

        formdata.append('name', eventName);
        formdata.append('explanation', detail);
        formdata.append('start_dt', startDate.toISOString().slice(0, 10));
        formdata.append('end_dt', endDate.toISOString().slice(0, 10));
        formdata.append('inner_exhibition', '');

        if (imgFile !== null) {
            console.log('s');
            formdata.append('drawing_image', imgFile);
        }

        ROOT_API.event_modify('JWT ' + access, id, formdata)
            .then((res) => {
                console.log(res.data);
                window.location.href = '/event-detail?id=' + id;
            })
            .catch((err) => {
                console.log(err);
                alert('?????? ????????? ???????????? ?????????.')
            })
    }

    return (
        <body className={style.body}>
            <DashBoardHeader event={true}></DashBoardHeader>
            <div className={style.Dashcontainer}>
                <nav className={`${style.DashsubNav} ${style.clearfix}`}>
                    <div className={style.place}>
                        <i className="fas fa-gift"></i>?????????
                    </div>
                    <div className={style.user}>
                        <ul className={style.clearfix}>
                            <li><i className="fas fa-user"></i>{Name.Name}???</li>
                            <li><a href="#" title="??????????????????" onClick={function () { localStorage.clear(); window.location.href = '/' }} ><i className="fas fa-unlock"></i>????????????</a></li>
                        </ul>
                    </div>
                </nav>
                <div className={`${style.content} ${style.Event_write} ${style.WRITEFORM}`}>
                    <div className={style.pageHead}>
                        <h1 className={`${style.h1} ${style.tit}`}>??? ????????? ??????</h1>
                        <div className={style.Headgroup}>
                            <Button variant="secondary" onClick={() => window.location.href = '/event-detail?id=' + id}>??????</Button>
                            <Button variant="primary" onClick={() => modifyEvent()}>??????</Button>
                        </div>
                    </div>
                    <div className={`${style.rowgroup} ${style.clearfix}`}>
                        <div className={`${style.Form1} ${style.Form}`}>
                            <div className={style.thumb}>
                                <img src={imgpath}></img>
                            </div>
                            <div>
                                <h4 className={style.h4}>???????????????</h4>
                                <div className={style.filebox}>
                                    <input value={fileName} className={style.uploadname} placeholder="???????????? ????????? ???????????????." />
                                    <label for="file" >????????????</label>
                                    <input type="file" id="file" onChange={onchangeFile} />
                                </div>
                                <p className={style.caution}>jpg, png, gif ????????? ????????? ????????? ???????????????.</p>
                            </div>
                        </div>
                        <div className={`${style.Form2} ${style.Form}`}>
                            <div className={style.input1}>
                                <dl className={style.inputgroup}>
                                    <dt>????????? ??????</dt>
                                    <dd className="fix-width">
                                        <input type="text" value={eventName} onChange={(e) => setEventName(e.target.value)} placeholder="????????? ????????? ???????????????." />
                                    </dd>
                                </dl>
                            </div>
                            <div className={style.input1}>
                                <dl className={style.inputgroup}>
                                    <dt>????????? ??????</dt>
                                    <dd className={style.pickdate}>
                                        <div className={style.datewrap}>
                                            <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
                                            <span><i className="fas fa-calendar-alt"></i></span>
                                        </div>
                                        <p>-</p>
                                        <div className={style.datewrap}>
                                            <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} />
                                            <span><i className="fas fa-calendar-alt"></i></span>
                                        </div>
                                    </dd>
                                </dl>
                            </div>
                            <div className={`${style.input1} ${style.textarea}`}>
                                <dl className={style.inputgroup}>
                                    <dt>?????? ??????</dt>
                                    <dd>
                                        <textarea placeholder="????????? ?????? ????????? ???????????????." value={detail} onChange={(e) => setDetail(e.target.value)}></textarea>
                                    </dd>
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </body >
    )

}

export default withRouter(EventModify);