import React from "react";
import { withRouter } from "react-router-dom";
import { useScript } from "../utils/hook";

import style from '../pages/css/admin/DashboardHeader.module.css';
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faHome } from "@fortawesome/free-solid-svg-icons";

// import 'font-awesome/css/font-awesome.min.css';

class DashboardHeader extends React.Component {
    state = {
        Name: "",
        museum_name: 0,
        IsAuth: false,
    };

    componentDidMount() {
        this.setState({
            Name: localStorage.getItem('userName'),
            museum_name: localStorage.getItem('museumName'),
            IsAuth: (localStorage.getItem('access') === null ? false : true)
        });
    };


    render() {
        return (
            <header id={style.header2}>
                <div id={style.header}>
                    <h1 className={style.logo}>스마트과학관</h1>
                    <div className={style.gnb}>
                        <ul className={style.menu}>
                            <li className={`home ${style.active}`}>
                                <a href="#" title="대시보드 메인으로 이동">
                                    {/* <i className="fas fa-home"></i> */}
                                    {/* <FontAwesomeIcon icon={faHome} style={{color:'white'}}/> */}
                                    대시보드
                                </a>
                            </li>
                            <li className={style.manage}>
                                <a href="ManageDrawing.html" title="전시관 관리 페이지로 이동">
                                    {/* <i className="far fa-edit"></i> */}
                                    전시관 관리
                                </a>
                                <ul className={style.submenu}>
                                    <li><a href="ManageDrawing.html" title="전시관 도면 관리 페이지로 이동">전시관 도면 관리</a></li>
                                    <li><a href="ManageInfo.html" title="전시관 정보 관리 페이지로 이동">전시관 정보 관리</a></li>
                                </ul>
                            </li>
                            <li className={style.event}>
                                <a href="Event.html" title="이벤트 페이지로 이동">
                                    {/* <i className="fas fa-gift"></i> */}
                                    이벤트
                                </a>
                            </li>
                        </ul>
                    </div>
                    <a href="#" className={style.mopen} title="모바일 메뉴 열기"></a>
                    <a href="#" className={style.mclose} title="모바일 메뉴 닫기"></a>
                </div>
                {/* {`${style.mainVisu} ${style.clearfix}`} */}
                <div className={`${style.gnb} ${style.mobileMenu}`}>
                    <nav id={style.subNav}>
                        <div className={style.user}>
                            <ul className={style.clearfix}>
                                <li><i className="fas fa-user"></i>김홍삼님</li>
                                <li><a href="#" title="로그아웃하기"><i className="fas fa-unlock"></i>로그아웃</a></li>
                            </ul>
                        </div>
                    </nav>
                    <ul className={style.menu}>
                        <li className={style.active}><a href="#" title="대시보드 메인으로 이동"><i className="fas fa-home"></i><span>대시보드</span></a></li>
                        <li className={style.manage}>
                            <a href="ManageDrawing.html" title="전시관 관리 페이지로 이동"><i className="far fa-edit"></i><span>전시관 관리</span></a>
                            <ul className={style.submenu}>
                                <li><a href="ManageDrawing.html" title="전시관 도면 관리 페이지로 이동">전시관 도면 관리</a></li>
                                <li><a href="ManageInfo.html" title="전시관 정보 관리 페이지로 이동">전시관 정보 관리</a></li>
                            </ul>
                        </li>
                        <li className="event"><a href="Event.html" title="이벤트 페이지로 이동"><i className="fas fa-gift"></i><span>이벤트</span></a></li>
                    </ul>
                </div>
                <div className={style.bgshadow}></div>
            </header>
        );

    }

}

export default withRouter(DashboardHeader);
