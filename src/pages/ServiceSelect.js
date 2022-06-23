import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { ROOT_API } from "../utils/axios";

import style from './css/main/ServiceSelect.module.css';

function ServiceSelect() {
    const [service_plan, setServicePlan] = useState('');

    useEffect(() => {
        setServicePlan({ service_plan: '1' });
    }, []);

    function OnServiceSelect() {
        var payment_state = '2';
        var user_pk = localStorage.getItem('user_id');
        var access = 'JWT ' + localStorage.getItem('access');
        var museum_name = localStorage.getItem('museumName');
        var museum_location = localStorage.getItem('museumLocation');

        ROOT_API.account_service(user_pk, payment_state, service_plan.service_plan, museum_name, museum_location, access)
            .then((res) => {
                if (res.status === 200) {
                    alert('정상적으로 신청되었습니다!');
                    window.location.href = '/';
                }
            }).catch((err) => {
                console.log(err);
                alert('문제가 발생하였습니다. 다시 시도해 주세요');
                return
            })
    }

    function handleChange(e) {
        console.log(`*****handleChange*****`);
        console.log(`선택한 값 : ${e.target.value}`);

        setServicePlan({ service_plan: e.target.value });
    };

    return (
        <div id="wrap" className={style.contentwrap}>
            <div className={style.content}>
                <form>
                    <div>
                        <label className={style.boxradioinput}><input type="radio" name="cp_item" value="1" checked={service_plan.service_plan === "1"} onChange={handleChange} /><span>1M(500,000원/월)</span></label>
                        <label className={style.boxradioinput}><input type="radio" name="cp_item" value="2" checked={service_plan.service_plan === "2"} onChange={handleChange} /><span>1Y(5,500,000원/연)</span></label>
                        <label className={style.boxradioinput}><input type="radio" name="cp_item" value="3" checked={service_plan.service_plan === "3"} onChange={handleChange} /><span>3Y(5,000,000원/연)</span></label>
                    </div>
                    <div className={style.buttonwrap}>
                        <button type="button" className={style.purple} onClick={OnServiceSelect}>서비스신청</button>
                    </div>
                </form>
            </div>
        </div>
    );

}

export default withRouter(ServiceSelect);