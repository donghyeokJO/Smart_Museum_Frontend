import React from "react";

import style from '../pages/css/main/Header.module.css';
class Footer extends React.Component {
    render() {
        return (
            <footer>
                <div className={style.inner}>
                    <p>LOCS Copyright (c).  All Rights Reserved.</p>
                </div>
            </footer>
        );
    }
}

export default Footer;