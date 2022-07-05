import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import DashBoardHeader from "../components/DashBoardHeader";
import { ROOT_API } from "../utils/axios";
import Button from 'react-bootstrap/Button';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';


import style from './css/admin/InnerExhibitionAdd.module.css';
import img from './css/admin/img/sub/emptyimg.jpg';

function InnerExhibitionAdd() {
    const [Name, setName] = useState('');
    const user_id = localStorage.getItem('user_id');
    const access = localStorage.getItem('access');

    const [floor, setfloor] = useState('');
    const [floorpk, setfloorpk] = useState('');

    const [ExhibitionList, setExhibitionList] = useState([]);

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
        // console.log('ss');
        ROOT_API.museum_list('JWT ' + access, user_id)
            .then((res) => {
                setExhibitionList(res.data);
                setfloor(res.data[0]['floor_ko']);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const [imgpath, setimgpath] = useState(img);
    const [fileName, setFileName] = useState('');
    const [imgFile, setimgFile] = useState();

    const [inName, setinName] = useState('');
    const [order, setorder] = useState('');
    const [beacon, setBeacon] = useState('');
    const [detail, setdetail] = useState('');

    const onchangeFile = (e) => {
        const file = e.target.files[0];
        setFileName(file['name']);
        setimgFile(file);

        let rendor = new FileReader();
        rendor.readAsDataURL(file);

        rendor.onload = () => {
            setimgpath(rendor.result)
        }
        // setimgpath(file);
        // setimgpath(file);
    };


    const addInnerExhibition = () => {
        if (inName === "" || order === "" || detail === "") {
            alert('모든 항목을 입력해주세요');
            return;
        }

        if (isNaN(order)) {
            alert('번호는 숫자여야 합니다.');
            return;
        }

        let formdata = new FormData();

        formdata.append('name', inName);
        formdata.append('order', order);
        formdata.append('explanation', detail);
        formdata.append('image', imgFile);

        // console.log(formdata);

        ROOT_API.inner_exhibition_add('JWT ' + access, formdata, floorpk)
            .then((res) => {
                if (res.status === 200) {
                    console.log('전시관 추가');
                    console.log('내부 전시관 추가 시작');
                    // console.log(res.data)
                    window.location.href = '/inner-exhibition';
                }
            })
            .catch((err) => {
                console.log(err);
                alert('모든 항목을 입력하여 주세요.')
            })
    }

    return (
        <body className={style.Dashboardclearfix}>
            <DashBoardHeader exhibition={true}></DashBoardHeader>
            <div className={style.Dashcontainer}>
                <nav className={`${style.DashsubNav} ${style.clearfix}`}>
                    <div className={style.place}>
                        <i className="far fa-edit"></i>전시관 관리
                        <span><i className="fas fa-angle-right"></i>전시관 정보 관리</span>
                    </div>
                    {/* <div className={style.place}><i className="fas fa-home"></i>대시보드</div> */}
                    <div className={style.user}>
                        <ul className={style.clearfix}>
                            <li><i className="fas fa-user"></i>{Name.Name}님</li>
                            <li><a href="#" title="로그아웃하기" onClick={function () { localStorage.clear(); window.location.href = '/' }} ><i className="fas fa-unlock"></i>로그아웃</a></li>
                        </ul>
                    </div>
                </nav>
                <div className={`${style.content} ${style.ManageInfo_write} ${style.WRITEFORM}`}>
                    <div className={style.pageHead}>
                        <h1 className={`${style.tit} ${style.h1}`}>새 전시관 등록</h1>
                        <div className={style.Headgroup}>
                            <Button variant="secondary" onClick={() => window.location.href = '/inner-exhibition'}>취소</Button>
                            <Button variant="primary" onClick={() => addInnerExhibition()}>등록</Button>
                        </div>
                    </div>
                    <div className={`${style.rowgroup} ${style.clearfix}`}>
                        <div className={`${style.Form} ${style.Form1}`}>
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
                        <div className={`${style.Form} ${style.Form2}`}>
                            <div className={style.input1}>
                                <dl className={style.inputgroup}>
                                    <dt>구분</dt>
                                    <dd className="fix-width">
                                        {/* <div className="select">
                                            <a href="#">선택</a>
                                            <ul className="select-btn">
                                                <li>1층</li>
                                                <li>2층</li>
                                                <li>지하1층</li>
                                            </ul>
                                        </div> */}
                                        <DropdownButton id="dropdown-variants-Secondary" key="Secondary" variant="secondary" title={floor}>
                                            {ExhibitionList.map((exhibition) => {
                                                // console.log(exhibition);
                                                return (
                                                    <Dropdown.Item onClick={() => { setfloor(exhibition['floor_ko']); setfloorpk(exhibition['pk']) }}>{exhibition['floor_ko']}</Dropdown.Item>
                                                )
                                            })}
                                        </DropdownButton>
                                    </dd>
                                </dl>
                            </div>
                            <div className={style.input1}>
                                <dl className={style.inputgroup}>
                                    <dt>전시관 이름</dt>
                                    <dd className="fix-width">
                                        <input type="text" placeholder="전시관 이름을 입력하세요." value={inName} onChange={(e) => setinName(e.target.value)} />
                                    </dd>
                                </dl>
                            </div>
                            <div className={style.input1}>
                                <dl className={style.inputgroup}>
                                    <dt>번호/순서</dt>
                                    <dd className="fix-width">
                                        <input type="text" placeholder="번호/순서를 입력하세요." value={order} onChange={(e) => setorder(e.target.value)} />
                                    </dd>
                                </dl>
                            </div>
                            <div className={style.input1}>
                                <dl className={style.inputgroup}>
                                    <dt>비컨 ID</dt>
                                    <dd className="fix-width">
                                        <input type="text" placeholder="비컨ID를 입력하세요." value={beacon} onChange={(e) => setBeacon(e.target.value)} />
                                    </dd>
                                </dl>
                            </div>
                            <div className={`${style.input1} ${style.textarea}`}>
                                <dl className={style.inputgroup}>
                                    <dt>상세 설명</dt>
                                    <dd>
                                        <textarea placeholder="전시관 상세 설명을 입력하세요." value={detail} onChange={(e) => setdetail(e.target.value)}></textarea>
                                    </dd>
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </body >
    );
}

export default withRouter(InnerExhibitionAdd);