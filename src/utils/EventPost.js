import React, { useState } from 'react';
import { ROOT_API } from './axios';
import { baseURL } from '../config';

import style from '../pages/css/admin/Event.module.css';

const deleteEvent = pk => {
    if (window.confirm("정말 삭제합니까?")){
        console.log(pk);
        const user_id = localStorage.getItem('user_id');
        const access = localStorage.getItem('access');

        ROOT_API.event_delete('JWT ' + access, pk)
            .then((res) => {
                alert('삭제 되었습니다.')
                window.location.reload();
            })
        }

    else {
        return
    }
    
}

const EventPost = ({Events}) => {
    const [show1, setshow1] = useState(false);
    const [show2, setshow2] = useState(false);
    const [show3, setshow3] = useState(false);
    const [show4, setshow4] = useState(false);
    const [show5, setshow5] = useState(false);
    const [show6, setshow6] = useState(false);

    return (
        <>
            {Events.map((item, idx) => {
                let cls = item['type'] === 2 ? `${style.division} ${style.mission}` : `${style.division} ${style.normal}`;
                let evt_txt = item['type'] === 2 ? "미션 이벤트" : "이벤트";
                let img_src = item['image'];
                let url = item['type'] === 2 ? "/event-mission-detail?id=" + item['pk'] : "/event-detail?id=" + item['pk'];

                const show = idx === 0 ? show1 : idx === 1 ? show2 : idx === 2 ? show3 : idx === 3 ? show4 : idx === 4 ? show5 : show6;
                const setshow = idx === 0 ? setshow1 : idx === 1 ? setshow2 : idx === 2 ? setshow3 : idx === 3 ? setshow4 : idx === 4 ? setshow5 : setshow6;
                let on_cls = show ? `${style.etcGroup} ${style.on}` : style.etcGroup;

                return (
                    <div className={style.imgcont}>
                        {/* <a href={url}> */}
                            <div className={style.thumb} onClick={() => window.location.href = url}>
                                <img src={img_src} alt={item['name']} />
                            </div>
                            <div className={style.text}>
                                <div className={style.detail}>
                                    <span className={cls}>{evt_txt}</span>
                                    <div className={style.title}>
                                        <span className={style.txt}>{item['name']}</span>
                                    </div>
                                    <div className={style.etcBtn} onClick={() => setshow(!show)}>
                                        <a href="#" className={style.morebtn}></a>
                                        <ul className={on_cls}>
                                            <li onClick={() => deleteEvent(item['pk'])}>삭제</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        {/* </a> */}
                    </div>
                )
            })}
        </>
    )
}

export default EventPost;