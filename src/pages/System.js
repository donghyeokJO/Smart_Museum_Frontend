import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { ROOT_API } from "../utils/axios";
import SystemPost from "../utils/SystemPost";
import Pagination from "../utils/pagination";
import { Jwt } from "jsonwebtoken";

import SystemHeader from "../components/SystemHeader";

import style from './css/system/System.module.css'
// import Pagination from 'react-bootstrap/Pagination';

// import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';

function System() {

    const [UserList, setUserList] = useState([]);
    const [UserCount, setUserCount] = useState(0);
    const [Active, setActive] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(5);

    useEffect(() => {
        let access = localStorage.getItem('access');


        ROOT_API.account_list('JWT ' + access)
            .then((res) => {
                // console.log(res.data);
                // console.log(res.data.length);
                setUserList(res.data);
                setUserCount(res.data.length);
                // console.log(UserCount)
            })
    }, []);

    const indexOfLast = Active * postsPerPage;
    const indexOfFirst = indexOfLast - postsPerPage;

    const currentUserList = (posts) => {
        let currentUser = 0;
        currentUser = posts.slice(indexOfFirst, indexOfLast);
        return currentUser;
    };

    return (
        <div id='wrap'>
            <SystemHeader Service={true}></SystemHeader>
            <div id={style.Systemcontainer}>
                <section>
                    <h5>서비스신청</h5>
                    <div className={style.Systemfilter}>
                        <div>
                            <select>
                                <option>모두</option>
                                <option>결제상태</option>
                                <option>지역</option>
                            </select>
                        </div>
                        <div className={style.Systemsearch}>
                            <input className={style.SystemserachTerm} placeholder="검색어를 입력해주세요." />
                        </div>
                    </div>
                    <div className={style.tableWrap}>
                        <div className={style.SystemtableContent}>
                            <div className={style.SystembasicTable} id={style.Systemthead}>
                                <div>
                                    <ul>
                                        <li>아이디</li>
                                        <li>지역</li>
                                        <li>박물관 이름</li>
                                        <li>결제상태</li>
                                    </ul>
                                </div>
                            </div>
                            <SystemPost posts={currentUserList(UserList)}></SystemPost>
                            {/* {Useritems} */}
                        </div>
                    </div>
                    {/* <nav className={style.Systemnavi}>
                        <Pagination>{items}</Pagination>
                    </nav> */}

                    <Pagination
                        postsPerPage={postsPerPage}
                        totalPosts={UserList.length}
                        paginate={setActive}
                    ></Pagination>

                    {/* <nav className={style.Systemnavi}>
                        <Pagination>{items}</Pagination> */}
                    {/* <ul className="pagination">
                            <li className="page-item"><a className="page-link" href="#">&lt;&lt;</a></li>
                            <li className="page-item active"><a className="page-link" href="#">1</a></li>
                            <li className="page-item"><a className="page-link" href="#">2</a></li>
                            <li className="page-item"><a className="page-link" href="#">3</a></li>
                            <li className="page-item"><a className="page-link" href="#">&gt;&gt;</a></li>
                        </ul> */}
                    {/* </nav> */}
                </section>
            </div>
        </div>
    );
}

export default withRouter(System);