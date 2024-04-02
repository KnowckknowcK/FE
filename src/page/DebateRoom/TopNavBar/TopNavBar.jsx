import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import styles from './TopNavBar.module.css'; // CSS 모듈 임포트

export const TopNavBar = ({ roomNumber, participantCount, agreeRate, disagreeRate }) => {
    return (
        <div className={styles.navBarStyle}>
            <div className={styles.itemStyle}>
                <FaArrowLeft /> {/* 나가기 아이콘 */}
                <div className={styles.iconTextStyle}>
                    <div>{`${roomNumber}번 토론방`}</div>
                    <div className={styles.smallText}>{`${participantCount}명의 참여자`}</div>
                </div>
            </div>
            <div>
                {`찬성 ${agreeRate}% / 반대 ${disagreeRate}%`}
            </div>
        </div>
    );
};
