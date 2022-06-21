import React from "react";
import { withRouter } from "react-router-dom";
import { useScript } from "../utils/hook";

// import '../pages/css/admin/common.module.css';
// import '../pages/css/admin/datepicker-custom.css';
// import '../pages/css/admin/datepicker.css';
// import '../pages/css/admin/datepicker.min.css';
// import '../pages/css/admin/fontawesome.min.css';
// import '../pages/css/admin/reset.css';
// import '../pages/css/admin/styles.css';


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
            <header>
                <div id="header">
                    <h1 className="logo">스마트과학관</h1>
                    <div className="gnb">
                        <ul className="menu">
                            <li className="home active"><a href="#" title="대시보드 메인으로 이동"><i className="fas fa-home"></i><span>대시보드</span></a></li>
                            <li className="manage">
                                <a href="ManageDrawing.html" title="전시관 관리 페이지로 이동"><i className="far fa-edit"></i><span>전시관 관리</span></a>
                                <ul className="submenu">
                                    <li><a href="ManageDrawing.html" title="전시관 도면 관리 페이지로 이동">전시관 도면 관리</a></li>
                                    <li><a href="ManageInfo.html" title="전시관 정보 관리 페이지로 이동">전시관 정보 관리</a></li>
                                </ul>
                            </li>
                            <li className="event"><a href="Event.html" title="이벤트 페이지로 이동"><i className="fas fa-gift"></i><span>이벤트</span></a></li>
                        </ul>
                    </div>
                    <a href="#" className="m-open" title="모바일 메뉴 열기"></a>
                    <a href="#" className="m-close" title="모바일 메뉴 닫기"></a>
                </div>
                <div className="gnb mobileMenu">
                    <nav id="subNav">
                        <div className="user">
                            <ul className="clearfix">
                                <li><i className="fas fa-user"></i>김홍삼님</li>
                                <li><a href="#" title="로그아웃하기"><i className="fas fa-unlock"></i>로그아웃</a></li>
                            </ul>
                        </div>
                    </nav>
                    <ul className="menu">
                        <li className="home active"><a href="#" title="대시보드 메인으로 이동"><i className="fas fa-home"></i><span>대시보드</span></a></li>
                        <li className="manage">
                            <a href="ManageDrawing.html" title="전시관 관리 페이지로 이동"><i className="far fa-edit"></i><span>전시관 관리</span></a>
                            <ul className="submenu">
                                <li><a href="ManageDrawing.html" title="전시관 도면 관리 페이지로 이동">전시관 도면 관리</a></li>
                                <li><a href="ManageInfo.html" title="전시관 정보 관리 페이지로 이동">전시관 정보 관리</a></li>
                            </ul>
                        </li>
                        <li className="event"><a href="Event.html" title="이벤트 페이지로 이동"><i className="fas fa-gift"></i><span>이벤트</span></a></li>
                    </ul>
                </div>
                <div className="bg-shadow"></div>
            </header>
        );

    }

}

export default withRouter(DashboardHeader);
