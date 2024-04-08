import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import styles from './TopNavBar.module.css'; // CSS 모듈 임포트


export const TopNavBar = ({handleOnClick, children }) => {

    return (
        <div className={styles.navBarStyle}>
            <div className={styles.itemStyle}>
                <button onClick={() => handleOnClick()}> {/* 버튼 클릭 시 이전 페이지로 이동 */}
                    <FaArrowLeft/>
                </button>
                <div className={styles.iconTextStyle}>

                    {children}
                </div>
            </div>
        </div>
    );
};
