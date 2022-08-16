import React from 'react';
import { ROOT_API } from './axios';
import { Button } from "react-bootstrap";
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'

import style from '../pages/css/system/SystemUser.module.css';


function AcceptUser(post) {
    var user_pk = post['pk'];
    var access = 'JWT ' + localStorage.getItem('access');
    var museum_name = post['museum_name'];
    var museum_location = post['museum_location'];
    var service_plan = post['service_plan'];
    var payment_state = '3'

    // console.log('hi')
    ROOT_API.account_service(user_pk, payment_state, service_plan, museum_name, museum_location, access)
        .then((res) => {
            if (res.status === 200) {
                alert('정상적으로 변경되었습니다!');
                window.location.reload()
                // window.location.href = '/';
            }
        }).catch((err) => {
            console.log(err);
            alert('문제가 발생하였습니다. 다시 시도해 주세요');
            return
        })
}


function deleteUser(post) {
    var user_pk = post['pk'];
    var access = 'JWT ' + localStorage.getItem('access');

    ROOT_API.account_delete(access, user_pk)
        .then((res) => {
            console.log(res.data);
            alert('삭제 되었습니다.');
            window.location.reload();
        });
}


const SystemUserPost = ({ posts }) => {
    return (
        <>
            {posts.map((post) => (
                <div className={style.SystembasicTable}>
                    <div>
                        <ul>
                            {/* <li className={style.inputRow}><input type="checkbox" /></li> */}
                            <li>{post['username']}</li>
                            <li>{post['museum_location']}</li>
                            <li>{post['museum_name']}</li>
                            <li>
                                {post['username'] === 'admin' ?  '관리자'  : post['payment_state'] === 3  ? post['payment_state_string'] : <button type="button" onClick={() => AcceptUser(post)} >승인</button>}
                            </li>
                            <li>
                                {post['username'] === 'admin' ? '' : <Button className={style.btn02} onClick={() => window.location.href = '/system-user-modify?id=' + post['pk']}>수정</Button>}
                                {post['username'] === 'admin' ? '' : <Button className={style.btn03} onClick={() => deleteUser(post)}>삭제</Button>}
                            </li>
                        </ul>
                    </div>
                </div>
            ))}
        </>
    )
}

export default SystemUserPost;