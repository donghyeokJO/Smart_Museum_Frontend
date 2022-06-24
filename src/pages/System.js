import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { ROOT_API } from "../utils/axios";
import { Jwt } from "jsonwebtoken";

import SystemHeader from "../components/SystemHeader";

function System() {
    return (
        <div id='wrap'>
            <SystemHeader></SystemHeader>
            {/* <div id="container">
                <section>
                    <h5>서비스신청</h5>
                    <div class="filter">
                        <div>
                            <select>
                                <option>모두</option>
                                <option>결제상태</option>
                                <option>지역</option>
                            </select>
                        </div>
                        <div class="search">
                            <input type="text" class="searchTerm" placeholder="검색어를 입력해주세요." />
                        </div>
                    </div>
                    <div class="tableWrap">
                        <div class="tableContent">
                            <div class="basicTable" id="thead">
                                <div>
                                    <ul>
                                        <li>아이디</li>
                                        <li>지역</li>
                                        <li>박물관 이름</li>
                                        <li>신청상태</li>
                                    </ul>
                                </div>
                            </div>
                            <div class="basicTable">
                                <div>
                                    <ul>
                                        <li>gildong 221</li>
                                        <li>서울</li>
                                        <li>서울 박물관</li>
                                        <li>승인완료</li>
                                    </ul>
                                </div>
                            </div>
                            <div class="basicTable">
                                <div>
                                    <ul>
                                        <li>hann_ee</li>
                                        <li>부산</li>
                                        <li>부산 박물관</li>
                                        <li><button type="button">승인</button></li>
                                    </ul>
                                </div>
                            </div>
                            <div class="basicTable">
                                <div>
                                    <ul>
                                        <li>gildong 221</li>
                                        <li>서울</li>
                                        <li>서울 박물관</li>
                                        <li>승인완료</li>
                                    </ul>
                                </div>
                            </div>
                            <div class="basicTable">
                                <div>
                                    <ul>
                                        <li>gildong 221</li>
                                        <li>서울</li>
                                        <li>서울 박물관</li>
                                        <li>승인완료</li>
                                    </ul>
                                </div>
                            </div>
                            <div class="basicTable">
                                <div>
                                    <ul>
                                        <li>gildong 221</li>
                                        <li>서울</li>
                                        <li>서울 박물관</li>
                                        <li>승인완료</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <nav aria-label="Page navigation example" class="navi">
                        <ul class="pagination">
                            <li class="page-item"><a class="page-link" href="#">&lt;&lt;</a></li>
                            <li class="page-item active"><a class="page-link" href="#">1</a></li>
                            <li class="page-item"><a class="page-link" href="#">2</a></li>
                            <li class="page-item"><a class="page-link" href="#">3</a></li>
                            <li class="page-item"><a class="page-link" href="#">&gt;&gt;</a></li>
                        </ul>
                    </nav>
                </section>
            </div> */}
        </div>
    );
}

export default withRouter(System);