import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import DashBoardHeader from "../components/DashBoardHeader";
import { ROOT_API } from "../utils/axios";
import Button from 'react-bootstrap/Button';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';

import img from './css/admin/img/sub/emptyimg.jpg';
import style from './css/admin/EventMissionAdd.module.css';

function EventMissionAdd(){
    const [Name, setName] = useState('');
    const user_id = localStorage.getItem('user_id');
    const access = localStorage.getItem('access');

    const [imgpath, setimgpath] = useState(img);
    const [fileName, setFileName] = useState('');
    const [imgFile, setimgFile] = useState(null);

    const [eventName, setEventName] = useState('');
    const [innerList, setinnerList] = useState([]);
    const [currentInner, setcurrentInner] = useState('');

    const [ExhibitionList, setExhibitionList] = useState([]);
    const [Floor, setFloor] = useState('');

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
                setinnerList(res.data['results']);
                setcurrentInner(res.data['results'][0]['name']);
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
                            <Button variant="primary" onClick={() => console.log('')}>등록</Button>
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
                                        <input type="text" placeholder="이벤트 이름을 입력하세요."/>
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
                                                        <Dropdown.Item onClick={() => {setFloor(exhibition['floor_ko'])}}>{exhibition['floor_ko']}</Dropdown.Item>
                                                    )
                                                })}
                                            </DropdownButton>
                                        </div>
                                        <div className={`${style.select} ${style.select_exhi}`}>
                                            <DropdownButton id="dropdown-variants-Secondary" key="Secondary" variant="secondary" title={currentInner} style={{width: "calc(100%-125px)"}}>
                                                {innerList.map((item, idx) => {
                                                    return (
                                                        <Dropdown.Item onClick={() => {setcurrentInner(item['name'])}}>{item['name']}</Dropdown.Item>
                                                    )
                                                })}
                                            </DropdownButton>
                                        </div>
                                    </dd>
                                </d1>
                            </div>
                            <div className={`${style.downicon} ${style.textcenter}`}>
                                <span><i className="fas fa-angle-down"></i></span>
                            </div>
                            <div>
                                <ul className={style.ListExhibition}>
                                    <li className={style.edit}>
                                        <div className={style.info}>
                                            <span className={style.num}>1</span>
                                            <span className={style.txt}>고래와 바다이야기</span>
                                        </div>
                                        <ul className={style.perform}>
                                            <li>
                                                <a href="#" title="삭제하기">삭제<span className={style.delbtn}><i className="fas fa-times"></i></span></a>
                                            </li>
                                        </ul>
                                    </li>
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