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
    const [postsPerPage, setPostsPerPage] = useState(5);

    const [addShow, setaddShow] = useState(false);
    const [editShow, seteditShow] = useState(false);

    const [UserName, setUserName] = useState('');
    const [UserPassword, setUserPassword] = useState('');
    const [UserLocation, setUserLocation] = useState('서울');
    const [MuseumName, setMusemName] = useState('');

    const AddClose = () => {
        // setUserName 
        console.log(UserName);
        console.log(UserPassword);
        console.log(UserLocation);
        console.log(MuseumName);
        ROOT_API.account(UserName, UserPassword, UserLocation, MuseumName)
            .then((res) => {
                alert('추가 되었습니다.')
            })

        setaddShow(false);
    }

    const HandleaddShow = () => {
        // console.log('show!')
        setaddShow(true);
    }
    const HandleaddClose = () => setaddShow(false);

    const HandleeditShow = () => seteditShow(true);
    const HandleeditClose = () => seteditShow(false);

    useEffect(() => {
        let access = localStorage.getItem('access');


        ROOT_API.account_list('JWT ' + access)
            .then((res) => {
                setUserList(res.data);
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
        <>
            <div id='wrap'>
                <SystemHeader Member={true}></SystemHeader>
                <div id={style.Systemcontainer}>
                    <section>
                        <h5>회원정보</h5>
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
                            <div className={style.management}>
                                <Button className={style.btn01} onClick={() => HandleaddShow()}>회원추가</Button>
                                <Button className={style.btn02} data-toggle="modal" data-target="#memberEdit">수정</Button>
                                <Button className={style.btn03} data-toggle="modal" data-target="#memberDel">삭제</Button>
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
                                <SystemUserPost posts={currentUserList(UserList)}></SystemUserPost>
                            </div>
                        </div>

                        <Pagination
                            postsPerPage={postsPerPage}
                            totalPosts={UserList.length}
                            paginate={setActive}
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
                                <Form.Select value={UserLocation} onChange={e => setUserLocation(e.target.value)}>
                                    <option value="서울">서울</option>
                                    <option value="부산">부산</option>
                                </Form.Select>
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