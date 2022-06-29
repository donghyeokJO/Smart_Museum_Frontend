import React from 'react';
import { ROOT_API } from './axios';

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


const SystemUserPost = ({ posts }) => {
    return (
        <>
            {posts.map((post) => (
                <div className={style.SystembasicTable}>
                    <div>
                        <ul>
                            <li className={style.inputRow}><input type="checkbox"/></li>
                            <li>{post['username']}</li>
                            <li>{post['museum_location']}</li>
                            <li>{post['museum_name']}</li>
                            <li>
                                {post['payment_state'] === 3 ? '승인완료' : <button type="button" onClick={() => AcceptUser(post)} >승인</button>}
                            </li>
                        </ul>
                    </div>
                </div>
            ))}
        </>
    )
}

export default SystemUserPost;