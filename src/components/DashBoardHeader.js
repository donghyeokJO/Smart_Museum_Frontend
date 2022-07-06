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
        mopen: false,
        mobilemenu_cls: `${style.gnb} ${style.mobileMenu}`,
        mbtn: '',
        bgshow: false,
    };



    componentDidMount() {
        this.setState({
            Name: localStorage.getItem('userName'),
            museum_name: localStorage.getItem('museumName'),
            IsAuth: (localStorage.getItem('access') === null ? false : true),
        });
    };


    render() {
        return (
            <header className={style.header2}>
                <div id={style.header}>
                    <h1 className={style.logo}>스마트과학관</h1>
                    <div className={style.gnb}>
                        <ul className={style.menu}>
                            <li className={`home ${this.props.main ? style.active : null}`}>
                                <a href="/dashboard" title="대시보드 메인으로 이동">
                                    {/* <i className="fas fa-home"></i> */}
                                    {/* <FontAwesomeIcon icon={faHome} style={{color:'white'}}/> */}
                                    대시보드
                                </a>
                            </li>
                            <li className={`${style.manage} ${this.props.exhibition ? style.active : null}`}>
                                <a href="/exhibition" title="전시관 관리 페이지로 이동">
                                    {/* <i className="far fa-edit"></i> */}
                                    전시관 관리
                                </a>
                                <ul className={style.submenu}>
                                    <li className={this.props.ex1 ? style.active : null}><a href="/exhibition" title="전시관 도면 관리 페이지로 이동">전시관 도면 관리</a></li>
                                    <li className={this.props.ex2 ? style.active : null}><a href="/inner-exhibition" title="전시관 정보 관리 페이지로 이동">전시관 정보 관리</a></li>
                                </ul>
                            </li>
                            <li className={`${style.event} ${this.props.event ? style.active : null}`}>
                                <a href="/event" title="이벤트 페이지로 이동">
                                    {/* <i className="fas fa-gift"></i> */}
                                    이벤트
                                </a>
                            </li>
                        </ul>
                    </div>
                    {!this.state.mopen ?
                        <a href="#" className={style.mopen} title="모바일 메뉴 열기" onClick={() => this.setState({ mopen: !this.state.mopen, bgshow: !this.state.bgshow, mobilemenu_cls: `${style.gnb} ${style.mobileMenu} ${style.on}` })}></a>
                        : <a href="#" className={style.mclose} title="모바일 메뉴 닫기" onClick={() => this.setState({ mopen: !this.state.mopen, bgshow: !this.state.bgshow, mobilemenu_cls: `${style.gnb} ${style.mobileMenu}` })}></a>
                    }
                    {/* <a href="#" className={style.mopen} title="모바일 메뉴 열기"></a>
                    <a href="#" className={style.mclose} title="모바일 메뉴 닫기"></a> */}

                </div>
                <div className={this.state.mobilemenu_cls}>
                    <nav id={style.subNav}>
                        <div className={style.user}>
                            <ul className={style.clearfix}>
                                <li><i className="fas fa-user"></i>{this.state.Name}님</li>
                                <li><a href="#" title="로그아웃하기" onClick={function () { localStorage.clear(); window.location.href = '/' }}><i className="fas fa-unlock"></i>로그아웃</a></li>
                            </ul>
                        </div>
                    </nav>
                    <ul className={style.menu}>
                        <li className={`home ${this.props.main ? style.active : null}`}>
                            <a href="/dashboard" title="대시보드 메인으로 이동">
                                {/* <i className="fas fa-home"></i> */}
                                {/* <FontAwesomeIcon icon={faHome} style={{color:'white'}}/> */}
                                대시보드
                            </a>
                        </li>
                        <li className={`${style.manage} ${this.props.exhibition ? style.active : null}`}>
                            <a href="/exhibition" title="전시관 관리 페이지로 이동">
                                {/* <i className="far fa-edit"></i> */}
                                전시관 관리
                            </a>
                            <ul className={style.submenu}>
                                <li className={this.props.ex1 ? style.active : null}><a href="/exhibition" title="전시관 도면 관리 페이지로 이동">전시관 도면 관리</a></li>
                                <li className={this.props.ex2 ? style.active : null}><a href="/inner-exhibition" title="전시관 정보 관리 페이지로 이동">전시관 정보 관리</a></li>
                            </ul>
                        </li>
                        <li className={`${style.event} ${this.props.event ? style.active : null}`}>
                            <a href="/event" title="이벤트 페이지로 이동">
                                {/* <i className="fas fa-gift"></i> */}
                                이벤트
                            </a>
                        </li>
                    </ul>
                </div>
                <div className={this.state.bgshow ? style.bgshadowon : style.bgshadow} ></div>
                {/* {`${style.mainVisu} ${style.clearfix}`} */}

            </header>
        );

    }

}

export default withRouter(DashboardHeader);
