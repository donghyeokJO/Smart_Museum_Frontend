import React, { useState } from 'react';
import { ROOT_API } from './axios';
import ExhibitionInner from '../components/ExhibitionInner';
import { baseURL } from '../config';

import style from '../pages/css/admin/Exhibition.module.css';

const ExhibitionPost = ({ exhibitions }) => {
    const [show1, setshow1] = useState(false);
    const [show2, setshow2] = useState(false);
    const [show3, setshow3] = useState(false);


    return (
        <>
            {exhibitions.map((exhibition, idx) => {
                const pk = exhibition['pk'];
                const show = idx === 0 ? show1 : idx === 1 ? show2 : show3;
                const setshow = idx === 0 ? setshow1 : idx === 1 ? setshow2 : setshow3;
                let cls = show ? `${style.etcGroup} ${style.on}` : style.etcGroup;
                return (
                    <div className={style.cont}>
                        <div className={`${style.conthead} ${style.clearfix}`}>
                            <h2 className={`${style.h2} ${style.tit}`}>{exhibition['floor_ko']}<span className={style.eng}>{exhibition['floor_en']}</span></h2>
                            <div className={style.etcBtn} onClick={() => setshow(!show)}>
                                <a href="#" className={style.morebtn}></a>
                                <ul className={cls}>
                                    <li onClick={() => window.location.href = "/exhibition-modify?id=" + pk}>수정</li>
                                </ul>
                            </div>
                        </div>
                        <div className={style.contbody}>
                            <div className={style.thumb}><img src={exhibition['drawing_image']} /></div>
                            <ExhibitionInner pk={pk}></ExhibitionInner>
                        </div>
                    </div>
                )
            })}
        </>
    )
}

export default ExhibitionPost;