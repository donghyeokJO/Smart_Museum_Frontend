import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import DashBoardHeader from "../components/DashBoardHeader";
import { ROOT_API } from "../utils/axios";
import Button from 'react-bootstrap/Button';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';

import img from './css/admin/img/sub/emptyimg.jpg';
import style from './css/admin/EventMissionAdd.module.css';

function EventMissionAdd() {
    const [Name, setName] = useState('');
    const user_id = localStorage.getItem('user_id');
    const access = localStorage.getItem('access');

    const [imgpath, setimgpath] = useState(img);
    const [fileName, setFileName] = useState('');
    const [imgFile, setimgFile] = useState(null);

    const [eventName, setEventName] = useState('');
    const [innerList, setinnerList] = useState([]);
    const [currentInner, setcurrentInner] = useState('');
    const [currentList, setCurrentList] = useState([]);
    const [currentpk, setCurrentPk] = useState('');

    const [ExhibitionList, setExhibitionList] = useState([]);
    const [Floor, setFloor] = useState('');

    const [addList, setAddList] = useState([]);
    const [addcnt, setaddcnt] = useState(1);

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
        ROOT_API.museum_list('JWT ' + access, user_id)
            .then((res) => {
                setExhibitionList(res.data);
                setFloor(res.data[0]['floor_ko'])
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    useEffect(() => {
        ROOT_API.inner_exhibition_user('JWT ' + access, user_id)
            .then((res) => {
                setinnerList(res.data);
                setcurrentInner(res.data[0]['name']);
                setCurrentPk(res.data[0]['pk']);
                setCurrentList(res.data.filter(item => item['exhibition']['floor_ko'] === res.data[0]['exhibition']['floor_ko']))
            })
            .catch((err) => {
                console.log(err);
            });
    }, [])

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

    const onchangeFloor = floor => {
        setCurrentList(innerList.filter(inner => inner['exhibition']['floor_ko'] === floor));
        setcurrentInner(innerList.filter(inner => inner['exhibition']['floor_ko'] === floor)[0]['name']);
        setCurrentPk(innerList.filter(inner => inner['exhibition']['floor_ko'] === floor)[0]['pk']);
    };

    const pkExists = pk => {
        return addList.some(function (e1) {
            return e1.pk === pk;
        });
    };

    const onDownBtnClicked = () => {
        if (pkExists(currentpk)) {
            alert('이미 존재하는 전시관입니다.')
            return;
        }

        let temp = {
            name: currentInner,
            pk: currentpk,
        };

        setAddList(addList.concat(temp));
        setaddcnt(addcnt + 1);
    };

    const removeaddlist = pk => {
        setAddList(addList.filter(inn => inn.pk !== pk));
    };

    const get_inner_exhibition = () => {
        var inner_exhibition = [];

        for (let i = 0; i < addList.length; i++){
            let inn = addList[i];
            inner_exhibition.push(i === 0 ? '?inner_exhibition=' + String(inn.pk) : '&inner_exhibition=' + String(inn.pk))
        }

        return inner_exhibition;
    }

    const addEvent = () => {
        if (eventName === "") {
            alert('모든 항목을 입력해주세요');
            return;
        }

        let formdata = new FormData();

        formdata.append('name', eventName);
        formdata.append('type', 2);
        formdata.append('image', imgFile);
        formdata.append('start_dt', new Date().toISOString().slice(0, 10));
        formdata.append('end_dt', new Date().toISOString().slice(0, 10));

        let inner_exhibition = get_inner_exhibition().join("");
        // console.log(inner_exhibition)

        ROOT_API.event_mission_add('JWT ' + access, formdata, inner_exhibition)
            .then((res) => {
                alert('등록이 완료되었습니다.')
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
                <div className={`${style.content} ${style.mEvent_write} ${style.WRITEFORM}`}>
                    <div className={style.pageHead}>
                        <h1 className={`${style.h1} ${style.tit}`}>미션 이벤트 등록</h1>
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
                                        <input type="text" value={eventName} onChange={(e) => setEventName(e.target.value)} placeholder="이벤트 이름을 입력하세요." />
                                    </dd>
                                </dl>
                            </div>
                            <h4 className={style.h4}>장소 등록</h4>
                            <div className={style.input1}>
                                <d1 className={style.inputgroup}>
                                    <dt>구분</dt>
                                    <dd className="clearfix">
                                        <div className={style.select}>
                                            <DropdownButton id="dropdown-variants-Secondary" key="Secondary" variant="secondary" title={Floor} >
                                                {ExhibitionList.map((exhibition, idx) => {
                                                    return (
                                                        <Dropdown.Item onClick={() => { setFloor(exhibition['floor_ko']); onchangeFloor(exhibition['floor_ko']) }}>{exhibition['floor_ko']}</Dropdown.Item>
                                                    )
                                                })}
                                            </DropdownButton>
                                        </div>
                                        <div className={`${style.select} ${style.select_exhi}`}>
                                            <DropdownButton id="dropdown-variants-Secondary" key="Secondary" variant="secondary" title={currentInner} style={{ width: "calc(100%-125px)" }}>
                                                {currentList.map((item, idx) => {
                                                    return (
                                                        <Dropdown.Item onClick={() => { setcurrentInner(item['name']); setCurrentPk(item['pk']) }}>{item['name']}</Dropdown.Item>
                                                    )
                                                })}
                                            </DropdownButton>
                                        </div>
                                    </dd>
                                </d1>
                            </div>
                            <div className={`${style.downicon} ${style.textcenter}`}>
                                <span onClick={() => onDownBtnClicked()}><i className="fas fa-angle-down"></i></span>
                            </div>
                            <div>
                                <ul className={style.ListExhibition}>
                                    {addList.map((item, idx) => {
                                        return (
                                            <li className={style.edit}>
                                                <div className={style.info}>
                                                    <span className={style.num}>{idx + 1}</span>
                                                    <span className={style.txt}>{item.name}</span>
                                                </div>
                                                <ul className={style.perform}>
                                                    <li>
                                                        <a href="#" title="삭제하기" onClick={() => removeaddlist(item.pk)}>삭제<span className={style.delbtn}><i className="fas fa-times"></i></span></a>
                                                    </li>
                                                </ul>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </body>
    )
}

export default withRouter(EventMissionAdd);