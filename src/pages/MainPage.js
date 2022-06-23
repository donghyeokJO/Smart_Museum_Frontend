import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";


import style from './css/main/MainPage.module.css';
// import './css/main/reset.module.css';


class MainPage extends React.Component {
    render() {
        return (
            <div id={style.wrap}>
                <Header></Header>
                <div className={`${style.mainVisu} ${style.clearfix}`}>
                    <div className={style.inner}>
                        <p className={style.t1}>SEAS</p>
                        <p className={style.t2}>smart exhibition analysis system</p>
                    </div>
                    <div className={style.mvImg}>
                        <img src="./img/main_m01.png" className={style.img1} />
                        <img src="./img/main_m02.png" className={style.img2} />
                    </div>
                </div>
                <div className={style.hightlight}>
                    <div className={style.inner}>
                        <h3>SEAS Hightlight</h3>
                        <ul className={style.clearfix}>
                            <li>
                                <p>관람객 방문패턴 분석</p>
                                <img src="./img/highlight01.png" />
                                <span>성별/연령 별 관람객의 방문패턴, 시간, 선호전시물 정보를 분석할 수 있습니다.</span>
                            </li>
                            <li>
                                <p>전시 선호도 분석</p>
                                <img src="./img/highlight02.png" />
                                <span>성별/연령 별 관람객의 방문패턴, 시간, 선호전시물 정보를 분석할 수 있습니다.</span>
                            </li>
                            <li>
                                <p>관람객 동선분석</p>
                                <img src="./img/highlight03.png" />
                                <span>전시관 입장부터 퇴장까지 관람객의 평균동선분석 결과를 확인할 수 있습니다.</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className={style.remarks}>
                    <div className={`${style.inner} ${style.clearfix}`}>
                        <div className={style.text}>
                            <h3>비컨과 모바일 앱을 통해 <br />쉽게 설치가 가능해요.</h3>
                            <p>비컨과 모바일 앱을 통해 쉽게 설치가 가능해요.<br />
                                설치된 비컨을 통해 관람객 정보를 수집하여 관리자 시스템에서 확인가능합니다.</p>
                        </div>
                        <div className={style.remarkImg}>
                            <img src="./img/remark.png" />
                        </div>
                    </div>
                </div>
                <Footer></Footer>
            </div>
        );
    }
}

export default MainPage;