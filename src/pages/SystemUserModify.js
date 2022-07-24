import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { ROOT_API } from "../utils/axios";

import style from './css/system/SystemUserModify.module.css';

import SystemHeader from "../components/SystemHeader";

function SystemUserModify() {

    const params = new URLSearchParams(window.location.search);

    const id = params.get("id");

    const [Name, setName] = useState('');
    const [Location, setLocation] = useState('');
    const [MuseumName, setMuseumName] = useState('');
    const [PaymentState, setPaymentState] = useState('');
    const [ServicePlan, setServicePlan] = useState('');

    const PaymentStateMapping = {
        '1': '미사용',
        'None': '미사용',
        '2': '결제 승인 진행 중',
        '3': '결제 완료'
    }

    const ServicePlanMapping = {
        '1': '1M',
        '2': '1Y',
        '3': '3Y'
    }

    const access = localStorage.getItem('access');

    useEffect(() => {
        ROOT_API.user_info(id, 'JWT ' + access)
            .then((res) => {
                setName(res.data['username']);
                setLocation(res.data['museum_location']);
                setMuseumName(res.data['museum_name']);
                setPaymentState(res.data['payment_state']);
                setServicePlan(res.data['service_plan']);
            })
            .catch((err) => {
                console.log(err)
            })
    }, []);

    const onSave = () => {
        ROOT_API.account_put('JWT ' + access, Name, Location, MuseumName, id)
            .then((res) => {
                alert('수정 되었습니다.');
                window.location.reload();
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <div id='wrap' className={style.contentwrap}>
            <SystemHeader Member={true}></SystemHeader>
            <div className={style.content}>
                <form>
                    <div>
                        <label>ID</label>
                        <input type="text" value={Name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div>
                        <label>지역</label>
                        <input type="text" value={Location} onChange={(e) => setLocation(e.target.value)} />
                    </div>
                    <div>
                        <label>과학관이름</label>
                        <input type="text" value={MuseumName} onChange={(e) => setMuseumName(e.target.value)} />
                    </div>
                    <div>
                        <label>결제진행상태</label>
                        <input type="text" value={PaymentStateMapping[PaymentState]} readOnly className="state" />
                    </div>
                    <div className={style.plan}>
                        <label>서비스신청상태</label>
                        <input type="text" value={ServicePlanMapping[ServicePlan]} readOnly />
                        <a href="/service-select">플랜업그레이드</a>
                    </div>
                    <div className={style.go_link} onClick={() => onSave()}>
                        <a href="#">저장하기</a>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default withRouter(SystemUserModify);