import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { ROOT_API } from "../utils/axios";
import jwt from "jsonwebtoken";

// import './css/main/reset.module.css';
import style from './css/main/MyPage.module.css';

function MyPage() {

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

    useEffect(() => {
        let user_id = localStorage.getItem('user_id');
        let access = localStorage.getItem('access');

        ROOT_API.user_info(user_id, 'JWT ' + access)
            .then((res) => {
                setName({ Name: res.data['username'] });
                setLocation({ Location: res.data['museum_location'] });
                setMuseumName({ MuseumName: res.data['museum_name'] });
                setPaymentState({ PaymentState: res.data['payment_state'] });
                setServicePlan({ ServicePlan: res.data['service_plan'] });
            })
            .catch((err) => {
                console.log(err)
            })
    }, []);

    return (
        <div id='wrap' className={style.contentwrap}>
            <div className={style.content}>
                <form>
                    <div>
                        <label>ID</label>
                        <input type="text" value={Name.Name} readOnly />
                    </div>
                    <div>
                        <label>지역</label>
                        <input type="text" value={Location.Location} readOnly />
                    </div>
                    <div>
                        <label>과학관이름</label>
                        <input type="text" value={MuseumName.MuseumName} readOnly />
                    </div>

                    {
                        (ServicePlan.ServicePlan === null) ?
                            <div className={style.request}>
                                <a href="/service">서비스 신청하기</a>
                            </div> : null
                    }
                    <div>
                        <label>결제진행상태</label>
                        <input type="text" value={PaymentStateMapping[PaymentState.PaymentState]} readOnly className="state" />
                    </div>
                    <div className={style.plan}>
                        <label>서비스신청상태</label>
                        <input type="text" value={ServicePlanMapping[ServicePlan.ServicePlan]} readOnly />
                        <a href="/service-select">플랜업그레이드</a>
                    </div>
                    <div className={style.go_link}>
                        <a href="/dashboard">관리자 시스템</a>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default withRouter(MyPage);