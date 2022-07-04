import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import DashBoardHeader from "../components/DashBoardHeader";
import { ROOT_API } from "../utils/axios";
import Button from 'react-bootstrap/Button';
import { baseURL } from "../config";

import style from './css/admin/Exhibition.module.css'

function ExhibitionNew() {
    const [Name, setName] = useState('');

    const [ExhibitionList, setExhibitionList] = useState([]);
    const [innerList, setinnerList] = useState([]);
    const [temp, setTemp] = useState([]);

    const user_id = localStorage.getItem('user_id');
    const access = localStorage.getItem('access');

    // const innerList = [];

    useEffect(() => {
        console.log('dd');
        ROOT_API.user_info(user_id, 'JWT ' + access)
            .then((res) => {
                setName({ Name: res.data['username'] });
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    useEffect(() => {
        console.log('ss');
        ROOT_API.museum_list('JWT ' + access, user_id)
            .then((res) => {
                setExhibitionList(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    useEffect(() => {
        console.log('kk');
        // let items = [];
        ROOT_API.museum_list('JWT ' + access, user_id)
            .then((res) => {
                res.data.map((exhibition) => {
                    let pk = exhibition['pk'];
                    // console.log(pk)
                    ROOT_API.exhibition_list('JWT ' + access, pk)
                        .then((res) => {
                            // this.setState({ innerList: this.state.innerList.concat(res.data) })
                            // setTemp(res.data);
                            // items.concat(res.data)
                            console.log(res.data)
                        })
                        .catch((err) => {
                            console.log(err);
                        });

                    // console.log(items);
                })
            })
            .catch((err) => {
                console.log(err);
            });
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
                <div className={`${style.content} ${style.ManageDrawing}`}>
                    <div className={style.pageHead}>
                        <h1 className={`${style.h1} ${style.tit}`}>전시관 도면 관리</h1>
                        <div className={style.Headgroup}>
                            <Button variant="primary" onClick={() => window.location.href = '/exhibition-add'}>새 도면 등록&nbsp;&nbsp;<i className="fas fa-plus"></i></Button>{' '}
                            {/* <button onclick="location.href='ManageDrawing_write.html'" className="btn btn-blue">새 도면 등록<i className="fas fa-plus"></i></button> */}
                        </div>
                    </div>
                    <div className={style.rowgroup}>
                        <div className={`${style.DrawingList} ${style.clearfix}`}>
                            {ExhibitionList.map((exhibition, idx) => {
                                console.log('a')
                                let pk = exhibition['pk'];
                                // ROOT_API.exhibition_list('JWT ' + access, pk)
                                //     .then((res) => {
                                //         setinnerList(innerList.concat(res.data))
                                //     })
                                //     .catch((err) => {
                                //         console.log(err);
                                //     });

                                // console.log(innerList);
                                // console.log(innerList);
                                // let inner = innerList[idx + 1];
                                // console.log(inner);
                                return (
                                    <div className={style.cont}>
                                        <div className={`${style.conthead} ${style.clearfix}`}>
                                            <h2 className={`${style.h2} ${style.tit}`}>{exhibition['floor_ko']}<span className={style.eng}>{exhibition['floor_en']}</span></h2>
                                            <div className={style.etcBtn}>
                                                <a href="#" className={style.morebtn}></a>
                                                <ul className={style.etcGroup}>
                                                    <li>삭제</li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className={style.contbody}>
                                            <div className={style.thumb}><img src={baseURL + exhibition['drawing_image']} /></div>
                                            <div className={style.listwrap}>
                                                <ul className={style.list}>
                                                    {/* {inner.map((inn) => {
                                                        return (
                                                            <li>
                                                                <span className={style.num}>{inn['order']}</span>
                                                                <span className={style.txt}>{inn['name']}</span>
                                                            </li>
                                                        )
                                                    })} */}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    {/* pagenation */}
                </div>
            </div>
        </body>
    );
}

export default withRouter(ExhibitionNew);