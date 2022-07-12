import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import DashBoardHeader from "../components/DashBoardHeader";
import { ROOT_API } from "../utils/axios";
import { baseURL } from "../config";
import Button from 'react-bootstrap/Button';
import InnerExhibitionPost from "../utils/InnerExhibitionPost";
import Pagination from "../utils/pagination";


import style from './css/admin/InnerExhibition.module.css'

function InnerExhibition() {
    const params = new URLSearchParams(window.location.search);
    const page = params.get("page");
    const Floor = params.get("floor");

    const [Name, setName] = useState('');
    const [floor, setfloor] = useState('');

    useEffect(() => {
        if(Floor === null){
            setfloor('전체');
        }
        else setfloor(params.get('floor'));
    }, [])

    const [innerList, setinnerList] = useState([]);
    const [ExhibitionList, setExhibitionList] = useState([]);

    const user_id = localStorage.getItem('user_id');
    const access = localStorage.getItem('access');

    const [postsPerPage, setPostsPerPage] = useState(6);

    const [items, setitems] = useState([]);
    const [currentList, setcurrentList] = useState([]);
    const [TotalLength, setTotalLength] = useState(0);

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
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    useEffect(() => {
        ROOT_API.exhibition_pagination('JWT ' + access, user_id, page, Floor)
            .then((res) => {
                setcurrentList(res.data['results']);
                setTotalLength(res.data['count']);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const floors = ExhibitionList.map((exhibition) => {
        return exhibition['floor_ko'];
    });

    const floors_en = ExhibitionList.map((exhibition) => {
        return exhibition['floor_en'];
    });

    const currentFloor = floor => {
        if (floor === "전체") {
            window.location.href = '/inner-exhibition';
            return;
        }

        // setitems(originalitems);
        window.location.href = '/inner-exhibition/?floor='+floor;
    }

    return (
        <body className={style.body}>
            <DashBoardHeader exhibition={true} ex2={true}></DashBoardHeader>
            <div className={style.Dashcontainer}>
                <nav className={`${style.DashsubNav} ${style.clearfix}`}>
                    <div className={style.place}>
                        <i className="far fa-edit"></i>전시관 관리
                        <span><i className="fas fa-angle-right"></i>전시관 정보 관리</span>
                    </div>
                    <div className={style.user}>
                        <ul className={style.clearfix}>
                            <li><i className="fas fa-user"></i>{Name.Name}님</li>
                            <li><a href="#" title="로그아웃하기" onClick={function () { localStorage.clear(); window.location.href = '/' }} ><i className="fas fa-unlock"></i>로그아웃</a></li>
                        </ul>
                    </div>
                </nav>
                <div className={`${style.content} ${style.ManageInfo}`}>
                    <div className={style.pageHead}>
                        <h1 className={`${style.h1} ${style.tit}`}>전시관 정보 관리</h1>
                        <div className={style.Headgroup}>
                            <Button variant="primary" onClick={() => window.location.href = '/inner-exhibition-add'}>새 전시관 등록&nbsp;&nbsp;<i className="fas fa-plus"></i></Button>{' '}
                        </div>
                    </div>
                    <ul id={style.tabul}>
                        <li className={Floor === null ? style.on : null} onClick={() => { currentFloor("전체");}}>전체</li>
                        {floors.map((f, idx) => {
                            return (
                                <li className={Floor === floors_en[idx] ? style.on : null} onClick={() => {currentFloor(floors_en[idx]);}}>{f}</li>
                            )
                        })}
                    </ul>


                    <div className={`${style.tabcont} ${style.clearfix}`}>
                        <div className={`${style.all} ${style.clearfix}`}>
                            <InnerExhibitionPost innerExhibition={currentList} floors={floors}></InnerExhibitionPost>
                        </div>
                    </div>
                    <Pagination
                        postsPerPage={postsPerPage}
                        totalPosts={TotalLength}
                        link={Floor !== null ? '/inner-exhibition?floor=' + Floor + '&page=' : '/inner-exhibition?page='}
                    ></Pagination>
                </div>
            </div>
        </body>
    );

}

export default withRouter(InnerExhibition);