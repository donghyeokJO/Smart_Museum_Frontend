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
                setfloorpk(res.data[0]['pk'])
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
            alert('?????? ????????? ??????????????????');
            return;
        }

        if (isNaN(order)) {
            alert('????????? ???????????? ?????????.');
            return;
        }

        let formdata = new FormData();

        formdata.append('name', inName);
        formdata.append('order', order);
        formdata.append('explanation', detail);
        formdata.append('image', imgFile);
        formdata.append('x_coordinate', '');
        formdata.append('y_coordinate', '');

        // console.log(formdata);

        ROOT_API.inner_exhibition_add('JWT ' + access, formdata, floorpk)
            .then((res) => {
                if (res.status === 200) {
                    // console.log(res.data)
                    let pk = res.data['pk'];
                    ROOT_API.beacon_add('JWT ' + access, pk, beacon)
                        .then((res) => {
                            if (res.status === 200){
                                alert('?????? ???????????????.');
                                window.location.href = '/inner-exhibition';
                            }
                        })
                }
            })
            .catch((err) => {
                console.log(err);
                alert('?????? ????????? ???????????? ?????????.')
            })
    }

    return (
        <body className={style.body}>
            <DashBoardHeader exhibition={true} ex2={true}></DashBoardHeader>
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
                <div className={`${style.content} ${style.ManageInfo_write} ${style.WRITEFORM}`}>
                    <div className={style.pageHead}>
                        <h1 className={`${style.tit} ${style.h1}`}>??? ????????? ??????</h1>
                        <div className={style.Headgroup}>
                            <Button variant="secondary" onClick={() => window.location.href = '/inner-exhibition'}>??????</Button>
                            <Button variant="primary" onClick={() => addInnerExhibition()}>??????</Button>
                        </div>
                    </div>
                    <div className={`${style.rowgroup} ${style.clearfix}`}>
                        <div className={`${style.Form} ${style.Form1}`}>
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
                        <div className={`${style.Form} ${style.Form2}`}>
                            <div className={style.input1}>
                                <dl className={style.inputgroup}>
                                    <dt>??????</dt>
                                    <dd className="fix-width">
                                        <DropdownButton id="dropdown-variants-Secondary" key="Secondary" variant="secondary" title={floor}>
                                            {ExhibitionList.map((exhibition) => {
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
                                    <dt>????????? ??????</dt>
                                    <dd className="fix-width">
                                        <input type="text" placeholder="????????? ????????? ???????????????." value={inName} onChange={(e) => setinName(e.target.value)} />
                                    </dd>
                                </dl>
                            </div>
                            <div className={style.input1}>
                                <dl className={style.inputgroup}>
                                    <dt>??????/??????</dt>
                                    <dd className="fix-width">
                                        <input type="text" placeholder="??????/????????? ???????????????." value={order} onChange={(e) => setorder(e.target.value)} />
                                    </dd>
                                </dl>
                            </div>
                            <div className={style.input1}>
                                <dl className={style.inputgroup}>
                                    <dt>?????? ID</dt>
                                    <dd className="fix-width">
                                        <input type="text" placeholder="??????ID??? ???????????????. (?????? ?????? ?????? ??????(,)??? ???????????? ??????)" value={beacon} onChange={(e) => setBeacon(e.target.value)} />
                                    </dd>
                                </dl>
                            </div>
                            <div className={`${style.input1} ${style.textarea}`}>
                                <dl className={style.inputgroup}>
                                    <dt>?????? ??????</dt>
                                    <dd>
                                        <textarea placeholder="????????? ?????? ????????? ???????????????." value={detail} onChange={(e) => setdetail(e.target.value)}></textarea>
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