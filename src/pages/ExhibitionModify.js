import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import DashBoardHeader from "../components/DashBoardHeader";
import { ROOT_API } from "../utils/axios";
import Button from 'react-bootstrap/Button';
import { baseURL } from "../config";

import style from './css/admin/ExhibitionAdd.module.css'
import img from './css/admin/img/sub/emptyimg.jpg';

function ExhibitionModify() {
    const [Name, setName] = useState('');
    const [imgpath, setimgpath] = useState(img);
    const [fileName, setFileName] = useState('');
    const [imgFile, setimgFile] = useState(null);

    const [inner, setinner] = useState([]);

    const [floorko, setfloorko] = useState('');
    const [flooren, setflooren] = useState('');

    const [Exhibition, setExhibition] = useState([]);

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

    const access = 'JWT ' + localStorage.getItem('access');
    const user_id = localStorage.getItem('user_id');

    const params = new URLSearchParams(window.location.search);

    const pk = params.get("id");

    useEffect(() => {
        ROOT_API.inner_exhibition_by_exhibition(access, pk)
            .then((res) => {
                // console.log(res.data);
                setinner(res.data);
            })
    }, []);

    useEffect(() => {
        ROOT_API.exhibition_get(access, pk)
            .then((res) => {
                // console.log(res.data)
                setExhibition(res.data);
                setimgpath(baseURL + res.data['drawing_image']);
                setfloorko(res.data['floor_ko']);
                setflooren(res.data['floor_en']);
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
                    window.location.href = '/exhibition';
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }

    return (
        <body className={style.body}>
            <DashBoardHeader exhibition={true} ex1={true}></DashBoardHeader>
            <div className={style.Dashcontainer}>
                <nav className={`${style.DashsubNav} ${style.clearfix}`}>
                    <div className={style.place}>
                        <i className="far fa-edit"></i>????????? ??????
                        <span><i className="fas fa-angle-right"></i>????????? ?????? ??????</span>
                    </div>
                    {/* <div className={style.place}><i className="fas fa-home"></i>????????????</div> */}
                    <div className={style.user}>
                        <ul className={style.clearfix}>
                            <li><i className="fas fa-user"></i>{Name.Name}???</li>
                            <li><a href="#" title="??????????????????" onClick={function () { localStorage.clear(); window.location.href = '/' }} ><i className="fas fa-unlock"></i>????????????</a></li>
                        </ul>
                    </div>
                </nav>
                <div className={`${style.content} ${style.ManageDrawing_write} ${style.WRITEFORM}`}>
                    <div className={style.pageHead}>
                        <h1 className={`${style.tit} ${style.h1}`}>?????? ??????</h1>
                        <div className={style.Headgroup}>
                            <Button variant="secondary" onClick={() => window.location.href = '/exhibition'}>??????</Button>
                            <Button variant="primary" onClick={() => ModifyExhibition()}>??????</Button>
                        </div>
                    </div>
                    <div className={`${style.rowgroup} ${style.clearfix}`}>
                        <div className={`${style.Form} ${style.Form1}`}>
                            {/* <div className={`${style.thumb} ${style.emptyimg}`}> */}
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
                            <div>
                                <h3 className={style.h3}>????????? ?????? ??????</h3>
                                <dl className={style.inputgroup}>
                                    <dt>??????</dt>
                                    <dd className="fix-width">
                                        <input type="text" placeholder="??? ???/?????? ?????? ???????????????." value={floorko} onChange={(e) => setfloorko(e.target.value)} />
                                    </dd>
                                </dl>
                                <dl className={style.inputgroup}>
                                    <dt>?????? ??????</dt>
                                    <dd className="fix-width">
                                        <input type="text" placeholder="?????? ??? ???/?????? ?????? ???????????????." value={flooren} onChange={(e) => setflooren(e.target.value)} />
                                    </dd>
                                </dl>
                            </div>
                        </div>
                        <div className={`${style.Form} ${style.Form2}`}>
                            <div>
                                <h4 className={style.h4}>?????? ????????? ????????????</h4>
                                <ul className={style.ListExhibition}>
                                    {inner.sort((a, b) => a.order > b.order ? 1 : -1).map(inn => {
                                        return (
                                            <li className={style.edit} key={inn.id}>
                                                <div className={style.info}>
                                                    <span className={style.num}>{inn.order}</span>
                                                    <span className={style.txt}>{inn.name}</span>
                                                </div>
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