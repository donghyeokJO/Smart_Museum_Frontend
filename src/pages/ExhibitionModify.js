import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import DashBoardHeader from "../components/DashBoardHeader";
import { ROOT_API } from "../utils/axios";
import Button from 'react-bootstrap/Button';
import { baseURL } from "../config";
import ImageMarker from 'react-image-marker';

import style from './css/admin/ExhibitionAdd.module.css'
import img from './css/admin/img/sub/emptyimg.jpg';

function ExhibitionModify() {
    const [Name, setName] = useState('');
    const [imgpath, setimgpath] = useState(img);
    const [fileName, setFileName] = useState('');
    const [imgFile, setimgFile] = useState(null);

    const [tmpName, settmpName] = useState('');
    const [tmpNum, settmpNum] = useState('');
    const [tmpX, settmpX] = useState('');
    const [tmpY, settmpY] = useState('');
    const [tmpPk, settmpPk] = useState('');

    const [inner, setinner] = useState([]);
    const [originalinner, setoriginalinner] = useState([]);

    const [floorko, setfloorko] = useState('');
    const [flooren, setflooren] = useState('');

    const [Exhibition, setExhibition] = useState([]);
    const [markers, setMarkers] = useState([]);

    const onchangeFile = async (e) => {
        const file = e.target.files[0];
        setFileName(file['name']);

        setimgFile(file);

        let rendor = new FileReader();
        rendor.readAsDataURL(file);

        rendor.onload = () => {
            setimgpath(rendor.result)
        }

        setMarkers([]);
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
            order: tmpNum,
            name: tmpName,
            x: tmpX,
            y: tmpY,
            pk: tmpPk,
        };

        setinner(inner.concat(temp));

        settmpName('');
        settmpNum('');
        settmpX('');
        settmpY('');
    }

    const access = 'JWT ' + localStorage.getItem('access');
    const user_id = localStorage.getItem('user_id');

    const params = new URLSearchParams(window.location.search);

    const pk = params.get("id");

    useEffect(() => {
        ROOT_API.inner_exhibition_by_exhibition(access, pk)
            .then((res) => {
                // console.log(res.data);
                setinner(res.data);
                setoriginalinner(res.data);
            })
    }, []);

    useEffect(() => {
        let marks = [];
        ROOT_API.exhibition_get(access, pk)
            .then((res) => {
                // console.log(res.data)
                setExhibition(res.data);
                setimgpath(baseURL + res.data['drawing_image']);
                setfloorko(res.data['floor_ko']);
                setflooren(res.data['floor_en']);
                res.data['inner_exhibition'].map(item => {
                    let temp = {
                        left: item['x_coordinate'],
                        top: item['y_coordinate']
                    }
                    if (temp.left !== null && temp.left !== "") {
                        marks = [...marks, temp];
                    }
                })
                setMarkers(marks);
            })
    }, []);

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

    const ModifyExhibition = () => {
        let formdata = new FormData();

        formdata.append('floor_ko', floorko);
        formdata.append('floor_en', flooren);

        console.log(imgFile);

        if (imgFile !== null) {
            console.log('s');
            formdata.append('drawing_image', imgFile);
        }

        ROOT_API.exhibition_put(access, formdata, pk)
            .then((res) => {
                if (res.status === 200) {
                    console.log(inner);
                    for (let i = 0; i < inner.length; i++) {
                        let inn = inner[i];
                        console.log(inn);
                        let formdata = new FormData();
                        
                        formdata.append('name', inn.name);
                        formdata.append('order', inn.order);
                        let x = inn.x === undefined ? inn.x_coordinate : inn.x;
                        let y = inn.y === undefined ? inn.y_coordinate : inn.y;
                        console.log(x);
                        console.log(y);
                        formdata.append('x_coordinate', String(x).substr(0, 10));
                        formdata.append('y_coordinate', String(y).substr(0, 10));

                        ROOT_API.inner_exhibition_put(access, formdata, inn.pk)
                            .then((res) => {
                                console.log('내부 전시관 ' + String(i) + ' 수정완료')
                            })
                        // ROOT_API.exhibition_add(inn.name, inn.order, access, pk, String(inn.x).substr(0, 10), String(inn.y).substr(0, 10))
                        //     .then((res) => {
                        //         console.log('내부 전시관 ' + String(i) + ' 추가완료');
                        //     })
                    }
                    window.location.href = '/exhibition';  
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const modifyinner = key => {
        let inn = inner.filter(inn => inn.order === key)[0];
        // console.log(inn)
        settmpName(inn.name);
        settmpNum(inn.order);
        settmpX(inn.x);
        settmpY(inn.y);
        settmpPk(inn.pk);

        setinner(inner.filter(inn => inn.order !== key));
    }

    return (
        <body className={style.body}>
            <DashBoardHeader exhibition={true} ex1={true}></DashBoardHeader>
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
                        <h1 className={`${style.tit} ${style.h1}`}>도면 수정</h1>
                        <div className={style.Headgroup}>
                            <Button variant="secondary" onClick={() => window.location.href = '/exhibition'}>취소</Button>
                            <Button variant="primary" onClick={() => ModifyExhibition()}>저장</Button>
                        </div>
                    </div>
                    <div className={`${style.rowgroup} ${style.clearfix}`}>
                        <div className={`${style.Form} ${style.Form1}`}>
                            {imgpath === img ?
                                <div className={style.thumb}><img src={imgpath}></img></div> :
                                <>
                                    <Button disabled={!markers.length > 0} onClick={() => setMarkers((prev) => prev.slice(0, -1))}>표시 제거</Button>
                                    <ImageMarker className={style.thumb} src={imgpath} markers={markers} onAddMarker={(marker) => { setMarkers([...markers, marker]); settmpX(marker.left); settmpY(marker.top); console.log(markers) }} />
                                </>
                            }
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
                        </div>
                        <div className={`${style.Form} ${style.Form2}`}>
                            <div>
                                <h3 className={style.h3}>내부 전시관 수정</h3>
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
                                <div className={style.input3}>
                                    <p className={style.title}>전시관 포인트 좌표<span>(도면 위를 클릭해 주세요.)</span></p>
                                    <dl className={style.inputgroup}>
                                        <dt>X축</dt>
                                        <dd>
                                            <input type="num" placeholder="예) 3, 147" value={tmpX} onChange={(e) => settmpX(e.target.value)} readOnly />
                                        </dd>
                                    </dl>
                                    <dl className={style.inputgroup}>
                                        <dt>Y축</dt>
                                        <dd>
                                            <input type="num" placeholder="예) 450, 320" value={tmpY} onChange={(e) => settmpY(e.target.value)} readOnly />
                                        </dd>
                                    </dl>
                                </div>
                                <div className={style.textcenter}>
                                    <Button variant="success" onClick={addinner}>저장하기</Button>
                                </div>
                            </div>
                            <div>
                                <h4 className={style.h4}>내부 전시관 등록현황</h4>
                                <ul className={style.ListExhibition}>
                                    {inner.sort((a, b) => a.order > b.order ? 1 : -1).map(inn => {
                                        return (
                                            <li className={style.edit} key={inn.order}>
                                                <div className={style.info}>
                                                    <span className={style.num}>{inn.order}</span>
                                                    <span className={style.txt}>{inn.name}</span>
                                                </div>
                                                <ul className={style.perform}>
                                                    <li><a href="#" title="수정하기" onClick={() => modifyinner(inn.order)}>수정<span className={style.editbtn}><i className="fas fa-pen" style={{ color: "#fff" }}></i></span></a></li>
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

export default withRouter(ExhibitionModify);