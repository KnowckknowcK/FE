import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import styles from './TopNavBar.module.css'; // CSS 모듈 임포트
import { useNavigate } from 'react-router-dom';

export const TopNavBar = ({ roomNumber, agreeNum, disagreeNum, agreeRate, disagreeRate }) => {
    const navigate = useNavigate();
    return (
        <div className={styles.navBarStyle}>
            <div className={styles.itemStyle}>
                <button onClick={() => navigate(-1)}> {/* 버튼 클릭 시 이전 페이지로 이동 */}
                    <FaArrowLeft/>
                </button>
                <div className={styles.iconTextStyle}>
                    <div>{`${roomNumber}번 토론방`}</div>
                    <div className={styles.smallText}>{`찬성: ${agreeNum}명 반대: ${disagreeNum}`}</div>
                </div>
            </div>
            <div>
                {`찬성 ${agreeRate}% / 반대 ${disagreeRate}%`}
            </div>
        </div>
    );
};
