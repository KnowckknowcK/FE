import React from 'react';
import styles from './TopNavBar.module.css';
import { RxHamburgerMenu } from "react-icons/rx";
import { FiChevronLeft } from "react-icons/fi";

export const TopNavBar = ({handleOnClick, isMain, toggleDrawer, children }) => {

    return (
        <div className={styles.topNavBarStyle}>
            <div className={styles.itemStyle}>
                <div onClick={() => handleOnClick()}> {/* 버튼 클릭 시 이전 페이지로 이동 */}
                    <FiChevronLeft style={{color:"white",width:"36px", height:"36px"}}/>
                </div>
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
