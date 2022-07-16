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

    const [UserList, setUserList] = useState([]); // 현재 페이지 전체 정보
    const [UserCount, setUserCount] = useState(0);
    const [postsPerPage, setPostsPerPage] = useState(7);

    const [currentList, setCurrentList] = useState([]); // 보여줄 정보
    const [totalList, setTotalList] = useState([]); // 전체 유저 정보 (검색용)

    const params = new URLSearchParams(window.location.search);
    const page = params.get("page");

    const access = localStorage.getItem('access');

    const [std, setstd] = useState('all'); // 검색 기준
    const [keyword, setKeyword] = useState(''); // 검색 키워드

    useEffect(() => {
        ROOT_API.account_list_page('JWT ' + access, page)
            .then((res) => {
                setUserList(res.data['results']); // 현재 페이지 전체 정보
                setUserCount(res.data['results'].length);
                setCurrentList(res.data['results']); // 보여줄 정보
                setTotalList(res.data['results']); // 전체 유저 정보
            })
    }, []);

    const search = (keyword) => {
        switch (std) {
            case 'all':
                setCurrentList(totalList.filter(item => String(item['museum_location']).includes(keyword) || String(item['museum_name']).includes(keyword)));
            case 'location':
                setCurrentList(totalList.filter(item => String(item['museum_location']).includes(keyword)));
            case 'name':
                setCurrentList(totalList.filter(item => String(item['museum_name']).includes(keyword)));
        }
    }

    return (
        <div id='wrap'>
            <SystemHeader Service={true}></SystemHeader>
            <div id={style.Systemcontainer}>
                <section>
                    <h5>서비스신청</h5>
                    <div className={style.Systemfilter}>
                        <div>
                            <select onChange={(e) => setstd(e.target.value)}>
                                <option value='all'>모두</option>
                                <option value='name'>박물관 이름</option>
                                <option value='payment'>결제상태</option>
                                <option value='location'>지역</option>
                            </select>
                        </div>
                        <div className={style.Systemsearch}>
                            <input className={style.SystemserachTerm} value={keyword} onChange={(e) => { setKeyword(e.target.value); search(e.target.value) }} placeholder="검색어를 입력해주세요." />
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
                            <SystemPost posts={currentList}></SystemPost>
                        </div>
                    </div>

                    <Pagination
                        postsPerPage={postsPerPage}
                        totalPosts={UserList.length}
                        link='/system?page='
                    ></Pagination>
                </section>
            </div>
        </div>
    );
}

export default withRouter(System);