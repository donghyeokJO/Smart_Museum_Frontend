import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

import './css/main/reset.css';
import './css/main/index.css';


class MainPage extends React.Component {
    render() {
        return (
            <div id="wrap">
                <Header></Header>
                <div class="mainVisu clearfix">
                    <div class="inner">
                        <p class="t1">SEAS</p>
                        <p class="t2">smart exhibition analysis system</p>
                    </div>
                    <div class="mvImg">
                        <img src="./img/main_m01.png" class="img1" />
                        <img src="./img/main_m02.png" class="img2" />
                    </div>
                </div>
                <div class="hightlight">
                    <div class="inner">
                        <h3>SEAS Hightlight</h3>
                        <ul class="clearfix">
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
                <div class="remarks">
                    <div class="inner clearfix">
                        <div class="text">
                            <h3>비컨과 모바일 앱을 통해 <br />쉽게 설치가 가능해요.</h3>
                            <p>비컨과 모바일 앱을 통해 쉽게 설치가 가능해요.<br />
                                설치된 비컨을 통해 관람객 정보를 수집하여 관리자 시스템에서 확인가능합니다.</p>
                        </div>
                        <div class="remarkImg">
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