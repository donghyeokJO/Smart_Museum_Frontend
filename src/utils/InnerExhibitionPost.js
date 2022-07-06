import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import DashBoardHeader from "../components/DashBoardHeader";
import { ROOT_API } from "../utils/axios";
import { baseURL } from "../config";
import Button from 'react-bootstrap/Button'

import style from '../pages/css/admin/InnerExhibition.module.css';

const InnerExhibitionPost = ({ innerExhibition, floors }) => {
    return (
        <>
            {innerExhibition.sort((a, b) => a.pk > b.pk ? 1 : -1).map((item, idx) => {
                console.log(item);
                let color = item['exhibition']['floor_ko'] === floors[0] ? `${style.division} ${style.first}` : item['exhibition']['floor_ko'] === floors[1] ? `${style.division} ${style.second}` : `${style.division} ${style.under}`;
                let url = '/inner-exhibition-detail?id=' + item['pk'];
                let imgsrc = item['image'] === null ? './img/noimage.png' : baseURL + item['image'];
                return (
                    <div className={style.imgcont}>
                        <a href={url} item={item}>
                            <div className={style.thumb}>
                                <img src={imgsrc} alt={item['name']} />
                            </div>
                            <div className={style.text}>
                                <span className={color}>{item['exhibition']['floor_ko']}</span>
                                <div className={style.detail}>
                                    <div className={style.title}>
                                        <span className={style.num}>{item['order']}</span>
                                        <span className={style.txt}>{item['name']}</span>
                                    </div>
                                    <div className={style.etcBtn}>
                                        <a href="#" className={style.morebtn}></a>
                                        <ul className={style.etcGroup}>
                                            <li>삭제</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
                );
            })}
        </>
    )
}

export default InnerExhibitionPost;