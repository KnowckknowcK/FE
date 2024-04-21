import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import styles from './TopNavBar.module.css';
import {GiHamburgerMenu} from "react-icons/gi"; // CSS 모듈 임포트
import { RxHamburgerMenu } from "react-icons/rx";

export const TopNavBar = ({handleOnClick, isMain, toggleDrawer, children }) => {

    return (
        <div className={styles.topNavBarStyle}>
            <div className={styles.itemStyle}>
                <button onClick={() => handleOnClick()}> {/* 버튼 클릭 시 이전 페이지로 이동 */}
                    <FaArrowLeft/>
                </button>
                <div className={styles.iconTextStyle}>
                    {children}
                </div>
            </div>
            {isMain &&
                (<div className={styles.drawer} onClick={toggleDrawer}>
                    <RxHamburgerMenu style={{color: "white", height:"36px", width:"36px"}}/>
                </div>)
            }
        </div>
    );
};
