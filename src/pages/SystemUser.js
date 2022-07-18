import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { ROOT_API } from "../utils/axios";
import SystemUserPost from "../utils/SystemUserPost";
import Pagination from "../utils/pagination";
import { Button } from "react-bootstrap";
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'

import SystemHeader from "../components/SystemHeader";

import style from './css/system/SystemUser.module.css';

function SystemUser() {
    const [UserList, setUserList] = useState([]);
    const [Active, setActive] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(10);

    const [addShow, setaddShow] = useState(false);
    const [editShow, seteditShow] = useState(false);

    const [UserName, setUserName] = useState('');
    const [UserPassword, setUserPassword] = useState('');
    const [UserLocation, setUserLocation] = useState('');
    const [MuseumName, setMusemName] = useState('');

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
                setCurrentList(res.data['results']); // 보여줄 정보
            })
    }, []);

    useEffect(() => {
        ROOT_API.account_list2('JWT ' + access)
            .then((res) => {
                setTotalList(res.data);
                console.log(res.data);
            })
    }, []);


    const AddClose = () => {
        // setUserName 
        ROOT_API.account(UserName, UserPassword, UserLocation, MuseumName)
            .then((res) => {
                alert('추가 되었습니다.');
                window.location.reload();
            })

        setaddShow(false);
    }

    const HandleaddShow = () => {
        // console.log('show!')
        setaddShow(true);
    }
    const HandleaddClose = () => { setaddShow(false) };

    const HandleeditShow = () => seteditShow(true);
    const HandleeditClose = () => seteditShow(false);

    const search = (keyword) => {
        console.log(keyword);
        switch (std) {
            case 'all':
                setCurrentList(totalList.filter(item => String(item['museum_location']).includes(keyword) || String(item['museum_name']).includes(keyword) || String(item['payment_state_string']).includes(keyword)));
                return
            case 'location':
                setCurrentList(totalList.filter(item => String(item['museum_location']).includes(keyword)));
                return
            case 'name':
                setCurrentList(totalList.filter(item => String(item['museum_name']).includes(keyword)));
                return
            case 'payment':
                setCurrentList(totalList.filter(item => String(item['payment_state_string']).includes(keyword)));
                return;
        }
    }

    return (
        <>
            <div id='wrap'>
                <SystemHeader Member={true}></SystemHeader>
                <div id={style.Systemcontainer}>
                    <section>
                        <h5>회원정보</h5>
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
                            <div className={style.management}>
                                <Button className={style.btn01} onClick={() => HandleaddShow()}>회원추가</Button>
                                {/* <Button className={style.btn02} data-toggle="modal" data-target="#memberEdit">수정</Button>
                                <Button className={style.btn03} data-toggle="modal" data-target="#memberDel">삭제</Button> */}
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
                                            <li>비고</li>
                                        </ul>
                                    </div>
                                </div>
                                <SystemUserPost posts={currentList}></SystemUserPost>
                            </div>
                        </div>

                        <Pagination
                            postsPerPage={postsPerPage}
                            totalPosts={totalList.length}
                            link='/system?page='
                        ></Pagination>

                    </section>
                </div>

                <Modal show={addShow} onHide={() => HandleaddClose()} animation={false}>
                    <Modal.Header closeButton>
                        <Modal.Title>회원추가</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group>
                                <Form.Label>ID</Form.Label>
                                <Form.Control type="text" value={UserName} onChange={e => setUserName(e.target.value)} autoFocus />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>비밀번호</Form.Label>
                                <Form.Control type="text" value={UserPassword} onChange={e => setUserPassword(e.target.value)} />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>지역</Form.Label>
                                <Form.Control type="text" value={UserLocation} onChange={e => setUserLocation(e.target.value)} />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>박물관이름</Form.Label>
                                <Form.Control value={MuseumName} onChange={e => setMusemName(e.target.value)} type="text" />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => HandleaddClose()}>
                            닫기
                        </Button>
                        <Button variant="primary" onClick={() => AddClose()}>
                            추가
                        </Button>
                    </Modal.Footer>
                </Modal>

            </div>
        </>
    )
}

export default withRouter(SystemUser);