import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import DashBoardHeader from "../components/DashBoardHeader";
import { ROOT_API } from "../utils/axios";
import { baseURL } from "../config";
import Button from 'react-bootstrap/Button'

import style from '../pages/css/admin/InnerExhibition.module.css';


const deleteInnerExhibition = pk => {
    console.log(pk);
    const user_id = localStorage.getItem('user_id');
    const access = localStorage.getItem('access');

    ROOT_API.inner_exhibition_del('JWT ' + access, pk)
        .then((res) => {

            alert('삭제 되었습니다.')
            window.location.reload();

        })

}


const InnerExhibitionPost = ({ innerExhibition, floors }) => {
    const [show1, setshow1] = useState(false);
    const [show2, setshow2] = useState(false);
    const [show3, setshow3] = useState(false);
    const [show4, setshow4] = useState(false);
    const [show5, setshow5] = useState(false);
    const [show6, setshow6] = useState(false);

    return (
        <>
            {innerExhibition.sort((a, b) => a.pk > b.pk ? 1 : -1).map((item, idx) => {
                let color = item['exhibition']['floor_ko'] === floors[0] ? `${style.division} ${style.first}` : item['exhibition']['floor_ko'] === floors[1] ? `${style.division} ${style.second}` : `${style.division} ${style.under}`;
                let url = '/inner-exhibition-detail?id=' + item['pk'];
                let imgsrc = item['image'] === null ? './img/noimage.png' : baseURL + item['image'];
                const show = idx === 0 ? show1 : idx === 1 ? show2 : idx === 2 ? show3 : idx === 3 ? show4 : idx === 4 ? show5 : show6;
                const setshow = idx === 0 ? setshow1 : idx === 1 ? setshow2 : idx === 2 ? setshow3 : idx === 3 ? setshow4 : idx === 4 ? setshow5 : setshow6;
                let cls = show ? `${style.etcGroup} ${style.on}` : style.etcGroup;
                // console.log(show[idx]);
                return (
                    <div className={style.imgcont}>
                        {/* <a href={url} item={item}> */}
                        <div className={style.thumb} onClick={() => window.location.href = { url }}>
                            <img src={imgsrc} alt={item['name']} />
                        </div>
                        <div className={style.text}>
                            <span className={color}>{item['exhibition']['floor_ko']}</span>
                            <div className={style.detail}>
                                <div className={style.title}>
                                    <span className={style.num}>{item['order']}</span>
                                    <span className={style.txt}>{item['name']}</span>
                                </div>
                                <div className={style.etcBtn} onClick={() => setshow(!show)}>
                                    <a href="#" className={style.morebtn}></a>
                                    <ul className={cls}>
                                        <li onClick={() => deleteInnerExhibition(item['pk'])}>삭제</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        {/* </a> */}
                    </div>
                );
            })}
        </>
    )
}

export default InnerExhibitionPost;