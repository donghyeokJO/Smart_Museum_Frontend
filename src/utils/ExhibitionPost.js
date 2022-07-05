import React from 'react';
import { ROOT_API } from './axios';
import ExhibitionInner from '../components/ExhibitionInner';
import { baseURL } from '../config';

import style from '../pages/css/admin/Exhibition.module.css';

const ExhibitionPost = ({ exhibitions }) => {
    return (
        <>
            {exhibitions.map((exhibition) => {
                let pk = exhibition['pk'];
                console.log(exhibition);
                return (
                    <div className={style.cont}>
                        <div className={`${style.conthead} ${style.clearfix}`}>
                            <h2 className={`${style.h2} ${style.tit}`}>{exhibition['floor_ko']}<span className={style.eng}>{exhibition['floor_en']}</span></h2>
                            <div className={style.etcBtn}>
                                <a href="#" className={style.morebtn}></a>
                                <ul className={style.etcGroup}>
                                    <li>삭제</li>
                                </ul>
                            </div>
                        </div>
                        <div className={style.contbody}>
                            <div className={style.thumb}><img src={baseURL + exhibition['drawing_image']} /></div>
                            {/* <div className={style.listwrap}>
                                <ul className={style.list}> */}
                            <ExhibitionInner pk={pk}></ExhibitionInner>
                            {/* </ul>
                            </div> */}
                        </div>
                    </div>
                )
            })}
        </>
    )
}

export default ExhibitionPost;