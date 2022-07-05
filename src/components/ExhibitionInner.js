import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { ROOT_API } from "../utils/axios";

import style from '../pages/css/admin/Exhibition.module.css'

const ExhibitionInner = ({ pk }) => {
    const [innerList, setinnerList] = useState([]);

    // const user_id = localStorage.getItem('user_id');
    const access = localStorage.getItem('access');

    useEffect(() => {
        console.log(pk);
        ROOT_API.exhibition_list('JWT ' + access, pk)
            .then((res) => {
                setinnerList(res.data);
            })
    }, []);

    return (
        <>
            <div className={style.listwrap}>
                <ul className={style.list}>
                    {innerList.sort((a, b) => a.order > b.order ? 1 : -1).map((inner) => (
                        <li>
                            <span className={style.num}>{inner['order']}</span>
                            <span className={style.txt}>{inner['name']}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}

export default ExhibitionInner;