import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import DashBoardHeader from "../components/DashBoardHeader";
import { ROOT_API } from "../utils/axios";
import Button from 'react-bootstrap/Button';
import { baseURL } from "../config";
import ExhibitionInner from "../components/ExhibitionInner";
import ExhibitionPost from "../utils/ExhibitionPost";
import Pagination from "../utils/pagination";

import style from './css/admin/Exhibition.module.css';

function ExhibitionNew() {
    const [Name, setName] = useState('');

    const [ExhibitionList, setExhibitionList] = useState([]);

    const [Active, setActive] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(3);

    const indexOfLast = Active * postsPerPage;
    const indexOfFirst = indexOfLast - postsPerPage;

    const currentExhibitionList = (posts) => {
        let currentUser = 0;
        currentUser = posts.slice(indexOfFirst, indexOfLast);
        return currentUser;
    };

    const user_id = localStorage.getItem('user_id');
    const access = localStorage.getItem('access');

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
                            <ExhibitionPost exhibitions={currentExhibitionList(ExhibitionList)}></ExhibitionPost>
                        </div>
                    </div>
                    <Pagination
                        postsPerPage={postsPerPage}
                        totalPosts={ExhibitionList.length}
                        paginate={setActive}
                    ></Pagination>
                </div>
            </div>
        </body>
    );
}

export default withRouter(ExhibitionNew);