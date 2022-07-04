import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import DashBoardHeader from "../components/DashBoardHeader";
import { ROOT_API } from "../utils/axios";
import Button from 'react-bootstrap/Button'

import style from './css/admin/ExhibitionAdd.module.css'
import img from './css/admin/img/sub/emptyimg.jpg'
import { render } from "@testing-library/react";

function ExhibitionAdd() {
    const [Name, setName] = useState('');
    const [imgpath, setimgpath] = useState(img);
    const [fileName, setFileName] = useState('');
    const [imgFile, setimgFile] = useState();

    const [tmpName, settmpName] = useState('');
    const [tmpNum, settmpNum] = useState('');
    // const [tmpX, settmpX] = useState('');
    // const [tmpY, settmpY] = useState('');

    const [inner, setinner] = useState([]);

    const [floorko, setfloorko] = useState('');
    const [flooren, setflooren] = useState('');

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

    const addinner = () => {

        if (tmpNum === "" || tmpName === "") {
            alert('모든 항목을 입력해주세요');
            return;
        }

        if (isNaN(tmpNum)) {
            alert('번호는 숫자여야 합니다.');
            return;
        }

        let temp = {
            id: tmpNum,
            name: tmpName,
            // x: tmpX,
            // y: tmpY
        };

        setinner(inner.concat(temp));

        settmpName('');
        settmpNum('');
        // settmpX('');
        // settmpY('');

        // console.log(temp);
    }

    const removeinner = key => {
        setinner(inner.filter(inn => inn.id !== key));
    }

    const modifyinner = key => {
        let inn = inner.filter(inn => inn.id === key)[0];
        // console.log(inn)
        settmpName(inn.name);
        settmpNum(inn.id);
        // settmpX(inn.x);
        // settmpY(inn.y);

        setinner(inner.filter(inn => inn.id !== key));
    }


    const addExhibition = () => {
        console.log('sss');
        let access = 'JWT ' + localStorage.getItem('access');
        let user_id = localStorage.getItem('user_id');

        let formdata = new FormData();

        formdata.append('floor_ko', floorko);
        formdata.append('floor_en', flooren);
        formdata.append('drawing_image', imgFile);

        // console.log(formdata);

        ROOT_API.museum_add(user_id, formdata, access)
            .then((res) => {
                if (res.status === 200) {
                    console.log('전시관 추가');
                    console.log('내부 전시관 추가 시작');
                    // console.log(res.data)
                    let museum_id = res.data['pk']
                    for (let i = 0; i < inner.length; i++) {
                        let inn = inner[i];
                        ROOT_API.exhibition_add(inn.name, inn.id, access, museum_id)
                            .then((res) => {
                                console.log('내부 전시관 ' + String(i) + ' 추가완료');
                            })
                    }
                    alert('등록이 완료되었습니다.');
                    window.location.href = '/exhibition';
                }
            })
            .catch((err) => {
                console.log(err);
                alert('모든 항목을 입력하여 주세요.')
            })
    }


    useEffect(() => {
        let user_id = localStorage.getItem('user_id');
        let access = localStorage.getItem('access');

        ROOT_API.user_info(user_id, 'JWT ' + access)
            .then((res) => {
                setName({ Name: res.data['username'] });
            })
            .catch((err) => {
                console.log(err)
            })
    }, []);


    return (
        <body className={style.Dashboardclearfix}>
            <DashBoardHeader exhibition={true}></DashBoardHeader>
            <div className={style.Dashcontainer}>
                <nav className={`${style.DashsubNav} ${style.clearfix}`}>
                    <div className={style.place}>
                        <i className="far fa-edit"></i>전시관 관리
                        <span><i className="fas fa-angle-right"></i>전시관 도면 관리</span>
                    </div>
                    {/* <div className={style.place}><i className="fas fa-home"></i>대시보드</div> */}
                    <div className={style.user}>
                        <ul className={style.clearfix}>
                            <li><i className="fas fa-user"></i>{Name.Name}님</li>
                            <li><a href="#" title="로그아웃하기" onClick={function () { localStorage.clear(); window.location.href = '/' }} ><i className="fas fa-unlock"></i>로그아웃</a></li>
                        </ul>
                    </div>
                </nav>
                <div className={`${style.content} ${style.ManageDrawing_write} ${style.WRITEFORM}`}>
                    <div className={style.pageHead}>
                        <h1 className={`${style.tit} ${style.h1}`}>새 도면 등록</h1>
                        <div className={style.Headgroup}>
                            <Button variant="secondary">취소</Button>
                            <Button variant="primary" onClick={() => addExhibition()}>등록</Button>
                            {/* <button className="btn btn-gray" onclick="location.href='ManageDrawing.html'">취소</button>
                            <button className="btn btn-blue" onclick="location.href='ManageDrawing.html'">등록</button> */}
                        </div>
                    </div>
                    <div className={`${style.rowgroup} ${style.clearfix}`}>
                        <div className={`${style.Form} ${style.Form1}`}>
                            {/* <div className={`${style.thumb} ${style.emptyimg}`}> */}
                            <div className={style.thumb}>
                                <img src={imgpath}></img>
                            </div>
                            <div>
                                <h4 className={style.h4}>도면업로드</h4>
                                <div className={style.filebox}>
                                    <input value={fileName} className={style.uploadname} placeholder="업로드할 파일을 선택하세요." />
                                    <label for="file" >파일찾기</label>
                                    <input type="file" id="file" onChange={onchangeFile} />
                                </div>
                                <p className={style.caution}>jpg, png, gif 확장자 파일만 업로드 가능합니다.</p>
                            </div>
                            <div>
                                <h3 className={style.h3}>전시관 정보 입력</h3>
                                <dl className={style.inputgroup}>
                                    <dt>구분</dt>
                                    <dd className="fix-width">
                                        <input type="text" placeholder="층 수/구분 관을 입력하세요." value={floorko} onChange={(e) => setfloorko(e.target.value)} />
                                    </dd>
                                </dl>
                                <dl className={style.inputgroup}>
                                    <dt>영문 구분</dt>
                                    <dd className="fix-width">
                                        <input type="text" placeholder="영문 층 수/구분 관을 입력하세요." value={flooren} onChange={(e) => setflooren(e.target.value)} />
                                    </dd>
                                </dl>
                            </div>
                            {/* <div className={style.textright}>
                                <Button variant="primary">반영</Button>
                            </div> */}
                        </div>
                        <div className={`${style.Form} ${style.Form2}`}>
                            <div>
                                <h3 className={style.h3}>내부 전시관 등록</h3>
                                <div className={style.input2}>
                                    <dl className={style.inputgroup}>
                                        <dt>전시관 이름</dt>
                                        <dd>
                                            <input type="text" placeholder="전시관 이름을 입력하세요." value={tmpName} onChange={(e) => settmpName(e.target.value)} />
                                        </dd>
                                    </dl>
                                    <dl className={style.inputgroup}>
                                        <dt>번호/순서</dt>
                                        <dd>
                                            <input type="num" placeholder="번호/순서를 입력하세요." value={tmpNum} onChange={(e) => settmpNum(e.target.value)} />
                                        </dd>
                                    </dl>
                                </div>
                                {/* <div className={style.input3}>
                                    <p className={style.title}>전시관 포인트 좌표<span>(도면 위를 클릭해 주세요.)</span></p>
                                    <dl className={style.inputgroup}>
                                        <dt>X축</dt>
                                        <dd>
                                            <input type="num" placeholder="예) 3, 147" value={tmpX} onChange={(e) => settmpX(e.target.value)} />
                                        </dd>
                                    </dl>
                                    <dl className={style.inputgroup}>
                                        <dt>Y축</dt>
                                        <dd>
                                            <input type="num" placeholder="예) 450, 320" value={tmpY} onChange={(e) => settmpY(e.target.value)} />
                                        </dd>
                                    </dl>
                                </div> */}
                                <div className={style.textcenter}>
                                    <Button variant="success" onClick={addinner}>등록하기</Button>
                                    {/* <button className="btn btn-green">등록하기</button> */}
                                </div>
                            </div>
                            <div>
                                <h4 className={style.h4}>내부 전시관 등록현황</h4>
                                <ul className={style.ListExhibition}>
                                    {inner.sort((a, b) => a.id > b.id ? 1 : -1).map(inn => {
                                        return (
                                            <li className={style.edit} key={inn.id}>
                                                <div className={style.info}>
                                                    <span className={style.num}>{inn.id}</span>
                                                    <span className={style.txt}>{inn.name}</span>
                                                </div>
                                                <ul className={style.perform}>
                                                    <li><a href="#" title="수정하기" onClick={() => modifyinner(inn.id)}>수정<span className={style.editbtn}><i className="fas fa-pen" style={{ color: "#fff" }}></i></span></a></li>
                                                    <li><a href="#" title="삭제하기" onClick={() => removeinner(inn.id)}>삭제<span className={style.delbtn}><i className="fas fa-times"></i></span></a></li>
                                                </ul>
                                            </li>
                                        )
                                    })}
                                    {/* <li className={style.edit}>
                                        <div className={style.info}>
                                            <span className={style.num}>1</span>
                                            <span className={style.txt}>고래와 바다이야기</span>
                                        </div>
                                        <ul className={style.perform}>
                                            <li><a href="#" title="수정하기">수정<span className="edit-btn"><i className="fas fa-pen"></i></span></a></li>
                                            <li><a href="#" title="삭제하기">삭제<span className="del-btn"><i className="fas fa-times"></i></span></a></li>
                                        </ul>
                                    </li> */}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </body>
    )
}

export default withRouter(ExhibitionAdd);